import mongoose from 'mongoose';
import { OTPDocument } from '../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<OTPDocument>(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const OTPModel = model<OTPDocument>('otp', dataSchema);
export default OTPModel;
