# Appwrite Setup Guide

This guide will help you set up Appwrite for your portfolio CMS.

## Step 1: Create Appwrite Project

1. Go to your Appwrite console (cloud.appwrite.io or your self-hosted instance)
2. Create a new project
3. Copy the Project ID
4. Add your domain to the Web platform (e.g., `localhost:3000` for development)

## Step 2: Create Database

1. Navigate to Databases → Create Database
2. Name it something like "portfolio-cms"
3. Copy the Database ID

## Step 3: Create Collections

### Collection 1: blogPosts

**Attributes:**
- `title` - String, size: 255, required
- `slug` - String, size: 255, required
- `date` - String, size: 20, required (format: "YYYY.M.D")
- `author` - String, size: 100, required, default: "Brennan K.A. Pollock"
- `readingTime` - String, size: 20, required
- `categories` - String (array), size: 50, required
- `excerpt` - String, size: 500, required
- `content` - String, size: 1000000, required
- `published` - Boolean, required, default: false

**Indexes:**
- `slug_unique` - Unique on `slug`
- `date_desc` - Key on `date` (descending)
- `categories_search` - Fulltext on `categories`

**Permissions:**
- Read: Role: Any
- Create/Update/Delete: Role: Users (for authenticated admin)

### Collection 2: stashItems

**Attributes:**
- `type` - Enum (image, link, text, video, quote), required
- `title` - String, size: 255
- `url` - String, size: 500
- `imageUrl` - String, size: 500
- `imageFileId` - String, size: 100 (Appwrite Storage file ID)
- `description` - String, size: 2000
- `text` - String, size: 5000 (for text/quote types)
- `author` - String, size: 200 (for quote author)
- `categories` - String (array), size: 50, required
- `subcategory` - String, size: 50
- `date` - String, size: 20, required (format: "YYYY.M.D")
- `source` - String, size: 200

**Indexes:**
- `type_search` - Key on `type`
- `date_desc` - Key on `date` (descending)
- `categories_search` - Fulltext on `categories`

**Permissions:**
- Read: Role: Any
- Create/Update/Delete: Role: Users (for authenticated admin)

### Collection 3: drafts (Optional)

**Attributes:**
- `contentType` - Enum (blog, stash), required
- `data` - String, size: 1000000, required (JSON string)
- `createdAt` - String, size: 30, required

**Permissions:**
- Read/Create/Update/Delete: Role: Users

## Step 4: Create Storage Bucket

1. Navigate to Storage → Create Bucket
2. Name it "stash-images"
3. Configure settings:
   - Maximum file size: 10MB
   - Allowed file extensions: jpg, jpeg, png, gif, webp
   - Compression: None (or choose based on preference)
   - Encryption: Enabled
   - Antivirus: Enabled (if available)

**Permissions:**
- Read: Role: Any
- Create/Update/Delete: Role: Users

## Step 5: Create API Key

1. Navigate to Project Settings → API Keys
2. Create new API key
3. Set permissions (for server-side operations):
   - databases.read, databases.write
   - storage.read, storage.write
4. Copy the API Key (you won't see it again!)

## Step 6: Create Admin User

1. Navigate to Auth → Users
2. Create a new user with email/password
3. This will be your admin account for the mobile interface

## Step 7: Configure Environment Variables

Create `.env.local` in your project root (copy from `.env.local.example`):

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID=blogPosts-collection-id
NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID=stashItems-collection-id
NEXT_PUBLIC_APPWRITE_DRAFTS_COLLECTION_ID=drafts-collection-id
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=stash-images-bucket-id
APPWRITE_API_KEY=your-api-key
```

Replace all the placeholder values with your actual IDs from Appwrite.

## Step 8: Test Connection

After setting up, restart your dev server:
```bash
npm run dev
```

Navigate to `/admin` to test the connection and login.

## Quick Reference: Collection IDs

After creating each collection/bucket, note down the IDs:

- Database ID: `_______________`
- blogPosts Collection ID: `_______________`
- stashItems Collection ID: `_______________`
- drafts Collection ID: `_______________`
- stash-images Bucket ID: `_______________`
- API Key: `_______________` (keep secure!)

## Mobile Setup

Once everything is working:

1. **Bookmark admin on phone**: Visit `your-domain.com/admin` and bookmark it
2. **Install as PWA**: Use browser's "Add to Home Screen" option
3. **Set up iOS Shortcuts**: See `IOS_SHORTCUTS.md` for configuration

## Troubleshooting

- **CORS errors**: Make sure your domain is added in Appwrite project settings → Platforms
- **Auth errors**: Check that API key has correct permissions
- **Collection not found**: Verify collection IDs in `.env.local` match Appwrite console
