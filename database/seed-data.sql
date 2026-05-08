-- ============================================
-- Seed Data for Food Delivery Application
-- ============================================

-- Insert Products (Roti, Chapati, Holige with different flour types)
INSERT INTO products (name, description, category, flour_type, price, quantity, is_active) VALUES
-- Roti
('Plain Roti', 'Traditional whole wheat roti, soft and freshly made', 'Roti', 'Wheat', 10.00, 100, true),
('Rice Roti', 'Healthy rice flour roti with nutritious ingredients', 'Roti', 'Rice', 12.00, 80, true),
('Jowar Roti', 'Protein-rich jowar roti, perfect for health-conscious customers', 'Roti', 'Jowar', 12.00, 60, true),
('Maida Roti', 'Soft and fluffy maida roti, kids favorite', 'Roti', 'Maida', 10.00, 100, true),

-- Chapati
('Whole Wheat Chapati', 'Traditional Indian chapati made with whole wheat flour', 'Chapati', 'Wheat', 8.00, 150, true),
('Rice Chapati', 'Light and crispy rice flour chapati', 'Chapati', 'Rice', 10.00, 100, true),
('Jowar Chapati', 'Nutritious jowar chapati with traditional taste', 'Chapati', 'Jowar', 10.00, 80, true),
('Maida Chapati', 'Soft and flaky maida chapati', 'Chapati', 'Maida', 8.00, 120, true),

-- Holige (Sweet/Savory)
('Sweet Holige', 'Traditional sweet holige with jaggery and lentil filling', 'Holige', 'Wheat', 25.00, 50, true),
('Savory Holige', 'Savory holige with spiced potato and onion filling', 'Holige', 'Wheat', 20.00, 60, true),
('Rice Flour Holige', 'Delicious holige made with rice flour', 'Holige', 'Rice', 30.00, 40, true),
('Jowar Holige', 'Jowar-based holige with traditional filling', 'Holige', 'Jowar', 28.00, 45, true);

-- Insert Demo Admin User
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password, name, phone, role, is_active) VALUES
('admin@fooddelivery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/PFm', 'Admin User', '9876543210', 'admin', true);

-- Insert Demo Customer Users
INSERT INTO users (email, password, name, phone, role, address, is_active) VALUES
('customer1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/PFm', 'Rajesh Kumar', '9876543211', 'customer', '123 Main Street, Bangalore', true),
('customer2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/PFm', 'Priya Singh', '9876543212', 'customer', '456 Oak Lane, Bangalore', true);

-- Insert Demo Agent Users
INSERT INTO users (email, password, name, phone, role, is_active) VALUES
('agent1@fooddelivery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/PFm', 'Arjun Das', '9876543213', 'agent', true),
('agent2@fooddelivery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/PFm', 'Deepak Sharma', '9876543214', 'agent', true);

-- Insert Agents
INSERT INTO agents (user_id, vehicle_number, is_available, total_deliveries, rating) 
SELECT id, 'KA05AB1234', true, 15, 4.5 FROM users WHERE email = 'agent1@fooddelivery.com'
UNION ALL
SELECT id, 'KA05AB5678', true, 22, 4.8 FROM users WHERE email = 'agent2@fooddelivery.com';

-- Insert Delivery Slots
INSERT INTO delivery_slots (start_time, end_time, max_orders, current_orders, is_available) VALUES
('08:00', '10:00', 20, 5, true),
('10:00', '12:00', 20, 3, true),
('12:00', '14:00', 20, 8, true),
('14:00', '16:00', 20, 2, true),
('16:00', '18:00', 20, 10, true),
('18:00', '20:00', 20, 15, true);

-- Insert Coupons
INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_usage, is_active, expires_at) VALUES
('WELCOME10', 'percentage', 10.00, 50.00, 100, true, '2025-12-31 23:59:59'),
('FLAT50', 'fixed', 50.00, 200.00, 50, true, '2025-12-31 23:59:59'),
('SUMMER20', 'percentage', 20.00, 100.00, 200, true, '2025-06-30 23:59:59'),
('FIRST100', 'fixed', 100.00, 500.00, 25, true, '2025-12-31 23:59:59');

-- Insert Sample Orders (optional - for testing)
INSERT INTO orders (customer_id, delivery_slot, delivery_address, total, status, payment_status, payment_method, created_at)
SELECT 
  u.id, 
  '18:00-20:00', 
  '123 Main Street, Bangalore',
  285.00,
  'delivered',
  'completed',
  'razorpay',
  CURRENT_TIMESTAMP - INTERVAL '5 days'
FROM users u WHERE u.email = 'customer1@example.com'
UNION ALL
SELECT 
  u.id, 
  '16:00-18:00', 
  '456 Oak Lane, Bangalore',
  150.00,
  'delivered',
  'completed',
  'razorpay',
  CURRENT_TIMESTAMP - INTERVAL '3 days'
FROM users u WHERE u.email = 'customer2@example.com';

-- Insert Sample Feedback
INSERT INTO feedback (order_id, customer_id, rating, comment)
SELECT o.id, o.customer_id, 5, 'Excellent taste and quick delivery!' 
FROM orders o 
WHERE o.status = 'delivered' 
LIMIT 1;
