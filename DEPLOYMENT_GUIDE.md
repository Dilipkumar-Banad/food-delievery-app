# Food Delivery Application - Deployment Guide

## Project Status: Ready for Deployment ✅

This application now includes:
- ✅ Full cart functionality with localStorage persistence
- ✅ Complete checkout with Razorpay payment integration
- ✅ Standard CSS styling with responsive design
- ✅ Bilingual support (English & Kannada)
- ✅ Backend cart API routes
- ✅ Payment processing endpoints
- ✅ Comprehensive error handling

---

## Pre-Deployment Checklist

### 1. Environment Configuration

#### Backend (.env)
```bash
PORT=5000
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=https://your-domain.com
```

#### Frontend (.env.local)
```bash
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_RAZORPAY_KEY=rzp_live_your_key
```

### 2. Database Setup

1. Create a Supabase project (https://supabase.io)
2. Run the migration:
   ```bash
   psql -U postgres -h your-host -d your-db < database/schema.sql
   ```
3. Seed test data (if needed):
   ```bash
   psql -U postgres -h your-host -d your-db < database/seed-data.sql
   ```

### 3. Backend Deployment

```bash
cd backend
npm install
npm run migrate
npm start
```

For production with PM2:
```bash
npm install -g pm2
pm2 start src/index.js --name "food-delivery-api"
pm2 save
pm2 startup
```

### 4. Frontend Deployment

```bash
cd frontend
npm install
npm run build
npm run preview
```

### 5. Razorpay Integration

1. Create account at https://dashboard.razorpay.com
2. Get your API keys from dashboard
3. Update environment variables
4. Test with Razorpay test mode keys before going live

### 6. Email Configuration

1. Enable 2FA on Gmail
2. Generate App Password
3. Update EMAIL_USER and EMAIL_PASSWORD in .env

---

## Features Implementation Details

### Cart System
- **Frontend**: `src/context/CartContext.jsx` - Full state management with localStorage
- **Backend**: `src/routes/cart.js` - CRUD operations for cart
- **Persistence**: Auto-saves to localStorage
- **Features**:
  - Add/Remove products
  - Update quantity
  - Clear cart
  - Total calculation

### Checkout Process
- **File**: `src/pages/CheckoutPage.jsx`
- **Features**:
  - Address validation
  - Delivery slot selection
  - Coupon code support (WELCOME10, SAVE20)
  - Real-time price calculation
  - Razorpay integration
  - Order creation on successful payment

### Payment Gateway (Razorpay)
- **Config**: `src/config/razorpay.js`
- **Features**:
  - Secure payment processing
  - Signature verification
  - Payment status tracking
  - Error handling
  - Test & production modes supported

### Styling
- **File**: `src/styles/index.css`
- **Features**:
  - Mobile-responsive design
  - Custom color scheme (Orange primary)
  - Utility classes for quick styling
  - Smooth animations & transitions
  - Accessibility optimized

### Localization
- **Files**: `src/locales/en.json`, `src/locales/kn.json`
- **Features**:
  - Complete English translations
  - Kannada translations for all UI text
  - Language switcher in header
  - Persisted language preference

---

## API Endpoints

### Cart Routes
```
GET    /api/cart              - Get user's cart
POST   /api/cart/items        - Add item to cart
PUT    /api/cart/items/:id    - Update item quantity
DELETE /api/cart/items/:id    - Remove item from cart
DELETE /api/cart              - Clear entire cart
```

### Order Routes
```
GET    /api/orders            - Get user's orders
GET    /api/orders/:id        - Get order details
POST   /api/orders            - Create new order
POST   /api/orders/payment/init   - Initialize payment
POST   /api/orders/payment/verify - Verify payment
PUT    /api/orders/:id/status - Update order status
```

---

## Deployment Platforms

### Option 1: Heroku + Vercel
**Backend**: Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
```

**Frontend**: Deploy to Vercel
```bash
vercel deploy
```

### Option 2: AWS
- **Backend**: EC2 or ECS
- **Frontend**: CloudFront + S3
- **Database**: RDS

### Option 3: DigitalOcean
- **Backend**: App Platform or Droplet
- **Frontend**: Spaces (object storage) + CDN
- **Database**: Managed PostgreSQL

### Option 4: Docker
Create `Dockerfile` for both backend and frontend, then deploy to any container platform.

---

## Testing Checklist

- [ ] Cart Add/Remove functionality
- [ ] Quantity update works correctly
- [ ] Cart persists across page reload
- [ ] Checkout form validation
- [ ] Delivery slot selection
- [ ] Coupon code application
- [ ] Razorpay payment flow
- [ ] Order confirmation
- [ ] Language switching
- [ ] Mobile responsive design
- [ ] API error handling
- [ ] Payment gateway integration

---

## Performance Optimization

1. **Frontend**:
   - Code splitting with React.lazy()
   - Image optimization
   - Minification & bundling (Vite)
   - Caching strategies

2. **Backend**:
   - Database indexing (already implemented)
   - Connection pooling
   - Rate limiting
   - Request validation

3. **Database**:
   - Query optimization
   - Proper indexing
   - Connection pooling

---

## Security Best Practices

1. **HTTPS Only** - Enable SSL/TLS
2. **JWT Tokens** - Secure token storage
3. **CORS Configuration** - Restrict origins
4. **Rate Limiting** - Prevent abuse
5. **Input Validation** - All inputs validated
6. **Environment Variables** - Never commit secrets
7. **CSRF Protection** - Implement tokens
8. **SQL Injection** - Use parameterized queries

---

## Monitoring & Logging

1. **Error Tracking**: Sentry, DataDog
2. **Performance**: New Relic, DataDog
3. **Logging**: CloudWatch, ELK Stack
4. **Uptime Monitoring**: StatusPage.io

---

## Post-Deployment

1. Set up automated backups for database
2. Enable monitoring and alerts
3. Configure email notifications
4. Set up CDN for static assets
5. Enable analytics tracking
6. Create user documentation
7. Set up admin dashboard access

---

## Troubleshooting

### Cart not persisting
- Check localStorage is enabled
- Clear browser cache
- Check browser console for errors

### Payment not working
- Verify Razorpay keys
- Check CORS configuration
- Verify payment gateway script loading
- Check network requests in DevTools

### Database connection issues
- Verify connection string
- Check database credentials
- Ensure firewall rules allow connection
- Check database service is running

---

## Support & Maintenance

- Review logs daily
- Monitor payment transactions
- Update dependencies monthly
- Backup database regularly
- Test disaster recovery procedures

---

## Contact & Documentation

For more information, refer to:
- [Project Documentation](./DOCUMENTATION_INDEX.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/deployment.md)
