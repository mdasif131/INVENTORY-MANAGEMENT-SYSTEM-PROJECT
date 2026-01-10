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

const CategoriesModel = model<BrandDocument>('categorie', dataSchema);
export default CategoriesModel;
