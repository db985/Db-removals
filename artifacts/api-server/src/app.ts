import express, { Request, Response } from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// 1. Logger Setup
app.use(pinoHttp());

// 2. CORS Configuration (Allows your frontend to talk to this API)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Falls back to local dev
  methods: ['POST', 'GET'],
  credentials: true
}));

// 3. Body Parser (Crucial for receiving JSON form data from the frontend)
app.use(express.json());

// 4. Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend API is running smoothly.');
});

// 5. Free Quote Form & Email Endpoint
app.post('/api/quote', async (req: Request, res: Response): Promise<void> => {
  // Extracting data sent by your frontend form
  const { name, email, phone, details } = req.body;

  // Basic validation check
  if (!name || !email || !details) {
    res.status(400).json({ success: false, error: 'Missing required fields: name, email, or details.' });
    return;
  }

  // Configure your email transporter using secure environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Your Gmail 16-character App Password
    },
  });

  // Construct the email content
  const emailContent = `
    You have received a new Free Quote Request!
    
    --------------------------------------------
    Name:    ${name}
    Email:   ${email}
    Phone:   ${phone || 'Not provided'}
    
    Message / Details:
    ${details}
    --------------------------------------------
  `;

  try {
    // Send the email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Sends to you
      subject: `🚨 New Quote Request from ${name}`,
      text: emailContent,
    });

    res.status(200).json({ success: true, message: 'Quote request emailed successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: 'Failed to dispatch email notification.' });
  }
});

// 6. Export the app for src/index.ts to consume
export default app;

pnpm add nodemailer cors
pnpm add -D @types/nodemailer @types/cors
