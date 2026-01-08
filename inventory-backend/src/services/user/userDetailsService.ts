import type { Request } from 'express';
import type { Model, Document } from 'mongoose';

// Generic response type
import { ServiceResponse } from '../../utility/tsTypes';

export const userDetailsService = async <T extends Document>(Requested: Request,DataModel: Model<T>): Promise<ServiceResponse<T>> => {
  try {
    let email = Requested.user?.email 
    if (!email) {
      return { status: 'fail', message: 'Authentication problem' };
    }
    let data = await DataModel.aggregate([
      {  $match: {email:email } }
    ])
    return { status: "success", data: data[0] };
  } catch (error) {
    return { status: "fail", message: 'Internal Server Error', error };
  }
};
