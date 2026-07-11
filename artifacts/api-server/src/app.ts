import express, { Request, Response } from 'express';
import pinoHttp from 'pino-http'; // 1. Standard ESM import

const app = express();

// 2. Fix TS2349: Use the imported function correctly
app.use(pinoHttp()); 

// 3. Fix TS7006: Add explicit types for req and res
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
export default app;
