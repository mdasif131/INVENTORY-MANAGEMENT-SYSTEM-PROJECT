import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../utility/tsTypes';

export const deleteParentChildService = async <
  TParent extends Document,
  TChild extends Document
>(
  Requested: AuthRequest,
  ParentModel: Model<TParent>,
  ChildsModel: Model<TChild>,
  JoinPropertyName: string
): Promise<ServiceResponse<any>> => {
  // Create Transaction Session
  const session = await mongoose.startSession();
  try {
    // Begin Transaction
    await session.startTransaction();

    // First Database Process
    const deleteID = Requested.params.id;
    const userEmail = Requested.user?.email;
    
    const childQueryObject: Record<string, any> = {
      [JoinPropertyName]: deleteID,
      userEmail: userEmail, 
    };
    const parentQueryObject: Record<string, any> = {
      _id: deleteID,
      userEmail: userEmail,
    };
    
    //First Process
    let childDelete = await ChildsModel.deleteMany(childQueryObject).session(session) 
    
    // Second Process 
    let parentDelete = await ParentModel.deleteOne(parentQueryObject).session(session)

    // Commit Transaction
    await session.commitTransaction();
    session.endSession()

    return {status:"success", parent:parentDelete, childs: childDelete}
  } catch (error) {
    // Roll Back Transaction if Fail
    await session.abortTransaction();
    session.endSession();
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
