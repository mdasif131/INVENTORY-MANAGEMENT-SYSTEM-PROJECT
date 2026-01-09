import type { Request } from 'express';
import type { Model, Document } from 'mongoose';
import { ServiceResponse } from '../../utility/tsTypes';

interface AuthRequest extends Request {
  user?: {
    email?: string;
  };
}


export const userUpdateService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>
): Promise<ServiceResponse<T>> => {
  try {
    let email = Requested.user?.email;

    if (!email) {
      return { status: 'fail', message: 'Authentication problem' };
    }

    const data = await DataModel.findOneAndUpdate(
      { email },
      { $set: Requested.body }
    );

    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
