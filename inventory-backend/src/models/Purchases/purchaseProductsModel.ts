import mongoose from 'mongoose';
import { PurchaseDocs } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<PurchaseDocs>(
  {
    userEmail: { type: String },
    purchaseID: { type: Schema.Types.ObjectId },
    productID: { type: Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const PurchaseProductModel = model<PurchaseDocs>('purchaseproduct', dataSchema);
export default PurchaseProductModel;
