import type { Document, Model } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../types/tsTypes';

export const dropDownService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>,
  Projection: Record<string, 0 | 1>
): Promise<ServiceResponse<T[]>> => {
  try {
    let userEmail = Requested.user?.email;
    let data = await DataModel.aggregate([
      { $match: { userEmail: userEmail } },
      { $project: Projection },
    ]);
    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
