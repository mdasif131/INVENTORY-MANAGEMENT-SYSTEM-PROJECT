import type { Document, Model } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../types/tsTypes';
import mongoose from 'mongoose';

export const detailsByIDService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>
): Promise<ServiceResponse<T>> => {
  try {
    const detailsID = Requested.params.id;
    const userEmail = Requested.user?.email;
    const queryObject: Record<string, any> = {
      _id :new mongoose.Types.ObjectId(detailsID),
      userEmail:userEmail,
    }
    const data = await DataModel.aggregate([
      {$match: queryObject}
    ])
    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
