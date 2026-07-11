import express, { Request, Response } from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// 1. Logger Setup
app.use(pinoHttp());

// 2. CORS Configuration (Tied specifically to your live DB Removals site)
app.use(cors({
  origin: 'https://db-removals-removals-site.vercel.app',
  methods: ['POST', 'GET'],
  credentials: true
}));

// 3. Body Parser (Extracts the quote form fields)
app.use(express.json());

// 4. Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.send('DB Removals Backend API is active.');
});

// 5. House Removals Free Quote Endpoint
app.post('/api/quote', async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, details } = req.body;

  // Basic validation check
  if (!name || !email || !details) {
    res.status(400).json({ success: false, error: 'Missing required fields: name, email, or details.' });
    return;
  }

  // Email delivery transporter setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bevissmason999@gmail.com',
      pass: process.env.EMAIL_PASS, // DO NOT hardcode this password. Keep it secure in Vercel settings.
    },
  });

  // Layout of the automated email sent to your inbox
  const emailContent = `
    🏡 New House Removals Quote Request!
    
    --------------------------------------------
    Customer Name:  ${name}
    Email Address:  ${email}
    Phone Number:   ${phone || 'Not provided'}
    
    Removal Details / Job Requirements:
    ${details}
    --------------------------------------------
  `;

  try {
    // Deliver the email directly to your inbox
    await transporter.sendMail({
      from: 'bevissmason999@gmail.com',
      to: 'bevissmason999@gmail.com',
      subject: `🚚 New Quote Request from ${name}`,
      text: emailContent,
    });

    res.status(200).json({ success: true, message: 'Quote request emailed successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: 'Failed to dispatch email notification.' });
  }
});

// 6. Export the app for src/index.ts
export default app;

# 1. Install required email and CORS libraries along with their TypeScript definitions
pnpm add nodemailer cors && pnpm add -D @types/nodemailer @types/cors

# 2. Stage your updated files
git add src/app.ts package.json pnpm-lock.yaml

# 3. Commit the updates safely to your repository
git commit -m "feat: integrate cors for db-removals and setup nodemailer quote routing"

# 4. Push directly to GitHub to trigger your automatic Vercel backend deployment
git push origin main
