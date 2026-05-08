# Database Setup Guide - Food Delivery App

## Overview
The application uses Supabase (PostgreSQL) for the database. This guide will help you set up the tables required for the app to function.

## Option 1: Manual Setup (Recommended for Quick Start)

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in with your account
3. Select your project (the one from your `.env` file)
4. Click on **SQL Editor** in the left sidebar

### Step 2: Create Tables

Copy and paste the following SQL commands into the Supabase SQL Editor and execute them one by one:

#### 1. Create Users Table
```sql
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
```

#### 2. Create Products Table
```sql
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
```

#### 3. Create Orders Table
```sql
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
```

#### 4. Create Order Items Table
```sql
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. Create Carts Table
```sql
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. Create Agents Table
```sql
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
```

#### 7. Create Delivery Slots Table
```sql
CREATE TABLE IF NOT EXISTS delivery_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_orders INTEGER DEFAULT 20,
    current_orders INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. Create Coupons Table
```sql
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
```

#### 9. Create Feedback Table
```sql
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. Create Indexes
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_feedback_order_id ON feedback(order_id);
CREATE INDEX idx_coupons_code ON coupons(code);
```

## Option 2: Seed Demo Data

After creating the tables, seed sample data with demo users and products:

```sql
-- Insert Demo Users
INSERT INTO users (email, password, name, phone, role, address) VALUES 
('customer1@example.com', '$2a$10$dummy_hash_1', 'Amit Kumar', '9876543210', 'customer', '123 Main Street'),
('admin@fooddelivery.com', '$2a$10$dummy_hash_2', 'Admin User', '9876543211', 'admin', 'Admin Office'),
('agent1@fooddelivery.com', '$2a$10$dummy_hash_3', 'Delivery Agent', '9876543212', 'agent', 'Agent Station');

-- Insert Demo Products
INSERT INTO products (name, description, category, flour_type, price, quantity) VALUES
('Wheat Roti', 'Fresh whole wheat roti made daily', 'Roti', 'Wheat', 5.00, 100),
('Maida Chapati', 'Soft maida chapati, perfect for curries', 'Chapati', 'Maida', 3.00, 150),
('Jowar Roti', 'Healthy jowar roti with traditional recipe', 'Roti', 'Jowar', 6.00, 80),
('Rice Holige', 'Traditional rice holige with jaggery and ghee', 'Holige', 'Rice', 8.00, 50),
('Wheat Chapati', 'Nutritious wheat chapati', 'Chapati', 'Wheat', 4.00, 120);

-- Insert Delivery Slots
INSERT INTO delivery_slots (start_time, end_time, max_orders, is_available) VALUES
('10:00', '11:00', 20, true),
('12:00', '13:00', 20, true),
('15:00', '16:00', 20, true),
('18:00', '19:00', 20, true);
```

## Option 3: Using Migration Script

If you have direct database access configured, run:

```bash
cd backend
npm run migrate
npm run seed
```

## Verify Setup

To verify the tables were created successfully:

1. Go to Supabase Dashboard
2. Click on **Table Editor** in the left sidebar
3. You should see all the created tables:
   - users
   - products
   - orders
   - order_items
   - carts
   - agents
   - delivery_slots
   - coupons
   - feedback

## Troubleshooting

### Error: "Could not find the table 'public.orders'"
- **Cause**: The `orders` table hasn't been created yet
- **Solution**: Follow Option 1 to manually create the tables in Supabase

### Error: "relation 'users' does not exist"
- **Cause**: The `users` table hasn't been created
- **Solution**: Create the Users table first, then other tables in order (due to foreign key constraints)

### Foreign Key Constraint Errors
- **Cause**: Tables are being created out of order
- **Solution**: Create tables in this order:
  1. users
  2. products
  3. orders
  4. order_items
  5. carts
  6. agents
  7. delivery_slots
  8. coupons
  9. feedback

## Next Steps

1. Create all tables using Option 1
2. (Optional) Seed demo data
3. Restart the backend server: `npm run dev`
4. Try making an order in the frontend

---

For more information, visit [Supabase Documentation](https://supabase.com/docs)
