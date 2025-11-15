# Google Analytics Setup Guide

## Step 1: Install the Package

Run this command in the `portfolio_frontend_final` directory:

```bash
npm install react-ga4
```

## Step 2: Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Create a new property (or use an existing one):
   - Click **Admin** (gear icon in bottom left)
   - Under **Property**, click **Create Property**
   - Fill in your website details
   - Click **Create**

4. Set up a Data Stream:
   - In Property settings, click **Data Streams**
   - Click **Add stream** > **Web**
   - Enter your website URL
   - Click **Create stream**

5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 3: Add Measurement ID to .env

Open `portfolio_frontend_final/.env` and replace `G-XXXXXXXXXX` with your actual Measurement ID:

```env
VITE_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
```

## Step 4: Restart Your Dev Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Step 5: Verify It's Working

1. Open your website in a browser
2. Open browser DevTools (F12)
3. Go to the **Network** tab
4. Filter by "google-analytics" or "collect"
5. Navigate between pages - you should see analytics requests being sent

Alternatively, use the [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

## Tracking Custom Events

You can track custom events using the utility functions in `src/lib/analytics.ts`:

```typescript
import { trackButtonClick, trackFormSubmit, logEvent } from '@/lib/analytics';

// Track button clicks
<button onClick={() => trackButtonClick('Contact CTA')}>
  Contact Us
</button>

// Track form submissions
const handleSubmit = () => {
  trackFormSubmit('Contact Form');
  // ... rest of your form logic
};

// Track custom events
logEvent('Video', 'Play', 'Hero Video');
```

## Production Deployment

Make sure to add your production Measurement ID to your hosting platform's environment variables:

- **Vercel**: Project Settings > Environment Variables
- **Netlify**: Site Settings > Build & Deploy > Environment
- **Other platforms**: Add `VITE_GA_MEASUREMENT_ID` to your environment variables

## Privacy Considerations

- Add a Privacy Policy page to your website
- Consider implementing cookie consent (GDPR compliance)
- You may want to anonymize IP addresses in GA settings
