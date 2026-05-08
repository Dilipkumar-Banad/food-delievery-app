import dotenv from 'dotenv'

dotenv.config()

// Razorpay configuration for payment processing
export const razorpayConfig = {
  keyId: process.env.RAZORPAY_KEY_ID,
  keySecret: process.env.RAZORPAY_KEY_SECRET,
  isValid: () => {
    return process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  }
}

export default razorpayConfig
