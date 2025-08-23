# Deployment Instructions for Jolene PWA

## Quick Deployment Steps

### 1. Build the App (Already Done)
```bash
npm run build
```
✅ Build completed - files are in the `build/` folder

### 2. Upload to Web Server
Upload the contents of the `build/` folder to your web server in a `jolenepwa/` directory.

**File structure on your web server should be:**
```
your-web-root/
├── index.html (your main PT website - coachpeteryan.com)
├── [other existing files]
└── jolenepwa/
    ├── index.html
    ├── manifest.webmanifest
    ├── sw.js
    ├── static/
    │   ├── css/
    │   └── js/
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```

### 3. Test the Deployment
- Main site: `https://coachpeteryan.com` (your PT website)
- Jolene PWA: `https://www.coachpeteryan.com/jolenepwa`

### 4. PWA Features
Once deployed, users can:
- Install the app on their phone/desktop
- Use it offline
- Get native app-like experience

## File Upload Methods

### Option 1: FTP/SFTP
1. Connect to your web server via FTP client
2. Navigate to your web root directory
3. Create `jolenepwa` folder
4. Upload all contents from `build/` folder

### Option 2: cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to `public_html` or your web root
4. Create `jolenepwa` folder
5. Upload and extract the build files

### Option 3: Git Deployment (if supported)
1. Clone the repository on your server
2. Checkout the `jolenepwa` branch
3. Run `npm install && npm run build`
4. Copy `build/` contents to `jolenepwa/` directory

## Verification Checklist
- [ ] Main website still loads at coachpeteryan.com
- [ ] Jolene PWA loads at coachpeteryan.com/jolenepwa
- [ ] PWA can be installed (install prompt appears)
- [ ] App works offline after first load
- [ ] All navigation works within the app

## Troubleshooting
- If paths are broken, check that all files maintain the `/jolenepwa/` prefix
- If PWA features don't work, verify service worker is loading
- For install issues, check the manifest.webmanifest is accessible
