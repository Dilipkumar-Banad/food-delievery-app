# 🚀 Deployment Guide: Food Delivery App

## Overview
This guide covers deploying your Food Delivery App:
- **Frontend**: GitHub Pages (automatic via GitHub Actions)
- **Backend**: Railway.app
- **Database**: Supabase (already configured)

---

## Part 1: GitHub Pages Setup (Frontend)

### Step 1: Enable GitHub Pages
1. Go to your GitHub repo: https://github.com/Dilipkumar-Banad/food-delievery-app
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select `Deploy from a branch`
   - Branch: Select `gh-pages`
   - Folder: `/root`
4. Click **Save**

### Step 2: Update API URL
Before deployment, update the API URL in `frontend/.env.production`:

```bash
VITE_API_URL=https://your-railway-backend.railway.app/api
```

Replace `your-railway-backend` with your actual Railway app name (we'll get this in Part 2).

### Step 3: Push Changes
```bash
cd c:\Users\csddp\OneDrive\Desktop\Food
git add .
git commit -m "Setup deployment configuration"
git push origin main
```

The GitHub Actions workflow will automatically:
- Build your frontend
- Deploy to GitHub Pages at: `https://Dilipkumar-Banad.github.io/food-delievery-app/`

---

## Part 2: Railway Backend Deployment

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (easiest option)
3. Authorize Railway to access your GitHub

### Step 2: Deploy Backend
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login (opens browser)
railway login

# Navigate to backend
cd backend

# Create new project
railway init
# Select: Create new project
# Name: food-delivery-backend
```

### Step 3: Link GitHub Repository
```bash
# In the backend directory
railway link
# Select your GitHub repo
```

### Step 4: Set Environment Variables
On Railway dashboard (`https://railway.app`):

1. Click your project
2. Go to **Variables** tab
3. Add these variables:

| Variable | Value | Source |
|----------|-------|--------|
| `PORT` | `5000` | Default |
| `NODE_ENV` | `production` | Default |
| `SUPABASE_URL` | From `backend/.env` | Copy from your Supabase |
| `SUPABASE_ANON_KEY` | From `backend/.env` | Copy from your Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | From `backend/.env` | Copy from your Supabase |
| `JWT_SECRET` | Your-Secret-Key-123 | Create secure key |
| `JWT_EXPIRY` | `7d` | Default |
| `RAZORPAY_KEY_ID` | `rzp_test_SmrMirtn2gj8Mu` | Your test key |
| `RAZORPAY_KEY_SECRET` | `EGtQE5PA3ymX7UQEAFVQ02Ss` | Your test key |
| `SMTP_HOST` | `smtp.mailtrap.io` | Mailtrap/SendGrid |
| `SMTP_PORT` | `465` | Default |
| `SMTP_USER` | Your email provider user | Mailtrap/SendGrid |
| `SMTP_PASS` | Your email provider password | Mailtrap/SendGrid |
| `APP_URL` | `https://Dilipkumar-Banad.github.io/food-delievery-app` | Your frontend URL |
| `API_URL` | Your Railway backend URL | Will get after deployment |

### Step 5: Deploy
```bash
railway up
```

Railway will:
- Build your Node.js app
- Deploy it
- Generate a public URL like: `https://food-delivery-backend-production.up.railway.app`

### Step 6: Get Backend URL
1. On Railway dashboard, go to **Deployments**
2. Find your domain (ends with `.railway.app`)
3. Copy it

### Step 7: Update Frontend
Update `frontend/.env.production`:
```bash
VITE_API_URL=https://your-copied-railway-url/api
```

Then push:
```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push origin main
```

---

## Part 3: Verify Deployment

### Test Frontend
1. Go to: `https://Dilipkumar-Banad.github.io/food-delievery-app/`
2. Check if it loads and looks correct
3. Open browser DevTools → Network tab
4. Check if API calls go to Railway URL

### Test Backend
```bash
curl https://your-railway-url/api/health
# Should return: {"status":"API Server is running"}
```

### Test Full Flow
1. Go to frontend URL
2. Register a user
3. Login
4. Browse products
5. Add to cart
6. Go to checkout
7. Test Razorpay payment (use test card)

---

## Part 4: Production Checklist

- [ ] Frontend deployed on GitHub Pages
- [ ] Backend deployed on Railway
- [ ] Environment variables set on Railway
- [ ] API URL updated in frontend
- [ ] GitHub Pages deployment workflow active
- [ ] Tested full user flow
- [ ] Razorpay test payment works
- [ ] Email notifications working (Mailtrap)
- [ ] Database queries responding properly

---

## Troubleshooting

### GitHub Pages 404 Error
**Solution**: Make sure `vite.config.js` has correct base path:
```javascript
base: '/food-delievery-app/'  // Must match repo name
```

### Backend 503 Error
**Solution**: Check Railway Variables tab - all required env variables must be set

### CORS Errors
**Solution**: Your backend has CORS enabled. If still issues:
```javascript
// In backend/src/index.js
app.use(cors({
  origin: 'https://Dilipkumar-Banad.github.io',
  credentials: true
}));
```

### Razorpay Test Failing
**Solution**: Verify test keys in Railway Variables:
- Razorpay test key ID starts with `rzp_test_`
- Check that keys haven't expired

---

## Next Steps: Production

When ready for production:

1. **Switch Razorpay to Live Keys**
   - Get live keys from Razorpay Dashboard
   - Update Railway variables

2. **Secure Sensitive Data**
   - Change `JWT_SECRET` to strong random value
   - Use email service (not Mailtrap)
   - Enable database backups

3. **Domain Setup** (Optional)
   - Add custom domain to GitHub Pages (see Settings → Pages → CNAME)
   - Add SSL certificate

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API performance
   - Set up alerts

---

## Useful Links

- Railway Docs: https://docs.railway.app
- GitHub Pages: https://docs.github.com/en/pages
- Vite Build: https://vitejs.dev/guide/static-deploy.html
- Razorpay Test Mode: https://razorpay.com/docs/payments/test-mode/

---

## Questions?

- Railway Support: https://support.railway.app
- GitHub Support: https://support.github.com
- Check your GitHub Actions logs for build errors

