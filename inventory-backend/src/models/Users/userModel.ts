import mongoose from 'mongoose';
import { UserDocument } from '../../types/tsTypes';
const { Schema, model } = mongoose;

const dataSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = model<UserDocument>('User', dataSchema);
export default UserModel;
