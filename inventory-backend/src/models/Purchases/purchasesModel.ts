import mongoose from 'mongoose';
import { PurchaseSummaryDocs } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<PurchaseSummaryDocs>(
  {
    userEmail: { type: String },
    supplierID: { type: Schema.Types.ObjectId, ref: 'suppliers' },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const PurchaseModel = model<PurchaseSummaryDocs>('purchase', dataSchema);
export default PurchaseModel;
