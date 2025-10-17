#!/usr/bin/env node
/**
 * Automated Appwrite setup script
 * 
 * This script will:
 * - Create database
 * - Create collections with proper attributes and indexes
 * - Create storage bucket
 * - Configure permissions
 * 
 * Prerequisites:
 * 1. Create Appwrite project at cloud.appwrite.io (or use your self-hosted instance)
 * 2. Create an API key with full permissions (Settings → API Keys)
 * 3. Set environment variables or pass as arguments
 * 
 * Usage:
 *   npm run setup-appwrite
 * 
 * Or with inline config:
 *   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 \
 *   APPWRITE_PROJECT_ID=your-project-id \
 *   APPWRITE_API_KEY=your-api-key \
 *   npm run setup-appwrite
 */

import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// Prompt for missing environment variables
async function getConfig() {
  const config = {
    endpoint: process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
  };

  if (!config.endpoint) {
    config.endpoint = await rl.question('Appwrite Endpoint (https://cloud.appwrite.io/v1): ') || 'https://cloud.appwrite.io/v1';
  }

  if (!config.projectId) {
    config.projectId = await rl.question('Project ID: ');
  }

  if (!config.apiKey) {
    config.apiKey = await rl.question('API Key (from Appwrite console): ');
  }

  return config;
}

// Initialize client
function createClient(config) {
  return new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
}

// Create database
async function createDatabase(databases) {
  try {
    console.log('\n📦 Creating database...');
    const database = await databases.create(
      ID.unique(),
      'portfolio-cms',
      true // enabled
    );
    console.log(`✓ Database created: ${database.$id}`);
    return database.$id;
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ Database already exists');
      const databases_list = await databases.list();
      return databases_list.databases[0].$id;
    }
    throw error;
  }
}

// Create blog posts collection
async function createBlogCollection(databases, databaseId) {
  try {
    console.log('\n📝 Creating blogPosts collection...');
    
    const collection = await databases.createCollection(
      databaseId,
      ID.unique(),
      'blogPosts',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      true, // document security
      true  // enabled
    );

    const collectionId = collection.$id;
    console.log(`✓ Collection created: ${collectionId}`);

    // Create attributes
    console.log('  Adding attributes...');
    
    await databases.createStringAttribute(databaseId, collectionId, 'title', 255, true);
    await databases.createStringAttribute(databaseId, collectionId, 'slug', 255, true);
    await databases.createStringAttribute(databaseId, collectionId, 'date', 20, true);
    await databases.createStringAttribute(databaseId, collectionId, 'author', 100, false, 'Brennan K.A. Pollock');
    await databases.createStringAttribute(databaseId, collectionId, 'readingTime', 20, false, '5 min read');
    await databases.createStringAttribute(databaseId, collectionId, 'categories', 50, true, undefined, true); // array
    await databases.createStringAttribute(databaseId, collectionId, 'excerpt', 500, true);
    await databases.createStringAttribute(databaseId, collectionId, 'content', 1000000, true);
    await databases.createBooleanAttribute(databaseId, collectionId, 'published', false, false);

    console.log('  ✓ Attributes created');

    // Wait a bit for attributes to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create indexes
    console.log('  Adding indexes...');
    
    await databases.createIndex(databaseId, collectionId, 'slug_unique', 'unique', ['slug']);
    await databases.createIndex(databaseId, collectionId, 'date_desc', 'key', ['date'], ['DESC']);
    
    console.log('  ✓ Indexes created');
    console.log(`✓ Blog posts collection ready: ${collectionId}`);
    
    return collectionId;
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ Blog posts collection already exists');
      const collections = await databases.listCollections(databaseId);
      const existing = collections.collections.find(c => c.name === 'blogPosts');
      return existing?.$id;
    }
    throw error;
  }
}

// Create stash items collection
async function createStashCollection(databases, databaseId) {
  try {
    console.log('\n📌 Creating stashItems collection...');
    
    const collection = await databases.createCollection(
      databaseId,
      ID.unique(),
      'stashItems',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      true, // document security
      true  // enabled
    );

    const collectionId = collection.$id;
    console.log(`✓ Collection created: ${collectionId}`);

    // Create attributes
    console.log('  Adding attributes...');
    
    await databases.createEnumAttribute(
      databaseId, 
      collectionId, 
      'type', 
      ['image', 'link', 'text', 'quote', 'video'], 
      true
    );
    await databases.createStringAttribute(databaseId, collectionId, 'title', 255, false);
    await databases.createStringAttribute(databaseId, collectionId, 'url', 500, false);
    await databases.createStringAttribute(databaseId, collectionId, 'imageUrl', 500, false);
    await databases.createStringAttribute(databaseId, collectionId, 'imageFileId', 100, false);
    await databases.createStringAttribute(databaseId, collectionId, 'description', 2000, false);
    await databases.createStringAttribute(databaseId, collectionId, 'text', 5000, false);
    await databases.createStringAttribute(databaseId, collectionId, 'author', 200, false);
    await databases.createStringAttribute(databaseId, collectionId, 'categories', 50, true, undefined, true); // array
    await databases.createStringAttribute(databaseId, collectionId, 'subcategory', 50, false);
    await databases.createStringAttribute(databaseId, collectionId, 'date', 20, true);
    await databases.createStringAttribute(databaseId, collectionId, 'source', 200, false);

    console.log('  ✓ Attributes created');

    // Wait for attributes
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create indexes
    console.log('  Adding indexes...');
    
    await databases.createIndex(databaseId, collectionId, 'type_search', 'key', ['type']);
    await databases.createIndex(databaseId, collectionId, 'date_desc', 'key', ['date'], ['DESC']);
    
    console.log('  ✓ Indexes created');
    console.log(`✓ Stash items collection ready: ${collectionId}`);
    
    return collectionId;
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ Stash items collection already exists');
      const collections = await databases.listCollections(databaseId);
      const existing = collections.collections.find(c => c.name === 'stashItems');
      return existing?.$id;
    }
    throw error;
  }
}

// Create drafts collection
async function createDraftsCollection(databases, databaseId) {
  try {
    console.log('\n💾 Creating drafts collection...');
    
    const collection = await databases.createCollection(
      databaseId,
      ID.unique(),
      'drafts',
      [
        Permission.read(Role.users()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      true,
      true
    );

    const collectionId = collection.$id;
    console.log(`✓ Collection created: ${collectionId}`);

    await databases.createEnumAttribute(
      databaseId,
      collectionId,
      'contentType',
      ['blog', 'stash'],
      true
    );
    await databases.createStringAttribute(databaseId, collectionId, 'data', 1000000, true);
    await databases.createStringAttribute(databaseId, collectionId, 'createdAt', 30, true);

    console.log('  ✓ Attributes created');
    console.log(`✓ Drafts collection ready: ${collectionId}`);
    
    return collectionId;
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ Drafts collection already exists');
      const collections = await databases.listCollections(databaseId);
      const existing = collections.collections.find(c => c.name === 'drafts');
      return existing?.$id;
    }
    throw error;
  }
}

// Create storage bucket
async function createStorageBucket(storage) {
  try {
    console.log('\n🖼️  Creating storage bucket...');
    
    const bucket = await storage.createBucket(
      ID.unique(),
      'stash-images',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      false, // file security (use bucket-level permissions)
      true,  // enabled
      10485760, // 10MB max file size
      ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'], // allowed extensions
      'none', // compression
      true,   // encryption
      true    // antivirus
    );

    console.log(`✓ Storage bucket created: ${bucket.$id}`);
    return bucket.$id;
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ Storage bucket already exists');
      const buckets = await storage.listBuckets();
      return buckets.buckets[0].$id;
    }
    throw error;
  }
}

// Generate .env.local file
function generateEnvFile(config, ids) {
  const envContent = `# Appwrite Configuration
# Generated by setup-appwrite.js

# Your Appwrite endpoint
NEXT_PUBLIC_APPWRITE_ENDPOINT=${config.endpoint}

# Your Appwrite project ID
NEXT_PUBLIC_APPWRITE_PROJECT_ID=${config.projectId}

# Database ID
NEXT_PUBLIC_APPWRITE_DATABASE_ID=${ids.databaseId}

# Collection IDs
NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID=${ids.blogCollectionId}
NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID=${ids.stashCollectionId}
NEXT_PUBLIC_APPWRITE_DRAFTS_COLLECTION_ID=${ids.draftsCollectionId}

# Storage Bucket ID
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=${ids.bucketId}

# API Key for server-side operations (keep secure!)
APPWRITE_API_KEY=${config.apiKey}
`;

  return envContent;
}

// Main setup function
async function main() {
  try {
    console.log('🚀 Appwrite CMS Setup\n');
    console.log('This script will create:');
    console.log('  • Database');
    console.log('  • Collections (blogPosts, stashItems, drafts)');
    console.log('  • Storage bucket');
    console.log('  • Generate .env.local file\n');

    const config = await getConfig();
    rl.close();

    console.log('\n✓ Configuration loaded');
    console.log(`  Endpoint: ${config.endpoint}`);
    console.log(`  Project: ${config.projectId}\n`);

    const client = createClient(config);
    const databases = new Databases(client);
    const storage = new Storage(client);

    // Create resources
    const databaseId = await createDatabase(databases);
    const blogCollectionId = await createBlogCollection(databases, databaseId);
    const stashCollectionId = await createStashCollection(databases, databaseId);
    const draftsCollectionId = await createDraftsCollection(databases, databaseId);
    const bucketId = await createStorageBucket(storage);

    const ids = {
      databaseId,
      blogCollectionId,
      stashCollectionId,
      draftsCollectionId,
      bucketId,
    };

    // Generate .env.local
    console.log('\n📝 Generating .env.local file...');
    const envContent = generateEnvFile(config, ids);
    
    const fs = await import('node:fs/promises');
    await fs.writeFile('.env.local', envContent);
    console.log('✓ .env.local created');

    // Summary
    console.log('\n✨ Setup complete!\n');
    console.log('📋 Summary:');
    console.log(`  Database ID: ${databaseId}`);
    console.log(`  Blog Collection ID: ${blogCollectionId}`);
    console.log(`  Stash Collection ID: ${stashCollectionId}`);
    console.log(`  Drafts Collection ID: ${draftsCollectionId}`);
    console.log(`  Storage Bucket ID: ${bucketId}`);
    
    console.log('\n📝 Next steps:');
    console.log('  1. Review .env.local file');
    console.log('  2. Create an admin user in Appwrite console (Auth → Users)');
    console.log('  3. Run: npm run dev');
    console.log('  4. Visit: http://localhost:3000/admin');
    console.log('  5. Optional: Run migration with: npm run migrate\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

main();
