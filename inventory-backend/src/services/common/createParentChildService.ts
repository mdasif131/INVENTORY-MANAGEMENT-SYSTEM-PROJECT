
import type { Document, Model } from 'mongoose';
import type { Request, Response } from 'express';
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
  try {
    // Parent Creation
    const parent = Requested.body['parent'];
    parent.userEmail = Requested.user?.email;
    
    const parentCreation = await ParentModel.create(parent);

    // Child Creation
    if (parentCreation._id) {
    
      try {
        const childs = Requested.body['childs'];
        
        const updatedChilds = childs.map((element: any) => ({
          ...element,
          [JoinPropertyName]: parentCreation._id,
          userEmail: Requested.user?.email
        }));
        
        // Insert childs and get full documents
        const childsCreation = await ChildsModel.insertMany(updatedChilds);
        
        return {
          status: 'success',
          parent: parentCreation,
          childs: childsCreation,
        };
      } catch (error) {
        console.error('Child creation error:', error);
        await ParentModel.deleteOne({ _id: parentCreation._id });
        return { status: 'fail', message: 'Child Creation Failed', error };
      }
    } else {
      return { status: 'fail', message: 'Parent Creation Failed' };
    }
  } catch (error) {
    console.error('Parent creation error:', error);
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};


