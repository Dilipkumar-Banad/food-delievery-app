# Quick Fix Guide - Database Setup

## Problem
Error: "Could not find the table 'public.orders' in the schema cache"

This error occurs because the database tables haven't been created yet in your Supabase project.

## Quick Solution (2 Minutes)

### Step 1: Go to Supabase SQL Editor
1. Visit: https://supabase.com/
2. Login to your account
3. Click on your project
4. Go to **SQL Editor** (left sidebar)
5. Click **New Query**

### Step 2: Create All Tables at Once
Copy and paste this entire SQL command:

```sql
-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'agent')),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Roti', 'Chapati', 'Holige')),
    flour_type VARCHAR(100) NOT NULL CHECK (flour_type IN ('Wheat', 'Rice', 'Jowar', 'Maida')),
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 100,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    delivery_slot VARCHAR(100) NOT NULL,
    delivery_address TEXT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'in_transit', 'delivered', 'cancelled')),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    payment_id VARCHAR(255),
    payment_method VARCHAR(100),
    coupon_code VARCHAR(100),
    assigned_agent_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    vehicle_number VARCHAR(50),
    is_available BOOLEAN DEFAULT true,
    current_location VARCHAR(255),
    total_deliveries INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_orders INTEGER DEFAULT 20,
    current_orders INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(50) CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_value DECIMAL(10, 2),
    max_usage INTEGER,
    current_usage INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_feedback_order_id ON feedback(order_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
```

### Step 3: Execute the Query
1. Click **Run** button (or press `Ctrl + Enter`)
2. Wait for it to complete (should see green checkmarks)

### Step 4: Verify Tables
1. Go to **Table Editor** (left sidebar)
2. You should see all these tables:
   - users
   - products
   - orders
   - order_items
   - carts
   - agents
   - delivery_slots
   - coupons
   - feedback

### Step 5: Seed Demo Data (Optional)
In the SQL Editor, run this to add demo users and products:

```sql
-- Add Demo Users
INSERT INTO users (email, password, name, phone, role, address) VALUES 
('customer1@example.com', 'hashed_pwd_1', 'Amit Kumar', '9876543210', 'customer', '123 Main Street'),
('admin@fooddelivery.com', 'hashed_pwd_2', 'Admin User', '9876543211', 'admin', 'Admin Office'),
('agent1@fooddelivery.com', 'hashed_pwd_3', 'Delivery Agent', '9876543212', 'agent', 'Agent Station');

-- Add Demo Products
INSERT INTO products (name, description, category, flour_type, price, quantity) VALUES
('Wheat Roti', 'Fresh whole wheat roti made daily', 'Roti', 'Wheat', 5.00, 100),
('Maida Chapati', 'Soft maida chapati, perfect for curries', 'Chapati', 'Maida', 3.00, 150),
('Jowar Roti', 'Healthy jowar roti with traditional recipe', 'Roti', 'Jowar', 6.00, 80),
('Rice Holige', 'Traditional rice holige with jaggery and ghee', 'Holige', 'Rice', 8.00, 50),
('Wheat Chapati', 'Nutritious wheat chapati', 'Chapati', 'Wheat', 4.00, 120);

-- Add Delivery Slots
INSERT INTO delivery_slots (start_time, end_time, max_orders, is_available) VALUES
('10:00', '11:00', 20, true),
('12:00', '13:00', 20, true),
('15:00', '16:00', 20, true),
('18:00', '19:00', 20, true);
```

### Step 6: Restart Backend
1. Stop the backend (if running): `Ctrl + C`
2. Restart: `npm run dev`

### Step 7: Test Payment
1. Go to http://localhost:3000
2. Click "Order Now" → Add products to cart
3. Click checkout and try payment - it should work now!

## What the Fix Does

✅ Creates all 9 database tables
✅ Sets up foreign key relationships
✅ Creates indexes for performance
✅ Adds demo data for testing

## If You Still Get Errors

**Restart both backend and frontend:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Clear browser cache:**
- Press `Ctrl + Shift + Del` (or `Cmd + Shift + Del` on Mac)
- Clear browsing data
- Refresh http://localhost:3000

## Need Help?

See `DATABASE_SETUP.md` for detailed information about each table and alternative setup methods.
