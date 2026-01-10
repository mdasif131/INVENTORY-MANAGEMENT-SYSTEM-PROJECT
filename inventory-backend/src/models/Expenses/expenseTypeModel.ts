import mongoose from 'mongoose';
import { BrandDocument } from '../../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<BrandDocument>(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
  },
  { timestamps: true, versionKey: false }
);

const ExpenseTypeModel = model<BrandDocument>('expensetype', dataSchema);
export default ExpenseTypeModel;
