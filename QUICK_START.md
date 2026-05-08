# Quick Start - Food Delivery Application

## Installation & Setup

### Prerequisites
- Node.js 18.x
- PostgreSQL or Supabase account
- Razorpay account (for payments)
- Git

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file with configuration
cp ../.env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start server
npm run dev  # Development
npm start    # Production
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
cat > .env.local << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY=rzp_test_1234567890
EOF

# Start development server
npm run dev

# Build for production
npm run build
```

### 3. Access Application

- **Frontend**: http://localhost:3000 (or port shown by Vite)
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

---

## Key Features

### ✅ Cart Management
- Add/remove products from cart
- Update quantities
- Automatic localStorage persistence
- Real-time total calculation

### ✅ Checkout & Payment
- Multi-step checkout process
- Address and delivery slot selection
- Coupon code support (WELCOME10, SAVE20)
- Razorpay payment integration
- Order confirmation

### ✅ User Interface
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme ready
- Bilingual support (English + Kannada)
- Smooth animations

### ✅ Backend API
- JWT authentication
- RESTful endpoints
- Error handling
- Input validation

---

## Test Credentials

### Test Account
```
Email: customer@example.com
Password: password123
Phone: 9876543210
```

### Test Coupon Codes
```
WELCOME10 - 10% discount
SAVE20    - 20% discount
```

### Razorpay Test Payment
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error
- Verify Supabase credentials
- Check internet connection
- Verify firewall rules

---

## Build for Production

### Backend
```bash
npm run build  # If using TypeScript
npm start      # Run production build
```

### Frontend
```bash
npm run build
npm run preview  # Test production build locally
```

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy to Heroku (Backend)
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Quick Deploy to Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

---

## API Documentation

See [docs/API.md](./docs/API.md) for complete API documentation.

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## Support

For issues or questions:
1. Check the documentation
2. Review error messages in console
3. Check API logs
4. Create an issue in the repository

---

## License

MIT License - Feel free to use for any purpose
