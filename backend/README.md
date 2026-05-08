# Food Delivery Application - Backend

Node.js + Express REST API backend for the food delivery system.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Supabase connection
│   │   └── razorpay.js  # Payment gateway config
│   ├── middleware/      # Middlewares
│   │   └── auth.js      # JWT authentication
│   ├── routes/          # API routes
│   │   ├── auth.js      # Auth endpoints
│   │   ├── products.js  # Product endpoints
│   │   ├── orders.js    # Order endpoints
│   │   ├── agents.js    # Agent endpoints
│   │   └── users.js     # User endpoints
│   ├── services/        # Business logic
│   │   └── emailService.js # Email notifications
│   ├── utils/           # Utilities
│   │   └── helpers.js   # Helper functions
│   └── index.js         # Main server file
├── migrations/          # Database migrations
├── seeds/              # Database seed scripts
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your Supabase and Razorpay credentials

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Products (Admin)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/payment-confirm` - Confirm payment

### Agents
- `GET /api/agents` - Get all agents (admin)
- `GET /api/agents/my-orders` - Get agent's orders
- `PUT /api/agents/orders/:orderId/status` - Update delivery status

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/feedback` - Add feedback

## Environment Variables

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRY=7d
RAZORPAY_KEY_ID=<your_razorpay_key>
RAZORPAY_KEY_SECRET=<your_razorpay_secret>
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=465
SMTP_USER=<your_email>
SMTP_PASS=<your_password>
APP_URL=http://localhost:3000
API_URL=http://localhost:5000
```

## Database Setup

The backend expects a Supabase PostgreSQL database. Run the schema SQL:

```bash
# In Supabase SQL Editor, run:
database/schema.sql
database/seed-data.sql
```

## Authentication

Uses JWT tokens. Include token in Authorization header:
```
Authorization: Bearer <token>
```

## Payment Integration

Razorpay is integrated for online payments. Configure keys in `.env`.

## Email Notifications

Uses Nodemailer for sending emails. Configure SMTP settings in `.env`.
