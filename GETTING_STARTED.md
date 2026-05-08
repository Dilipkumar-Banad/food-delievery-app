# 🚀 Getting Started - Food Delivery App

Welcome! This guide walks you through getting the application running in minutes.

---

## ⚡ 5-Minute Quickstart

### Requirements
- Node.js 18+ ([download](https://nodejs.org))
- npm (comes with Node.js)
- A text editor (VS Code recommended)

### Step 1: Navigate to project
```bash
cd "Food" 
```

### Step 2: Run setup script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

This will install all dependencies and create `.env` files.

### Step 3: Start the servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Runs on: http://localhost:5000

**Terminal 2 - Frontend (new terminal):**
```bash
cd frontend  
npm run dev
```
Runs on: http://localhost:3000

### Step 4: Open browser
Visit: **http://localhost:3000**

✅ **You're running the full app!**

---

## 🔑 Login with Demo Accounts

Try these credentials to explore all roles:

### Customer Account
```
Email: customer1@example.com
Password: admin123
```
Features: Browse products → Add to cart → Checkout

### Admin Account
```
Email: admin@fooddelivery.com
Password: admin123
```
Features: Manage products, view all orders, assign agents

### Delivery Agent Account
```
Email: agent1@fooddelivery.com
Password: admin123
```
Features: View assigned orders, update delivery status

---

## 📋 Database Setup (Your Supabase Account)

**Optional** - The app works with sample data, but to set up your own database:

### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free
3. Create new project

### 2. Add Database Schema
1. Open `database/schema.sql`
2. Copy all content
3. In Supabase SQL Editor, paste and run
4. Then copy and run `database/seed-data.sql`

### 3. Get Your Credentials
In Supabase dashboard:
- Project Settings → API
- Copy: `Project URL` and `anon` key

### 4. Update Backend .env
```bash
# Open backend/.env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 5. Restart Backend
```bash
# In backend terminal
npm run dev
```

---

## 🛠️ Troubleshooting

### "Port 5000 is already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "npm command not found"
- Install Node.js from https://nodejs.org
- Restart terminal/IDE

### "Cannot find module"
```bash
# In backend or frontend folder
rm -rf node_modules package-lock.json
npm install
```

### Frontend can't connect to backend
- Check backend is running (http://localhost:5000/api/health)
- Check VITE_API_URL in frontend/.env is correct
- Check browser console for CORS errors

### Database connection error
- Verify Supabase credentials in .env
- Check database tables exist in Supabase
- Password should match your Supabase setup

---

## 🗂️ File Structure Explained

```
Food/
├── backend/           ← Express API server
│   └── src/
│       ├── routes/    ← API endpoints
│       ├── config/    ← Database connection
│       └── index.js   ← Start here
│
├── frontend/          ← React web app
│   └── src/
│       ├── pages/     ← Different pages
│       ├── components/← Reusable parts
│       └── App.jsx    ← Main app
│
└── database/
    ├── schema.sql     ← Table definitions
    └── seed-data.sql  ← Sample data
```

---

## 🎨 Explore the Features

### As a Customer:
1. Login with customer account
2. Browse products on `/products`
3. Click "Add to Cart"
4. Go to `/cart` and checkout
5. Select delivery slot
6. Pay with test card: `4111 1111 1111 1111`
7. View order on `/orders`

### As an Admin:
1. Login with admin account
2. Go to `/admin`
3. View products and orders
4. Manage product inventory

### As a Delivery Agent:
1. Login with agent account
2. Go to `/agent`
3. View assigned orders
4. Update delivery status

---

## 🌐 Switch Language

In the top-right corner:
- Click the language button
- Toggle between English and Kannada (ಕನ್ನಡ)

The preference is saved automatically.

---

## 💳 Testing Payments

Razorpay test card:
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits

No actual charges are made in test mode.

---

## 📝 Making Changes

### Change Products
Edit `database/seed-data.sql` and re-run in Supabase

### Customize UI
Edit files in `frontend/src/`

### Add New API Endpoint
Add file in `backend/src/routes/` and import in `backend/src/index.js`

### Change Translations
Edit `frontend/src/locales/en.json` and `kn.json`

---

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **API Reference:** See `docs/API.md`
- **Deployment:** See `docs/deployment.md`
- **Project Structure:** See `PROJECT_STRUCTURE.md`
- **Quick Start:** See `QUICKSTART.md`

---

## 🚀 Ready to Deploy?

Deploy for FREE using:
- Frontend → Vercel
- Backend → Railway
- Database → Supabase

Follow: `docs/deployment.md`

---

## 💡 Tips

1. **Keep both servers running** - One terminal for backend, one for frontend
2. **Check console errors** - Open browser DevTools (F12) to see details
3. **Refresh page** - If data doesn't update, refresh the browser
4. **Hard refresh** - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. **Check environment** - Make sure .env files are filled correctly

---

## ❌ Still Having Issues?

1. **Check if services are running:**
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:3000

2. **View error logs:**
   - Backend: Check terminal output
   - Frontend: Check browser DevTools (F12) → Console

3. **Verify credentials:**
   - Double-check .env files
   - Make sure database schema is created

4. **Clear cache:**
   ```bash
   # Frontend
   rm -rf node_modules
   npm install
   npm run dev
   ```

5. **Read the full docs** in `README.md`

---

## 📖 Next Steps

After exploring:
1. Customize products and prices
2. Add your own delivery slots
3. Create more user accounts
4. Test complete order flow
5. Review code and learn architecture
6. Deploy to production
7. Add more features!

---

## 🎉 Congratulations!

You now have a fully functional food delivery platform running locally. 

Start exploring, make changes, and build something amazing! 🚀

---

**Questions?** Check the documentation files included in the project.

**Ready to deploy?** Follow `docs/deployment.md`

**Want to learn?** Explore the source code - it's well-commented!

