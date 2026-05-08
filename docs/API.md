# API Documentation

## Base URL
- Local: `http://localhost:5000/api`
- Production: `https://your-railway-backend.railway.app/api`

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "9876543210"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "role": "customer"
  },
  "token": "eyJ..."
}
```

### Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": { ... },
  "token": "eyJ..."
}
```

---

## Product Endpoints

### Get All Products
**GET** `/products`

Query Parameters:
- `category` (optional): Filter by Roti, Chapati, or Holige
- `flour_type` (optional): Filter by flour type

Response:
```json
[
  {
    "id": "uuid",
    "name": "Plain Roti",
    "description": "Traditional wheat roti",
    "category": "Roti",
    "flour_type": "Wheat",
    "price": 10.00,
    "quantity": 100,
    "image_url": "...",
    "is_active": true
  }
]
```

### Get Product by ID
**GET** `/products/:id`

### Get Products by Category
**GET** `/products/category/:category`

Categories: `Roti`, `Chapati`, `Holige`

### Create Product (Admin)
**POST** `/products`
*Requires: Admin role*

Request:
```json
{
  "name": "Plain Roti",
  "description": "Traditional wheat roti",
  "price": 10.00,
  "category": "Roti",
  "flour_type": "Wheat",
  "quantity": 100
}
```

### Update Product (Admin)
**PUT** `/products/:id`
*Requires: Admin role*

Request:
```json
{
  "name": "Updated Name",
  "price": 12.00,
  "quantity": 80,
  "is_active": true
}
```

### Delete Product (Admin)
**DELETE** `/products/:id`
*Requires: Admin role*

---

## Order Endpoints

### Get User Orders
**GET** `/orders`
*Requires: Authentication*

Response:
```json
[
  {
    "id": "uuid",
    "customer_id": "uuid",
    "delivery_slot": "18:00-20:00",
    "delivery_address": "123 Main St",
    "total": 285.00,
    "status": "delivered",
    "payment_status": "completed",
    "payment_method": "razorpay",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Get Order Details
**GET** `/orders/:id`
*Requires: Authentication*

### Create Order
**POST** `/orders`
*Requires: Authentication*

Request:
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "price": 10.00
    }
  ],
  "delivery_slot": "18:00-20:00",
  "delivery_address": "123 Main Street, Bangalore",
  "total": 285.00,
  "coupon_code": "WELCOME10"
}
```

Response:
```json
{
  "id": "uuid",
  "customer_id": "uuid",
  "status": "pending",
  "payment_status": "pending",
  "total": 285.00,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Confirm Payment
**POST** `/orders/:id/payment-confirm`
*Requires: Authentication*

Request:
```json
{
  "payment_id": "pay_xxxxx",
  "payment_method": "razorpay"
}
```

### Update Order Status (Admin/Agent)
**PUT** `/orders/:id/status`
*Requires: Admin or Agent role*

Request:
```json
{
  "status": "preparing"
}
```

Status values: `pending`, `confirmed`, `preparing`, `in_transit`, `delivered`, `cancelled`

---

## Agent Endpoints

### Get All Agents (Admin)
**GET** `/agents`
*Requires: Admin role*

### Get Agent's Orders
**GET** `/agents/my-orders`
*Requires: Agent role*

Response:
```json
[
  {
    "id": "uuid",
    "status": "in_transit",
    "customer": { "name": "...", "phone": "..." },
    "delivery_address": "...",
    "order_items": [...]
  }
]
```

### Update Delivery Status (Agent)
**PUT** `/agents/orders/:orderId/status`
*Requires: Agent role*

Request:
```json
{
  "status": "delivered"
}
```

---

## User Endpoints

### Get Profile
**GET** `/users/profile`
*Requires: Authentication*

### Update Profile
**PUT** `/users/profile`
*Requires: Authentication*

Request:
```json
{
  "name": "Updated Name",
  "phone": "9876543210",
  "address": "New Address"
}
```

### Add Feedback
**POST** `/users/feedback`
*Requires: Authentication*

Request:
```json
{
  "order_id": "uuid",
  "rating": 5,
  "comment": "Great service and delicious food!"
}
```

---

## Common Endpoints

### Get Delivery Slots
**GET** `/common/slots`

Response:
```json
[
  {
    "id": "uuid",
    "start_time": "08:00",
    "end_time": "10:00",
    "max_orders": 20,
    "current_orders": 5,
    "is_available": true
  }
]
```

### Validate Coupon
**GET** `/common/coupons/:code`

Response:
```json
{
  "code": "WELCOME10",
  "discount_type": "percentage",
  "discount_value": 10.00,
  "min_order_value": 50.00
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding it for production.

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer1@example.com",
    "password": "admin123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get User Orders (with token)
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Webhook Integration (Future)

For real-time updates, webhooks can be implemented for:
- Order status changes
- Payment confirmations
- Delivery updates
