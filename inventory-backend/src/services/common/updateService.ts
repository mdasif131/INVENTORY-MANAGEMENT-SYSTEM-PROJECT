import type { Document, Model } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../types/tsTypes';

export const updateService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>
): Promise<ServiceResponse<T>> => {
  try {
    let userEmail = Requested.user?.email;
    let id = Requested.params.id;
    let PostBody = Requested.body;
    let data = await DataModel.findOneAndUpdate(
      { _id: id, userEmail: userEmail },
      PostBody
    );

    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
