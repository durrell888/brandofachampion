# Brand of a Champion — App Build Guide
# iOS (App Store) + Android (Google Play)

## Prerequisites
- Mac with Xcode installed (for iOS)
- Android Studio installed (for Android)
- Node.js 18+ installed
- Apple Developer Account ($99/year) — you have this ✅
- Google Play Developer Account ($25 one-time) — if you want Android on Play Store

---

## Step 1: Install Dependencies

Open Terminal, navigate to your project folder, and run:

```bash
cd brandofachampion

# Install existing project dependencies
npm install

# Install Capacitor core
npm install @capacitor/core @capacitor/cli

# Install Capacitor plugins
npm install @capacitor/ios @capacitor/android
npm install @capacitor/status-bar @capacitor/splash-screen
npm install @capacitor/push-notifications @capacitor/share
npm install @capacitor/browser @capacitor/app

# Initialize Capacitor (skip if capacitor.config.json already exists)
# npx cap init "Brand of a Champion" com.brandofachampion.app --web-dir dist
```

## Step 2: Build the Web App

```bash
npm run build
```

This creates the `dist/` folder that Capacitor wraps into the native app.

## Step 3: Add iOS Platform

```bash
npx cap add ios
npx cap sync ios
```

## Step 4: Add Android Platform

```bash
npx cap add android
npx cap sync android
```

## Step 5: Open in Xcode (iOS)

```bash
npx cap open ios
```

This opens the iOS project in Xcode. Then:

1. Select your Team (Apple Developer account) in Signing & Capabilities
2. Set the Bundle Identifier to: `com.brandofachampion.app`
3. Set the Display Name to: `BOAC`
4. Add your app icon (see App Icon section below)
5. Connect your iPhone and click Run to test
6. When ready, go to Product → Archive → Distribute App

## Step 6: Open in Android Studio (Android)

```bash
npx cap open android
```

This opens the Android project. Then:

1. Let Gradle sync complete
2. Connect an Android device or use the emulator
3. Click Run to test
4. When ready, Build → Generate Signed Bundle for Play Store

## Step 7: Every Time You Update the Website

After making changes to your React code:

```bash
npm run build
npx cap sync
```

Then rebuild in Xcode / Android Studio.

Or use the shortcut scripts:
```bash
npm run app:ios      # Build + sync + open Xcode
npm run app:android  # Build + sync + open Android Studio
```

---

## App Icon

You need app icons in multiple sizes. Use your BOAC logo.

**Easiest method:** 
1. Create a 1024x1024 PNG of your logo (no transparency for iOS)
2. Go to https://appicon.co
3. Upload your 1024x1024 image
4. Download the generated icon set
5. For iOS: Replace the contents of `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
6. For Android: Replace icons in `android/app/src/main/res/mipmap-*/`

## Splash Screen

The splash screen shows when the app opens.

1. Create a 2732x2732 PNG with your logo centered on a black background
2. For iOS: Replace `ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png`
3. For Android: Replace `android/app/src/main/res/drawable/splash.png`

---

## App Store Submission Checklist

### Before You Submit:
- [ ] App icon set (all sizes)
- [ ] Splash screen configured
- [ ] Tested on real iPhone device
- [ ] All links work within the app
- [ ] Subscription/payment flows work
- [ ] Privacy Policy URL ready
- [ ] Terms of Service URL ready
- [ ] Screenshots taken (see below)

### Screenshots Needed:
- 6.7" iPhone (iPhone 15 Pro Max): 1290 x 2796 px — at least 3 screenshots
- 6.5" iPhone (iPhone 14 Plus): 1284 x 2778 px — at least 3 screenshots
- 5.5" iPhone (iPhone 8 Plus): 1242 x 2208 px — at least 3 screenshots
- iPad Pro 12.9": 2048 x 2732 px — at least 3 screenshots (if supporting iPad)

**Tip:** Take screenshots on the simulator in Xcode at each device size.

### Google Play Screenshots:
- Phone: minimum 2 screenshots, 16:9 or 9:16 ratio
- Tablet: optional but recommended
- Feature graphic: 1024 x 500 px
