import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import router from './routes/api'

// Load environment variables
dotenv.config();

const app: Application = express(); 

// Connect to Database 
connectDB() 

// Security Middlewares 
app.use(helmet())
app.use(hpp());
app.use(cors())
app.use(cookieParser());

// Body Parsers Middlewares 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//  Request Rate Lmiit 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,  
});
app.use(limiter);

// Routers Imlementation 
app.use("/api/v1", router) 

// Undefined Route Handler  
app.use((req, res) => { 
  res.status(404).json({status: "fail" ,message: 'Route Not Found' }); 
}); 
 
// Global Error Handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Inventory backend is running on port ${PORT}`);
// });
export default app;