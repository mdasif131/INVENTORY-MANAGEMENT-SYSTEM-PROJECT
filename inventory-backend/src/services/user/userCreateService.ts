import type { Request } from 'express';
import type { Model, Document } from 'mongoose';

// Generic response type
import { ServiceResponse } from '../../utility/tsTypes';
          

// Generic create service function
export const userCreateService = async <T extends Document>(Requested: Request,DataModel: Model<T>): Promise<ServiceResponse<T>> => {
  try {
    let PostBody = Requested.body;
    let email = PostBody.email
    let existUser = await DataModel.findOne({ email }) 
    if (existUser) {
     return { status: 'fail',  message: 'User already exists' };
    }
    let data = await DataModel.create(PostBody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: 'Internal Server Error', error };
  }
};
