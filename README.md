# Food Delivery Application - Comprehensive Setup Guide

A complete full-stack food delivery web application for Roti, Chapati, and Holige products with multi-language support.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier)
- Razorpay sandbox account

### Local Development

**1. Clone/Navigate to project:**
```bash
cd Food
```

**2. Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev
```

**3. Setup Frontend (new terminal):**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**4. Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/health

## 📋 Prerequisites Setup

### 1. Supabase Database Setup

**Create a new project:**
1. Go to [supabase.com](https://supabase.com)
2. Sign up or login
3. Create a new project
4. Copy Project URL and Keys

**Create database schema:**
1. Go to SQL Editor in Supabase dashboard
2. Create a new query
3. Copy and paste the schema from `database/schema.sql`
4. Run the query
5. Run seed data from `database/seed-data.sql`

**Add to backend `.env`:**
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 2. Razorpay Payment Setup

**Create Razorpay account:**
1. Go to [razorpay.com](https://razorpay.com)
2. Sign up and verify
3. Go to Settings → Keys
4. Copy Key ID and Key Secret

**Add to backend `.env`:**
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### 3. Email Configuration (Optional)

For email notifications, configure SMTP in `.env`:
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=465
SMTP_USER=your_email
SMTP_PASS=your_password
```

Or use Mailtrap (free tier):
1. Go to [mailtrap.io](https://mailtrap.io)
2. Sign up
3. Create an inbox
4. Get SMTP credentials

## 🏗️ Project Structure

```
Food/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── config/          # Database & payment config
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth middleware
│   │   ├── services/        # Business logic
│   │   └── utils/           # Helpers
│   ├── migrations/
│   ├── seeds/
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Global state
│   │   ├── services/        # API calls
│   │   ├── locales/         # i18n (English & Kannada)
│   │   ├── styles/          # CSS
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── database/
│   ├── schema.sql           # Database tables
│   └── seed-data.sql        # Sample data
│
├── docs/
│   └── deployment.md
└── README.md                # This file
```

## 🔐 Authentication

System supports 3 roles:

### Customer
**Demo Account:**
- Email: `customer1@example.com`
- Password: `admin123` (hashed in DB)

**Features:**
- Browse products
- Create orders
- Pay online
- Track deliveries
- Provide ratings & feedback

### Admin
**Demo Account:**
- Email: `admin@fooddelivery.com`
- Password: `admin123`

**Features:**
- Manage products
- View all orders
- Assign agents
- Generate reports
- Manage coupons

### Agent
**Demo Accounts:**
- Email: `agent1@fooddelivery.com` or `agent2@fooddelivery.com`
- Password: `admin123`

**Features:**
- View assigned orders
- Update delivery status
- Track location
- View ratings

## 📦 Products Offered

### Created/Modified Products in Seed Data:

**Roti (₹10-12)**
- Plain Roti (Wheat)
- Rice Roti
- Jowar Roti
- Maida Roti

**Chapati (₹8-10)**
- Whole Wheat Chapati
- Rice Chapati
- Jowar Chapati
- Maida Chapati

**Holige (₹20-30)**
- Sweet Holige (Wheat)
- Savory Holige (Wheat)
- Rice Flour Holige
- Jowar Holige

## 🌐 Multilingual Support

**Available Languages:**
- English (en)
- Kannada (ಕನ್ನಡ)

**How to use:**
- Click language button in header to toggle
- Preference saved in localStorage
- Default language: English

## 💳 Payment Integration

**Razorpay Integration:**
- Test mode enabled by default
- No real charges in sandbox
- Test card: 4111 1111 1111 1111
- Any future expiry and CVV works

## 📱 Delivery Slots

Available delivery slots:
- 08:00 - 10:00
- 10:00 - 12:00
- 12:00 - 14:00
- 14:00 - 16:00
- 16:00 - 18:00
- 18:00 - 20:00

## 🎟️ Coupons

Sample coupon codes included:
- `WELCOME10` - 10% discount (min ₹50)
- `FLAT50` - ₹50 off (min ₹200)
- `SUMMER20` - 20% discount (min ₹100)
- `FIRST100` - ₹100 off (min ₹500)

## 🚀 Deployment

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
# Push to GitHub
# Connect GitHub repo to Vercel
# Auto-deploys on push
```

**Environment variables on Vercel:**
```
VITE_API_URL=https://your-backend-url/api
```

### Deploy Backend to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Deploy
railway up
```

**Environment variables on Railway:**
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=<strong_random_key>
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
NODE_ENV=production
```

### Database - Supabase (Already Free)

Free tier includes:
- 500 MB storage
- 2 GB bandwidth
- Unlimited API requests
- PostgreSQL database

## 📊 Database Schema

**Tables:**
- `users` - Customer, Admin, Agent accounts
- `products` - Roti, Chapati, Holige with flour types
- `orders` - Order records
- `order_items` - Individual items in orders
- `agents` - Delivery agent details
- `delivery_slots` - Available delivery time slots
- `coupons` - Discount codes
- `feedback` - Customer ratings & reviews

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` - New user signup
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create (admin)
- `PUT /api/products/:id` - Update (admin)

### Orders
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Order details
- `POST /api/orders` - Create order
- `POST /api/orders/:id/payment-confirm` - Confirm payment
- `PUT /api/orders/:id/status` - Update status

### Users
- `GET /api/users/profile` - User profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/feedback` - Add feedback

### Agents (Agent/Admin)
- `GET /api/agents/my-orders` - Assigned orders
- `PUT /api/agents/orders/:id/status` - Update delivery status

## 🐛 Troubleshooting

**Backend fails to start:**
- Check Node.js version (need 18+)
- Verify .env file exists and has correct values
- Check port 5000 is not in use

**Frontend can't connect to API:**
- Ensure backend is running
- Check VITE_API_URL in .env
- Check CORS settings in backend

**Database connection error:**
- Verify Supabase credentials
- Check database schema is created
- Ensure tables exist in Supabase

**Payment errors:**
- Verify Razorpay keys are correct
- Use sandbox test cards
- Check test mode is enabled

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Razorpay Docs](https://razorpay.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Features Included

✅ User authentication (JWT)
✅ Product management
✅ Shopping cart
✅ Order management
✅ Payment integration (Razorpay)
✅ Order tracking
✅ Delivery agent system
✅ Customer feedback & ratings
✅ Coupon system
✅ Email notifications
✅ Multilingual support (EN + Kannada)
✅ Role-based access control
✅ Responsive design (mobile-first)
✅ Database with seed data

## 📝 License

MIT License - Feel free to use this project.

## 🤝 Support

For issues or questions, refer to individual component READMEs or check the source code comments.

---

**Happy coding! 🚀**
