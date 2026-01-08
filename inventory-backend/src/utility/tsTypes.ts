import { Document, Types } from 'mongoose';

// In utility/tsTypes.ts
export interface ServiceResponse<T> {
  status: 'success' | 'fail';
  data?: T | T[] | null;
  message?: string;
  error?: any;
  token?: string;
}
export interface ServiceResponse2 {
  status: 'success' | 'fail';
  data?: unknown| null;
  message?: string;
  error?: any;

}
// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id?: string;
        [key: string]: any;
      };
    }
  }
}
export interface UserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  password?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 

export interface OTPDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  otp: string;
  status?: number;
  createdAt?: Date;
  expiresAt?: Date;
}