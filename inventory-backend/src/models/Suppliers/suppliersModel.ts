import mongoose from 'mongoose';
import { SupORCusDocument } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<SupORCusDocument>(
  {
    userEmail: { type: String },
    name: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const SupplierModel = model<SupORCusDocument>('supplier', dataSchema);
export default SupplierModel;
