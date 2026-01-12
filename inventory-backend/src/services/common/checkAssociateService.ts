import type { Model } from 'mongoose';

export const checkAssociateService = async (
  QueryObject: Record<string, any>,
  AssociateModel: Model<any>
): Promise<boolean> => {
  try {
    const data = await AssociateModel.aggregate([{ $match: QueryObject }]);
    return data.length > 0;
  } catch (error) {
    return false;
  }
};