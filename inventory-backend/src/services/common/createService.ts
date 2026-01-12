import type { Document, Model } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../types/tsTypes';

export const createService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>
): Promise<ServiceResponse<T>> => {
  try {
    let PostBody = Requested.body;
    PostBody.userEmail = Requested.user?.email;

    let data = await DataModel.create(PostBody);
    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
