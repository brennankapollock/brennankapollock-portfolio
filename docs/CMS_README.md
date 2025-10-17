# Portfolio CMS - Mobile-First Content Management

A self-hosted content management system built on Appwrite, optimized for adding articles and stash items from your phone.

## Features

- ✅ **Mobile-First Admin UI**: Responsive interface optimized for phone browsers
- ✅ **Quick Add Forms**: Fast content creation with minimal fields
- ✅ **iOS Shortcuts**: Add content via share sheet or voice commands
- ✅ **PWA Support**: Install admin as app on your home screen
- ✅ **Share API**: Save links from anywhere on your phone
- ✅ **Self-Hosted**: Full control with Appwrite backend

## Quick Start

### 1. Set Up Appwrite

Follow the detailed instructions in `APPWRITE_SETUP.md` to:
- Create your Appwrite project
- Set up database collections
- Configure storage bucket
- Create admin user
- Get API keys

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Appwrite credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values from Appwrite console.

### 3. Migrate Existing Content (Optional)

If you have existing content in `/src/data/`, migrate it to Appwrite:

```bash
npm run migrate
```

This will import all existing blog posts and stash items into your Appwrite database.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/admin` to access the admin interface.

## Mobile Setup

### Install as PWA

1. Open `your-domain.com/admin` on your phone
2. In Safari: Tap Share → Add to Home Screen
3. Name it "Portfolio Admin" or similar
4. Tap icon on home screen to launch

### Set Up iOS Shortcuts

See `IOS_SHORTCUTS.md` for detailed instructions on creating:
- **Quick Add to Stash**: Save from anywhere
- **Share to Stash**: Save from Safari share sheet
- **Quick Note**: Voice-activated note saving

## Usage

### From Desktop

1. Go to `/admin`
2. Login with your Appwrite credentials
3. Use dashboard to add/manage content

### From Phone

**Option 1: Admin Interface**
1. Open PWA from home screen
2. Tap "Add Stash Item" or "New Blog Post"
3. Fill quick form and save

**Option 2: Share Sheet (after iOS Shortcuts setup)**
1. Browse to any webpage
2. Tap Share button
3. Select "Add to Stash"
4. Done!

**Option 3: Voice Command**
1. Say "Hey Siri, add to stash"
2. Speak or type content
3. Done!

## Content Types

### Blog Posts

**Fields:**
- Title (required)
- Slug (auto-generated from title)
- Author
- Reading time
- Categories (multi-select)
- Excerpt
- Content (Markdown)
- Published status

**Categories:** Philosophy, Development, Process, Culture, Engineering, Typography, Layout Systems, React, CSS, Performance, Design Systems, Workflow, Art

### Stash Items

**Types:** link, image, text, quote, video

**Fields (vary by type):**
- Title
- URL
- Image URL
- Description/Text
- Author (for quotes)
- Categories (multi-select)
- Subcategory
- Source

**Categories:** music, books, films, art, quotes, design, code, inspiration, culture

## API Endpoints

### Admin Endpoints

- `POST /api/admin/blog` - Create blog post
- `GET /api/admin/blog` - List blog posts
- `POST /api/admin/stash` - Create stash item
- `GET /api/admin/stash` - List stash items

### Share Endpoint (for iOS Shortcuts)

- `POST /api/admin/share` - Quick save content
  - Accepts: `{ url, title, text, image, type }`
  - Auto-categorizes based on URL
  - Returns success/error message

## Deployment

### Option 1: Vercel + Appwrite Cloud

1. Deploy Next.js app to Vercel
2. Use Appwrite Cloud (cloud.appwrite.io) for backend
3. Add environment variables in Vercel dashboard
4. Deploy!

### Option 2: Self-Hosted Appwrite

1. Deploy Appwrite on your server ([appwrite.io/docs/installation](https://appwrite.io/docs/installation))
2. Deploy Next.js app anywhere (Vercel, Netlify, etc.)
3. Configure environment variables
4. Done!

### Environment Variables for Production

Make sure to set these in your deployment platform:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-instance.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=...
NEXT_PUBLIC_APPWRITE_DATABASE_ID=...
NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_DRAFTS_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=...
APPWRITE_API_KEY=... (keep secret!)
```

## Architecture

```
┌─────────────────────────┐
│   Next.js Frontend      │
│   - Blog pages          │
│   - Stash pages         │
│   - Admin UI            │
└───────────┬─────────────┘
            │
            │ Appwrite SDK
            ↓
┌─────────────────────────┐
│   Appwrite Backend      │
│   - Database            │
│   - Storage             │
│   - Authentication      │
└─────────────────────────┘
```

**Mobile Entry Points:**
- PWA Admin UI
- iOS Share Sheet → Share API
- iOS Shortcuts → Share API

## Troubleshooting

### "Failed to fetch" errors

- Check that environment variables are set correctly
- Verify Appwrite endpoint is accessible
- Check browser console for CORS errors
- Make sure domain is added in Appwrite project settings

### Can't login

- Verify user exists in Appwrite console
- Check email/password are correct
- Clear browser cache/cookies
- Check Appwrite Auth settings

### iOS Shortcuts not working

- Verify share API endpoint URL is correct
- Check phone has internet connection
- Test API endpoint in browser first
- Check Appwrite logs for errors

### Images not uploading

- Verify storage bucket is created
- Check bucket permissions (public read, user write)
- Verify file size limits
- Check allowed file types

## Development Notes

### Data Flow

1. **Admin creates content** → API route → Appwrite database
2. **Frontend fetches content** → Appwrite SDK → Displays on site
3. **iOS Shortcut shares** → Share API → Appwrite database

### Authentication

- Admin UI: Session-based auth via Appwrite Account API
- API routes: Server-side SDK with API key
- iOS Shortcuts: Can use API key or session token

### Caching & Revalidation

Currently using client-side fetching. To add ISR:

1. Update blog/stash pages to use `fetch()` with revalidation
2. Add webhook in Appwrite to revalidate on content changes
3. Or use on-demand revalidation from admin panel

## Future Enhancements

- [ ] Image upload from admin UI (directly to Appwrite Storage)
- [ ] Rich text editor for blog posts
- [ ] Drag-and-drop image uploads
- [ ] Bulk operations (delete multiple, bulk edit)
- [ ] Content preview before publishing
- [ ] Search and filtering in admin lists
- [ ] Analytics dashboard
- [ ] Scheduled publishing
- [ ] Content versioning

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [iOS Shortcuts Guide](https://support.apple.com/guide/shortcuts/welcome)

## Support

For issues or questions:
1. Check Appwrite console logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test API endpoints manually

---

Happy content creating! 📝✨
