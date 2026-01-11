import mongoose from 'mongoose';
import { SellProductDocs } from '../../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<SellProductDocs>(
  {
    userEmail: { type: String },
    returnID: { type: Schema.Types.ObjectId },
    productID: { type: Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const ReturnProductModel = model<SellProductDocs>('returnproduct', dataSchema);
export default ReturnProductModel;
