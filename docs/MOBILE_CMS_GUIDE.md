# Mobile CMS Setup Guide

This guide explains how to use the mobile-optimized content management system for your portfolio from any phone or tablet.

## Features

- **Quick Add**: Lightning-fast content submission optimized for mobile
- **PWA Support**: Install as a standalone app on your phone's home screen
- **Auto-Save**: Never lose your writing with automatic draft saving
- **Offline-Ready**: Work on drafts even without internet connection
- **Touch-Optimized**: Large buttons and inputs designed for fingers, not mice

## Getting Started

### 1. Install as PWA (Progressive Web App)

#### On iOS (iPhone/iPad):
1. Open Safari and navigate to `https://yourdomain.com/admin/login`
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it "My CMS" or similar
5. Tap "Add"

#### On Android:
1. Open Chrome and navigate to `https://yourdomain.com/admin/login`
2. Tap the three-dot menu
3. Tap "Install App" or "Add to Home Screen"
4. Confirm installation

### 2. Bookmark for Quick Access

If you don't want to install the PWA, bookmark these URLs in your mobile browser:

- **Login**: `https://yourdomain.com/admin/login`
- **Quick Add**: `https://yourdomain.com/admin/quick-add`
- **Dashboard**: `https://yourdomain.com/admin`

## Using Quick Add

The Quick Add page is designed for rapid mobile content submission:

### Adding to Stash
1. Open Quick Add from dashboard
2. Select "Stash" mode
3. Choose type: Link, Quote, or Text
4. Fill in minimal required fields
5. Tap "Add to Stash"

Perfect for:
- Saving interesting links while browsing on your phone
- Capturing quick thoughts and quotes
- Adding inspiration you find on social media

### Creating Blog Drafts
1. Open Quick Add from dashboard
2. Select "Draft" mode
3. Enter title and start writing
4. Tap "Save Draft" when done
5. Edit and publish later from the full editor

Perfect for:
- Jotting down blog ideas on the go
- Writing initial thoughts during your commute
- Capturing inspiration when it strikes

## Full Editor Features

### Blog Post Editor
- **Auto-Save**: Drafts save automatically every 3 seconds
- **Local Storage**: Drafts persist even if you close the browser
- **Full Markdown Support**: Write in markdown with live preview
- **Category Selection**: Tag posts with multiple categories
- **Publish Toggle**: Save as draft or publish immediately

### Stash Item Editor
- **Multiple Types**: Link, Image, Quote, Text, Video
- **Smart Categories**: Automatic category suggestions
- **Rich Metadata**: Add source, author, and descriptions
- **Image URLs**: Paste image links for visual items

## Mobile Workflows

### Morning Coffee Routine
1. Check Hacker News or Twitter
2. See something interesting → tap share
3. Open Quick Add PWA from home screen
4. Save as stash link with note
5. Takes 15 seconds, done!

### Writing on the Go
1. Idea strikes while walking
2. Open Quick Add PWA
3. Switch to Draft mode
4. Write title and initial thoughts
5. Auto-saves as you type
6. Finish editing later on desktop

### Daily Content Collection
1. Set aside 5 minutes before bed
2. Open Quick Add
3. Review phone notes/screenshots
4. Convert best ideas to stash items
5. Go to sleep knowing nothing is lost

## Tips & Tricks

### Keyboard Shortcuts (iOS Safari)
- Tap and hold text fields for paste options
- Use dictation button for voice input
- Swipe between tabs for quick switching

### Better Mobile Typing
- Use landscape mode for longer content
- Enable keyboard autocomplete
- Consider a Bluetooth keyboard for long sessions

### Offline Work
- Drafts are saved locally first
- Submit when back online
- No connection = no problem

### Quick Category Selection
- Common categories appear first
- Tap multiple for cross-posting
- Default categories applied automatically

## iOS Shortcuts Integration

The existing `/api/admin/share` endpoint works with iOS Shortcuts:

1. Create a new Shortcut
2. Add "Share Sheet" as input
3. Add "Get Contents of URL" action
4. URL: `https://yourdomain.com/api/admin/share`
5. Method: POST
6. Body: JSON with `url`, `title`, `text`
7. Add to Share Sheet

Now you can share directly from any app!

## Troubleshooting

### Can't Login
- Clear browser cache and cookies
- Try incognito/private mode
- Check Appwrite console for user account

### Content Not Saving
- Check internet connection
- Verify Appwrite credentials in `.env.local`
- Check browser console for errors

### PWA Not Installing
- iOS requires Safari browser
- Android works best with Chrome
- Some browsers don't support PWA

### Auto-Save Not Working
- Check localStorage is enabled
- Try clearing browser data
- Verify JavaScript is enabled

## Security Notes

- Always logout on shared devices
- Use strong passwords
- Consider 2FA for Appwrite account
- Don't share login credentials

## Advanced: iOS Shortcuts Examples

### Save Link from Browser
```
Get URLs from Share Sheet
Set Variable: url
Get Text from Share Sheet
Set Variable: title
Post to: yourdomain.com/api/admin/share
Body: {"url": [url], "title": [title], "type": "link"}
```

### Save Screenshot as Note
```
Get Images from Share Sheet
Run OCR on image
Set Variable: text
Post to: yourdomain.com/api/admin/share
Body: {"text": [text], "type": "text"}
```

## Next Steps

1. Install the PWA on your phone
2. Login and bookmark key pages
3. Try Quick Add with a test post
4. Customize categories for your needs
5. Set up iOS Shortcuts (optional)

Happy mobile content management! 📱✨
