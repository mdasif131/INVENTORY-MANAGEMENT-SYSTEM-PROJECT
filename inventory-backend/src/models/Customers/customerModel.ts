import mongoose from 'mongoose';
import { SupORCusDocument } from '../../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<SupORCusDocument>(
  {
    userEmail: { type: String },
    customerName: { type: String},
    phone: { type: String, unique: true },
    email: { type: String}, 
    address: { type: String},
  },
  { timestamps: true, versionKey: false }
);

const CustomerModel = model<SupORCusDocument>('customer', dataSchema);
export default CustomerModel;
