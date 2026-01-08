import type { Request } from 'express';
import type { Model, Document } from 'mongoose';

// Generic response type
import { ServiceResponse } from '../../utility/tsTypes';
import generateToken from '../../utility/createToken';
          

// Generic create service function
export const userLoginService = async <T extends Document>(Requested: Request,DataModel: Model<T>): Promise<ServiceResponse<T>> => {
  try {
    let PostBody = Requested.body;
    let data = await DataModel.aggregate([
      { $match: { PostBody }, $project: { password: 0 } },
    ]);
      if (!data || data.length === 0) {
        return { status: 'fail', message: 'Invalid credentials' };
      } else {
        let token = generateToken(data[0]._id.toString(), data[0].email); 
        return { status: 'success', token: token, data: data[0] };
      }
    
  } catch (error) {
    return { status: "fail", message: 'Internal Server Error', error };
  }
}; 
