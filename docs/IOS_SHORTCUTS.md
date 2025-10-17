# iOS Shortcuts Setup

This guide will help you set up iOS Shortcuts to quickly add content to your portfolio from your phone.

## Prerequisites

1. Admin account created in Appwrite
2. Site deployed and accessible from your phone
3. iOS Shortcuts app installed (pre-installed on iOS)

## Shortcut 1: Quick Add to Stash

This shortcut lets you save links or text from anywhere on your phone.

### Steps to Create:

1. Open **Shortcuts** app
2. Tap **+** to create new shortcut
3. Add the following actions:

#### Actions:

1. **Get Clipboard** (optional - to auto-fill from clipboard)
2. **Ask for Input**
   - Prompt: "URL or text to add"
   - Input Type: URL or Text
   - Default: (Clipboard)

3. **Text**
   - Content: (Input)
   - Name this variable "Content"

4. **Ask for Input**
   - Prompt: "Title (optional)"
   - Input Type: Text

5. **Get Contents of URL**
   - URL: `https://your-domain.com/api/admin/share`
   - Method: POST
   - Headers:
     - Content-Type: application/json
   - Request Body: JSON
     ```json
     {
       "url": "[Content if it's a URL]",
       "text": "[Content if it's text]",
       "title": "[Title Input]"
     }
     ```

6. **Show Notification**
   - Title: "Added to Stash!"
   - Body: "Item saved successfully"

### Usage:
- Run shortcut from Shortcuts app
- Or add to home screen widget
- Or say "Hey Siri, [shortcut name]"

## Shortcut 2: Share to Stash

This shortcut appears in the iOS Share Sheet for quick saving.

### Steps to Create:

1. Open **Shortcuts** app
2. Create new shortcut
3. Add these actions:

#### Actions:

1. **Receive [URLs] input from [Share Sheet]**
   - Configure to accept: URLs, Images, Text

2. **Get URLs from Input**
   - This extracts the URL from shared content

3. **Get Details of [Safari Web Page/URLs]**
   - Get: Page Contents
   - From: URLs

4. **Get Contents of URL**
   - URL: `https://your-domain.com/api/admin/share`
   - Method: POST
   - Headers:
     - Content-Type: application/json
   - Request Body:
     ```json
     {
       "url": "[Shared URL]",
       "title": "[Page Title]",
       "image": "[Page Image if available]"
     }
     ```

5. **Show Notification**
   - "Saved to Stash!"

### Usage:
1. Browse to any webpage in Safari
2. Tap Share button
3. Select your shortcut
4. Done!

## Shortcut 3: Quick Note

Save a quick text note or quote to your stash.

### Steps:

1. **Ask for Input**
   - Prompt: "What's on your mind?"
   - Input Type: Text
   - Allow Multiple Lines: Yes

2. **Ask for Input**
   - Prompt: "Is this a quote?"
   - Input Type: Text
   - Default: "no"

3. **If [previous answer] contains "yes"**
   - Ask for Input: "Who said it?"
   - Store as "Author"

4. **Get Contents of URL**
   - URL: `https://your-domain.com/api/admin/share`
   - Method: POST
   - Body:
     ```json
     {
       "text": "[First Input]",
       "type": "quote or text",
       "author": "[Author if quote]"
     }
     ```

5. **Show Notification**
   - "Note saved!"

## Advanced: Authenticated Shortcuts

For better security, you can use Appwrite session tokens in your shortcuts.

### Setup:

1. Create a long-lived session in Appwrite
2. Get the session token
3. Add to shortcut headers:
   ```
   Cookie: a_session_[PROJECT_ID]=[SESSION_TOKEN]
   ```

This ensures only you can add content via shortcuts.

## Troubleshooting

### "Failed to connect"
- Check your domain URL is correct
- Make sure site is deployed and accessible
- Verify you're connected to internet

### "Unauthorized"
- Check if API endpoint requires authentication
- Add authentication headers if needed

### "Invalid request"
- Verify JSON body format
- Check all required fields are included

## Tips for Mobile Workflow

1. **Add to Home Screen**: Put shortcuts widget on first page
2. **Voice Activation**: Name shortcuts clearly for Siri
3. **Share Sheet**: Install "Share to Stash" for quick saves from any app
4. **Combine Actions**: Chain multiple shortcuts for complex workflows

## Example Workflows

### Save Article While Reading
1. Open article in Safari
2. Tap Share
3. Select "Share to Stash"
4. Continue reading

### Capture Quick Inspiration
1. Say "Hey Siri, quick stash"
2. Speak or type idea
3. Done

### Batch Save from Notes
1. Copy multiple URLs from Notes app
2. Run "Add to Stash" shortcut
3. Each URL saved separately

## Need Help?

- iOS Shortcuts documentation: [support.apple.com/shortcuts](https://support.apple.com/guide/shortcuts/welcome)
- Test API endpoint first using browser or Postman
- Check Appwrite logs for error messages
