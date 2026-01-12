import mongoose from 'mongoose';
import { BrandDocument } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<BrandDocument>(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = model<BrandDocument>('brand', dataSchema);
export default BrandModel;
