import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
    // For development, use Ethereal Email (fake SMTP service)
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_HOST) {
        console.log('⚠️  Email service not configured. Please set up EMAIL_* environment variables.');
        return null;
    }

    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

// Send email function
const sendEmail = async (options) => {
    const transporter = createTransporter();

    if (!transporter) {
        console.log('Email would have been sent to:', options.to);
        console.log('Subject:', options.subject);
        return { messageId: 'test-' + Date.now() };
    }

    const mailOptions = {
        from: `${process.env.EMAIL_FROM_NAME || 'Blog Platform'} <${process.env.EMAIL_FROM || 'noreply@blog.com'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        throw error;
    }
};

// Email templates
export const emailTemplates = {
    // Welcome email
    welcome: (username) => ({
        subject: 'Welcome to Blog Platform!',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">Welcome to Blog Platform, ${username}!</h1>
        <p>Thank you for joining our community. We're excited to have you on board.</p>
        <p>Start sharing your thoughts and ideas with the world!</p>
        <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
          Get Started
        </a>
      </div>
    `,
        text: `Welcome to Blog Platform, ${username}! Thank you for joining our community.`,
    }),

    // Password reset
    resetPassword: (resetUrl, username) => ({
        subject: 'Password Reset Request',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">Password Reset Request</h1>
        <p>Hi ${username},</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #EF4444; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
          Reset Password
        </a>
        <p style="margin-top: 24px; color: #6B7280;">This link will expire in 10 minutes.</p>
        <p style="color: #6B7280;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
        text: `Hi ${username}, click this link to reset your password: ${resetUrl}. This link will expire in 10 minutes.`,
    }),

    // Email verification
    verifyEmail: (verifyUrl, username) => ({
        subject: 'Verify Your Email Address',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">Verify Your Email</h1>
        <p>Hi ${username},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verifyUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
          Verify Email
        </a>
        <p style="margin-top: 24px; color: #6B7280;">This link will expire in 24 hours.</p>
      </div>
    `,
        text: `Hi ${username}, click this link to verify your email: ${verifyUrl}. This link will expire in 24 hours.`,
    }),

    // New comment notification
    newComment: (postTitle, commenterName, postUrl) => ({
        subject: `New Comment on "${postTitle}"`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">New Comment on Your Post</h1>
        <p><strong>${commenterName}</strong> commented on your post "<strong>${postTitle}</strong>"</p>
        <a href="${postUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
          View Comment
        </a>
      </div>
    `,
        text: `${commenterName} commented on your post "${postTitle}". View it at: ${postUrl}`,
    }),
};

export default sendEmail;
