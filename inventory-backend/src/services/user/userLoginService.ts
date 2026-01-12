import type { Request } from 'express';
import type { Model, Document } from 'mongoose';

// Generic response type
import { LoginBody, ServiceResponse } from '../../types/tsTypes';
import generateToken from '../../utility/createToken';

// Generic create service function
export const userLoginService = async <T extends Document>(
  Requested: Request,
  DataModel: Model<T>
): Promise<ServiceResponse<T>> => {
  try {
    const { email, password } = Requested.body as LoginBody;
    const data = await DataModel.aggregate([
      { $match: { email: email, password: password } },
      { $project: { password: 0 } },
    ]);
    if (!data || data.length === 0) {
      return { status: 'fail', message: 'Invalid credentials' };
    } else {
      let token = generateToken(data[0]._id, data[0].email);
      return { status: 'success', token: token, data: data[0] };
    }
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error as', error };
  }
};
