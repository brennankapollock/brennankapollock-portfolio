# Getting Started with Appwrite CMS

Quick start guide to get your mobile-first CMS up and running.

## Prerequisites

- Node.js 18+ installed
- Appwrite account (cloud.appwrite.io or self-hosted)
- Admin email/password ready

## Step 1: Set Up Appwrite (5 minutes - Automated!)

### Quick Setup (Recommended)

1. **Create Appwrite Project:**
   - Go to [cloud.appwrite.io](https://cloud.appwrite.io) (or your self-hosted instance)
   - Create new project
   - Copy the Project ID

2. **Create API Key:**
   - Go to Settings → API Keys
   - Create new key with all permissions
   - Copy the API Key

3. **Run Automated Setup:**
   ```bash
   npm run setup-appwrite
   ```
   
   The script will prompt you for:
   - Appwrite endpoint (defaults to cloud.appwrite.io)
   - Project ID
   - API Key
   
   It will automatically:
   - Create database
   - Create all collections with proper schema
   - Create storage bucket
   - Generate `.env.local` file

4. **Create Admin User:**
   - In Appwrite console: Auth → Users → Create User
   - Use email/password (you'll use this to login to /admin)

Done! Skip to Step 3.

### Manual Setup (Alternative)

If you prefer manual setup, follow the detailed instructions in `docs/APPWRITE_SETUP.md`.

## Step 2: Configure Environment (Skip if using automated setup)

**If you used `npm run setup-appwrite`:** Your `.env.local` is already created! Skip to Step 3.

**If you did manual setup:**

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and fill in your Appwrite credentials:
   - Project ID
   - Database ID
   - Collection IDs (blogPosts, stashItems, drafts)
   - Storage Bucket ID
   - API Key

## Step 3: Install Dependencies (1 minute)

```bash
npm install
```

## Step 4: Migrate Existing Content (Optional, 2 minutes)

If you have existing blog posts and stash items in `/src/data/`:

```bash
npm run migrate
```

This will import everything into Appwrite. Check your Appwrite console to verify.

## Step 5: Start Development Server (1 minute)

```bash
npm run dev
```

Visit `http://localhost:3000/admin` and login with your Appwrite credentials.

## Step 6: Test Admin Interface

1. Login at `/admin`
2. Try creating a new stash item
3. Try creating a new blog post
4. Check if they appear in the lists

## Step 7: Set Up Mobile Access

### Add to Phone Home Screen

1. Open your deployed site on your phone (or use ngrok for local testing)
2. Navigate to `/admin`
3. Login
4. Safari: Tap Share → Add to Home Screen
5. Name it "Portfolio Admin"

### Set Up iOS Shortcuts (Optional)

See `IOS_SHORTCUTS.md` for detailed instructions on:
- Quick Add to Stash
- Share Sheet integration
- Voice-activated content creation

## Troubleshooting

### Can't connect to Appwrite

- Verify your endpoint URL in `.env.local`
- Check that your domain is added in Appwrite project settings → Platforms
- For localhost, add: `http://localhost:3000`

### Login doesn't work

- Verify user exists in Appwrite Auth section
- Check email/password are correct
- Clear browser cookies and try again

### Migration fails

- Check all environment variables are set
- Verify API key has correct permissions
- Check Appwrite console for error logs

### Admin pages show errors

- Open browser console to see error details
- Check that all collection IDs in `.env.local` are correct
- Verify collections have correct attributes (see APPWRITE_SETUP.md)

## Next Steps

### Deploy to Production

1. **Deploy Frontend:**
   - Push code to GitHub
   - Connect to Vercel/Netlify
   - Add environment variables in dashboard
   - Deploy!

2. **Configure Production URLs:**
   - Add production URL to Appwrite platforms
   - Update CORS settings if needed
   - Test login from production site

3. **Set Up Mobile:**
   - Visit production `/admin` on phone
   - Add to home screen
   - Update iOS Shortcuts with production URL

### Customize

- Update categories in forms to match your needs
- Customize admin UI styling
- Add more content types
- Build custom dashboards

### Optional Enhancements

- Add image upload to Appwrite Storage
- Implement rich text editor
- Add content preview
- Set up webhooks for auto-revalidation
- Add search functionality

## Quick Reference

### Important URLs

- Admin Dashboard: `/admin`
- Add Stash Item: `/admin/stash/new`
- Add Blog Post: `/admin/blog/new`
- Manage Stash: `/admin/stash`
- Manage Blog: `/admin/blog`

### API Endpoints

- `POST /api/admin/blog` - Create blog post
- `GET /api/admin/blog` - List blog posts  
- `POST /api/admin/stash` - Create stash item
- `GET /api/admin/stash` - List stash items
- `POST /api/admin/share` - Quick save (for iOS Shortcuts)

### Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build
npm run migrate      # Import existing data to Appwrite
npm run lint         # Check code quality
npm run format       # Format code
```

## Resources

- Full documentation: `CMS_README.md`
- Appwrite setup: `APPWRITE_SETUP.md`
- iOS Shortcuts: `IOS_SHORTCUTS.md`
- [Appwrite Docs](https://appwrite.io/docs)
- [Next.js Docs](https://nextjs.org/docs)

## Support

If you run into issues:

1. Check the troubleshooting sections above
2. Review Appwrite console logs
3. Check browser console for errors
4. Verify all environment variables
5. Test API endpoints manually

---

**Time to first content:** ~20 minutes from start to finish!

Ready to start? → Begin with `APPWRITE_SETUP.md` ✨
