import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/userModel';

// Define the shape of JWT payload
interface DecodedToken extends JwtPayload {
  userId: string;
  email:string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: unknown;
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  // Read token from cookies
  token = req.cookies?.token;

  // If no token in cookies, check Authorization header
  if (!token && req.headers.authorization) {
    if (req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
  }

  if (token) {
    try {
      const keySecret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, keySecret) as DecodedToken;

      req.user = await UserModel.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
