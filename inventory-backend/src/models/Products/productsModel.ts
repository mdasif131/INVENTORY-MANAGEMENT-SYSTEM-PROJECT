import mongoose from 'mongoose';
import { ProductDocument } from '../../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<ProductDocument>(
  {
    userEmail: { type: String },
    categoryID: { type: Schema.Types.ObjectId },
    brandID: { type: Schema.Types.ObjectId },
    name: { type: String},
    unit: { type: String},
    details: { type: String},
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = model<ProductDocument>('product', dataSchema);
export default ProductModel;
