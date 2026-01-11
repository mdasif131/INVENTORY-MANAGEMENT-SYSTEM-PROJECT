import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../utility/tsTypes';

// Service function with corrected types - supports different Parent and Child types
export const createParentChildsService = async <
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
    const parent = Requested.body['parent'];
    parent.userEmail = Requested.user?.email;

    const parentCreation = await ParentModel.create([parent], { session });

    // Second Database Process
    const childs = Requested.body['childs'];
    const updatedChilds = childs.map((element: any) => ({
      ...element,
      [JoinPropertyName]: parentCreation[0]._id,
      userEmail: Requested.user?.email,
    }));
    const childsCreation = await ChildsModel.insertMany(updatedChilds, {
      session,
    });

    // Transaction success
    await session.commitTransaction();
    session.endSession();
    return {
      status: 'success',
      parent: parentCreation,
      childs: childsCreation,
    };
  } catch (error) {
    // Roll Back Transaction if Fail
    await session.abortTransaction();
    session.endSession();
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
