# Appwrite CMS Setup - Quick Start

## 🚀 Automated Setup (5 minutes)

The fastest way to get your CMS running.

### Prerequisites
- Node.js 18+ installed
- Appwrite account at [cloud.appwrite.io](https://cloud.appwrite.io) (free tier works great!)

### Steps

#### 1. Create Appwrite Project (2 min)
```
1. Visit https://cloud.appwrite.io
2. Sign up / Log in
3. Click "Create Project"
4. Name it (e.g., "Portfolio CMS")
5. Copy the Project ID (you'll need this next)
```

#### 2. Create API Key (1 min)
```
1. In your project, go to: Settings → API Keys
2. Click "Create API Key"
3. Name: "Setup Script"
4. Scopes: Select All (or at minimum: databases.*, storage.*)
5. Click Create
6. Copy the API Key (shown only once!)
```

#### 3. Run Setup Script (2 min)
```bash
npm run setup-appwrite
```

The script will ask you for:
- **Appwrite Endpoint**: Just press Enter (uses cloud.appwrite.io)
- **Project ID**: Paste the ID from step 1
- **API Key**: Paste the key from step 2

The script automatically creates:
- ✅ Database
- ✅ Collections (blogPosts, stashItems, drafts)
- ✅ Storage bucket for images
- ✅ Proper permissions and indexes
- ✅ `.env.local` file with all IDs

#### 4. Create Admin User (30 sec)
```
1. In Appwrite console: Auth → Users
2. Click "Create User"
3. Email: your@email.com
4. Password: (create a secure password)
5. Click Create
```

#### 5. Test It! (30 sec)
```bash
npm run dev
```

Visit: `http://localhost:3000/admin`
Login with the credentials from step 4.

---

## ✨ You're Done!

Try creating:
- A blog post at `/admin/blog/new`
- A stash item at `/admin/stash/new`

---

## 📱 Optional: Mobile Setup

### Add to iPhone Home Screen
1. Open your deployed site on iPhone
2. Go to `/admin`
3. Safari → Share → Add to Home Screen
4. Name it "Portfolio Admin"

### iOS Shortcuts
See `docs/IOS_SHORTCUTS.md` for setting up:
- Quick save from share sheet
- Voice-activated content creation

---

## 🔄 Optional: Migrate Existing Content

If you have existing blog posts/stash items in `/src/data/`:

```bash
npm run migrate
```

This imports everything into Appwrite.

---

## 📚 More Documentation

- **Full guide**: `GETTING_STARTED.md`
- **Manual setup**: `docs/APPWRITE_SETUP.md`
- **All features**: `docs/CMS_README.md`
- **iOS Shortcuts**: `docs/IOS_SHORTCUTS.md`

---

## 🆘 Troubleshooting

### "Permission denied" during setup
- Make sure your API key has all permissions
- Check Settings → API Keys → Edit your key

### "Database already exists"
- Script will use existing database
- Safe to re-run if setup was interrupted

### Can't login to /admin
- Verify user exists in Appwrite console (Auth → Users)
- Check email/password are correct
- Clear browser cookies and try again

### "Collection not found" errors
- Check `.env.local` has correct collection IDs
- Restart dev server: `npm run dev`

---

**Total time from zero to working CMS: ~5 minutes** ⚡
