# 🚀 SEO Quick Start - 5 Minutes Setup

## Step 1: Update Your Domain (2 minutes)

### File 1: `src/components/SEO.tsx`
Find line 19 and replace:
```typescript
const siteUrl = 'https://yogineerstech.in'; // Update with your actual domain
```

### File 2: `src/components/LocalBusinessSchema.tsx`
Update all URLs with your domain (search for `yogineerstech.in`)

### File 3: `public/sitemap.xml`
Replace all instances of `https://yogineerstech.in/` with your domain

### File 4: `public/robots.txt`
Update the Sitemap URL with your domain

---

## Step 2: Add Contact Info (1 minute)

### In `src/components/LocalBusinessSchema.tsx`:
```typescript
"telephone": "+91-XXXXXXXXXX", // Line 18 - Add your phone
"email": "contact@yogineerstech.in", // Line 19 - Add your email
"streetAddress": "Your Street Address", // Line 22 - Add address
"postalCode": "400001", // Line 25 - Add postal code
```

---

## Step 3: Add Social Media (1 minute)

### In `src/components/SEO.tsx` (around line 90):
```typescript
"sameAs": [
  "https://www.linkedin.com/company/your-company",
  "https://twitter.com/your-handle",
  "https://github.com/your-github"
]
```

### In `src/components/LocalBusinessSchema.tsx` (around line 120):
```typescript
"sameAs": [
  "https://www.linkedin.com/company/yogineers",
  "https://twitter.com/yogineerstech",
  "https://github.com/yogineers",
  "https://www.facebook.com/yogineerstech",
  "https://www.instagram.com/yogineerstech"
]
```

---

## Step 4: Test It (1 minute)

Run your dev server:
```bash
npm run dev
```

Open browser and:
1. Right-click > View Page Source
2. Search for "Mumbai" - you should see it in meta tags
3. Search for "schema.org" - you should see structured data

---

## Step 5: Deploy & Submit (After deployment)

1. **Google Search Console:**
   - Go to: https://search.google.com/search-console
   - Add your property
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Google My Business:**
   - Go to: https://www.google.com/business/
   - Create business profile
   - Add all details

---

## ✅ You're Done!

Your SEO is now configured. For detailed information:
- 📖 Read `SEO_SETUP_GUIDE.md` for complete setup
- 🎯 Check `SEO_KEYWORDS_REFERENCE.md` for content strategy
- 📊 Review `SEO_IMPLEMENTATION_SUMMARY.md` for what's included

---

## 🆘 Quick Troubleshooting

**Meta tags not showing?**
- Clear browser cache
- Check if HelmetProvider is wrapping App (in main.tsx)

**Schema not validating?**
- Test at: https://search.google.com/test/rich-results
- Check for JSON syntax errors

**SEO component not working?**
- Verify react-helmet-async is installed: `npm list react-helmet-async`
- Check console for errors

---

## 📞 Need Help?

All SEO files are in:
- `src/components/SEO.tsx`
- `src/components/LocalBusinessSchema.tsx`
- `src/lib/seo-config.ts`
- `public/robots.txt`
- `public/sitemap.xml`

Happy optimizing! 🎉
