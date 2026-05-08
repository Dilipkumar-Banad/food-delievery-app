# Food Delivery Application - Frontend

React.js frontend built with Vite for the food delivery system.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderTrackingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AgentDashboard.jsx
│   ├── context/        # React contexts
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── services/       # API service layer
│   │   └── api.js
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   │   └── index.css
│   ├── locales/        # i18n translations
│   │   ├── en.json     # English
│   │   └── kn.json     # Kannada
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
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

3. Update `.env` with backend API URL

## Running the Application

Development server:
```bash
npm run dev
```

Opens at http://localhost:3000

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

### Customer Features
- Browse products (Roti, Chapati, Holige)
- Filter by category and flour type
- Add items to cart
- Checkout with delivery slot selection
- Online payment via Razorpay
- Track order status in real-time
- Rate and provide feedback

### Admin Features
- Manage product catalog
- View all orders
- Assign delivery agents
- View sales reports
- Manage coupons and discounts
- Manage user accounts

### Agent Features
- View assigned orders
- Update delivery status
- Track location
- View earnings and ratings

## Internationalization

Two languages supported:
- **English** (en)
- **Kannada** (kn)

Switch using language button in header. Preference saved locally.

## Technologies

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **Icons**: Lucide React

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Food Delivery
```

## Key Pages

- `/` - Home page with featured products
- `/products` - Product catalog with filters
- `/cart` - Shopping cart
- `/checkout` - Checkout and payment
- `/orders/:id` - Order tracking
- `/login` - Customer login
- `/register` - Customer registration
- `/admin` - Admin dashboard
- `/agent` - Agent dashboard

## Responsive Design

- Mobile-first approach
- Fully responsive on all devices
- Touch-friendly interface
- Optimized for performance

## API Integration

Services layer in `src/services/api.js` handles all API calls:
- Authentication
- Product management
- Order management
- User profile
- Feedback submission
