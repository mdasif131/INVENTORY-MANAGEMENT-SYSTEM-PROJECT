import type { Document, Model } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../utility/tsTypes';

export const deleteService = async <T extends Document>(Requested: AuthRequest, Model: Model<T>): Promise<ServiceResponse<any>> => {
  try {
    const deleteID = Requested.params.id 
    const userEmail = Requested.user?.email 
    let queryObject: Record<string, any> = {} 
    queryObject._id = deleteID;
    queryObject.userEmail = userEmail;
    const data = await Model.deleteMany(queryObject)
    return { status: 'success', data: data };
  } catch (error) {
     return { status: 'fail', message: 'Internal Server Error', error };
  }
}