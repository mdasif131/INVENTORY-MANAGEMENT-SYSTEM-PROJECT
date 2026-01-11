import mongoose from 'mongoose';
import { SellSummaryDocs } from '../../utility/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<SellSummaryDocs>(
  {
    userEmail: { type: String },
    customerID: { type: Schema.Types.ObjectId },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
  },
  { timestamps: true, versionKey: false }
);


const SellSummaryModel = model<SellSummaryDocs>('sellsummary', dataSchema);
export default SellSummaryModel;
