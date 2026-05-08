# Food Delivery Application

A complete full-stack food delivery web application for Roti, Chapati, and Holige products with multi-language support (English & Kannada).

## 🎯 Quick Start

### Fastest Way to Get Running:

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

Or manually:

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Visit:** http://localhost:3000

---

## 📋 What's Included

✅ **Complete Full-Stack App**
- React.js Frontend with Vite
- Node.js + Express Backend
- PostgreSQL Database (Supabase)
- Razorpay Payment Integration

✅ **Core Features**
- Customer product browsing and ordering
- Admin dashboard for product management
- Delivery agent system
- Real-time order tracking
- Payment processing
- Customer ratings & feedback
- Coupon/discount system

✅ **Multilingual**
- English
- Kannada (ಕನ್ನಡ)

✅ **Production Ready**
- Responsive design (mobile-first)
- JWT authentication
- Error handling
- Database migrations
- Seed data included

---

## 📁 Project Structure

```
Food/
├── backend/              # Express.js API
│   ├── src/              # Source code
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & validators
│   │   ├── services/     # Business logic
│   │   └── config/       # Configuration
│   ├── package.json
│   └── README.md
│
├── frontend/             # React.js Application
│   ├── src/              # Components & pages
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API calls
│   │   └── locales/      # Translations (EN/KN)
│   ├── package.json
│   └── README.md
│
├── database/             # Database schema & seed data
│   ├── schema.sql        # Create tables
│   └── seed-data.sql     # Sample data
│
├── docs/                 # Documentation
│   ├── API.md            # API reference
│   └── deployment.md     # Deploy to production
│
└── README.md            # This file
```

---

## 🔑 Demo Credentials

### Customer
- **Email:** customer1@example.com
- **Password:** admin123

### Admin
- **Email:** admin@fooddelivery.com
- **Password:** admin123

### Delivery Agent
- **Email:** agent1@fooddelivery.com
- **Password:** admin123

---

## 📋 Requirements

- **Node.js** 18+ and npm
- **Supabase** account (free)
- **Razorpay** account (for payments - sandbox mode is free)

---

## 🚀 Setup Configuration

### 1. Database Setup (Supabase)

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. In SQL Editor, run:
   ```bash
   # Copy contents of database/schema.sql
   # Then database/seed-data.sql
   ```
4. Copy your credentials to `.env` files

### 2. Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
JWT_SECRET=your-secret-key-here
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

### 3. Frontend Configuration

```bash
cd frontend
cp .env.example .env
```

`frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running Locally

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

---

## 🌐 Features Overview

### Customer Features
- Browse Roti, Chapati, Holige products
- Filter by flour type (Wheat, Rice, Jowar, Maida)
- Add items to cart
- Checkout with delivery slot selection
- Online payment via Razorpay
- Track orders in real-time
- Rate and review orders

### Admin Features
- Product catalog management
- View all orders
- Assign delivery agents
- View sales reports
- Manage coupons/discounts

### Agent Features
- View assigned orders
- Update delivery status
- Track order details
- View performance metrics

---

## 💳 Payment Integration

**Razorpay Configuration:**
- Sandbox mode enabled for testing
- No real charges
- Test card: `4111 1111 1111 1111`
- Any future date and CVV works

For live payments, upgrade Razorpay account and update keys.

---

## 📦 Products Available

### Roti (₹10-12)
- Plain Wheat Roti
- Rice Flour Roti
- Jowar Roti
- Maida Roti

### Chapati (₹8-10)
- Whole Wheat Chapati
- Rice Chapati
- Jowar Chapati
- Maida Chapati

### Holige (₹20-30)
- Sweet Holige
- Savory Holige
- Rice Flour Holige
- Jowar Holige

---

## 🎟️ Sample Coupons

- `WELCOME10` - 10% off (min ₹50)
- `FLAT50` - ₹50 off (min ₹200)
- `SUMMER20` - 20% off (min ₹100)
- `FIRST100` - ₹100 off (min ₹500)

---

## 📚 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Deployment Guide](docs/deployment.md) - Deploy to production (FREE!)
- [Backend README](backend/README.md) - Backend setup details
- [Frontend README](frontend/README.md) - Frontend setup details

---

## 🚀 Production Deployment

Deploy for FREE using:
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** Supabase

See [deployment guide](docs/deployment.md) for detailed steps.

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure Node.js 18+: `node --version`
- Check port 5000 is free
- Verify .env file exists

### Frontend can't connect to API
- Check backend is running
- Verify `VITE_API_URL` in .env
- Check browser console for CORS errors

### Database connection error
- Verify Supabase credentials
- Check database schema is created
- Ensure tables exist in Supabase dashboard

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

---

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for secrets
- JWT tokens expire automatically
- Passwords are bcrypt hashed
- HTTPS recommended for production

---

## 💡 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Express.js, Node.js |
| Database | PostgreSQL (Supabase) |
| Authentication | JWT |
| Payments | Razorpay |
| Internationalization | i18next |
| HTTP Client | Axios |

---

## 📞 Support & Help

1. Check README files in each directory
2. Review API documentation in [docs/API.md](docs/API.md)
3. Check browser console for errors
4. Verify environment variables are set correctly

---

## 📄 License

MIT - Free to use and modify

---

## 🎉 You're All Set!

Start building your food delivery business. Happy coding! 🚀

For questions or issues, refer to the documentation files included.

