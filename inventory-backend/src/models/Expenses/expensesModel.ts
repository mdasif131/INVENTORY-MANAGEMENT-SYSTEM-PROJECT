import mongoose from 'mongoose';
import { ExpenseDocument } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<ExpenseDocument>(
  {
    userEmail: { type: String },
    typeID: { type: Schema.Types.ObjectId },
    amount: { type: Number },
    note: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const ExpensesModel = model<ExpenseDocument>('expense', dataSchema);
export default ExpensesModel;
