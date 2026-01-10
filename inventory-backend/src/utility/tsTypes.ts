import { Document, Types } from 'mongoose';
import type { Request } from 'express';
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
  data?: unknown | null;
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
  email?: string;
  otp: string;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface BrandDocument extends Document {
  _id: Types.ObjectId;
  userEmail: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SupORCusDocument extends Document {
  _id: Types.ObjectId;
  userEmail: string;
  name?: string;
  customerName?:string
  address: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
} 
export interface ExpenseDocument extends Document {
  userEmail: string;
  typeID: Types.ObjectId;
  amount: number;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProductDocument extends Document {
  userEmail: string;
  categoryID: Types.ObjectId;
  brandID: Types.ObjectId;
  name: string;
  unit: string;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    email?: string;
  };
}
export interface LoginBody {
  email: string;
  password: string;
}
