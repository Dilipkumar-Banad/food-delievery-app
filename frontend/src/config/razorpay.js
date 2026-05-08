// Validate that Razorpay keys are configured
if (!import.meta.env.VITE_RAZORPAY_KEY) {
  console.warn('Warning: VITE_RAZORPAY_KEY is not set in .env file');
}

export const RAZORPAY_CONFIG = {
  // Test Keys - Replace with your production keys
  KEY_ID: import.meta.env.VITE_RAZORPAY_KEY,
  KEY_SECRET: import.meta.env.VITE_RAZORPAY_SECRET,
  
  // API Endpoints
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Default Configuration
  currency: 'INR',
  timeout: 5000
};

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = (options) => {
  if (window.Razorpay) {
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } else {
    console.error('Razorpay script not loaded');
  }
};

export default RAZORPAY_CONFIG;
