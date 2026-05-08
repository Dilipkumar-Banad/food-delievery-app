import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOrderConfirmation = async (email, order) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Order Confirmation #${order.id}`,
    html: `
      <h2>Order Confirmed!</h2>
      <p>Your order has been confirmed.</p>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Total Amount:</strong> ₹${order.total}</p>
      <p><strong>Delivery Slot:</strong> ${order.delivery_slot}</p>
      <p>You can track your order using the mobile app or website.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

export const sendDeliveryNotification = async (email, order) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Your order is on the way! #${order.id}`,
    html: `
      <h2>Order Out for Delivery</h2>
      <p>Your order #${order.id} is out for delivery.</p>
      <p>Expected delivery time: ${order.delivery_time}</p>
      <p>Agent: ${order.agent_name}</p>
      <p>Contact: ${order.agent_phone}</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};
