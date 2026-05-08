# Food Delivery App - Deployment Guide

## Free Deployment Stack

This guide shows how to deploy the entire application for FREE using:
- **Frontend**: Vercel (free)
- **Backend**: Railway (free tier)
- **Database**: Supabase (free tier)

---

## Step 1: Prepare Code for Deployment

### 1.1 Update Environment Variables

**Frontend (.env.example):**
```env
VITE_API_URL=https://your-railway-backend-url/api
VITE_APP_NAME=Food Delivery
```

**Backend (.env.example):**
```env
PORT=3000
NODE_ENV=production
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
JWT_SECRET=your-super-secret-key-generate-this
JWT_EXPIRY=7d
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
APP_URL=https://your-vercel-frontend-url
API_URL=https://your-railway-backend-url
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=465
SMTP_USER=your_email
SMTP_PASS=your_password
```

### 1.2 Update Vite Config

Frontend `vite.config.js` needs to point to production API:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  }
})
```

---

## Step 2: Deploy Database (Supabase)

### Already Done!
Supabase is already set up as a managed service. Just:

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run `database/schema.sql`
4. Run `database/seed-data.sql`
5. Copy credentials to `.env`

**No additional deployment needed** - database is automatically hosted on Supabase.

---

## Step 3: Deploy Backend (Railway)

### 3.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### 3.2 Connect Backend Repository

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inside backend folder
cd backend

# Initialize Railway project
railway init

# Add environment variables
railway variables set SUPABASE_URL=<value>
railway variables set SUPABASE_ANON_KEY=<value>
railway variables set SUPABASE_SERVICE_ROLE_KEY=<value>
railway variables set JWT_SECRET=<generate-random-key>
railway variables set RAZORPAY_KEY_ID=<value>
railway variables set RAZORPAY_KEY_SECRET=<value>
railway variables set NODE_ENV=production
railway variables set PORT=3000

# Deploy
railway up
```

### 3.3 Configure build.json (Optional)

Create `backend/railway.json`:
```json
{
  "builder": "nixpacks",
  "buildCommand": "npm install",
  "startCommand": "npm start"
}
```

### 3.4 Get Backend URL

Once deployed:
```bash
railway status
```

Copy the generated URL (e.g., `https://food-api-production.railway.app`)

**Update Frontend** `.env`:
```env
VITE_API_URL=https://food-api-production.railway.app/api
```

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/food-delivery.git
git push -u origin main
```

### 4.2 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select the GitHub repository
5. Choose root directory: `frontend/`

### 4.3 Environment Variables on Vercel

Add in Vercel settings:
```
VITE_API_URL=https://your-railway-backend.railway.app/api
```

### 4.4 Deploy

Click "Deploy" - Vercel will auto-build and deploy!

**Frontend URL** will be something like:
```
https://food-delivery.vercel.app
```

---

## Step 5: Update Cross-Origin Policies

### 5.1 Backend CORS

Update `backend/src/index.js`:
```javascript
app.use(cors({
  origin: [
    'https://food-delivery.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}))
```

### 5.2 Update API URLs

**In Railway Backend** environment variables:
```
APP_URL=https://food-delivery.vercel.app
API_URL=https://your-railway-backend.railway.app
```

---

## Step 6: Testing Production

### Test API Endpoints
```bash
curl https://your-railway-backend.railway.app/api/health
```

### Test Frontend
```
https://food-delivery.vercel.app
```

### Test Login
- Email: `customer1@example.com`
- Password: `admin123`

---

## Monitoring & Maintenance

### Railway Dashboard
- View logs
- Monitor performance
- Check error rates

### Vercel Dashboard
- View deployments
- Check performance analytics
- View build logs

### Supabase Dashboard
- Monitor database
- Check row counts
- View database logs

---

## Cost Breakdown (FREE!)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Free tier | Free |
| Railway | Free tier (5 GB/month) | Free |
| Supabase | Free tier (500 MB) | Free |
| Razorpay | Sandbox | Free (for testing) |
| **TOTAL** | | **$0** |

---

## Important Notes

1. **Free tier limits:**
   - Railway: 5 GB/month, sleeps after inactivity
   - Supabase: 500 MB database, 2 GB bandwidth
   - Vercel: No limits

2. **For production:**
   - Upgrade Railway to paid plan for 24/7 uptime
   - Upgrade Supabase for larger database
   - Razorpay requires upgrade for production payments

3. **Security:**
   - Always use environment variables for secrets
   - Never commit `.env` file
   - Rotate JWT_SECRET periodically
   - Use HTTPS only

4. **Custom Domain:**
   - Vercel: Add domain in settings
   - Railway: Add custom domain in railway.app dashboard

---

## Troubleshooting

**Backend not starting on Railway:**
- Check logs: `railway logs`
- Verify environment variables are set
- Ensure package.json has correct start script

**Frontend can't connect to API:**
- Check CORS is properly configured
- Verify API URL in .env
- Check network tab in browser DevTools

**Database connection error:**
- Verify Supabase credentials
- Check IP whitelist (Supabase allows all by default)
- Ensure schema is created

---

## Next Steps

1. ✅ Deploy to free tier
2. Test all features
3. Upgrade to paid tiers as traffic grows
4. Add custom domain for branding
5. Set up monitoring and alerts
6. Implement more features

---

**Ready to go live! 🚀**
