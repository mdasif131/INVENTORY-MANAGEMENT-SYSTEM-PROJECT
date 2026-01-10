import type { Document, Model, PipelineStage } from 'mongoose';
import { AuthRequest, ServiceResponse } from '../../utility/tsTypes';

type PaginatedResult<T> = {
  Total: { count: number }[];
  Rows: T[];
};

export const listTwoJoinService = async <T extends Document>(
  Requested: AuthRequest,
  DataModel: Model<T>,
  SearchArry: Record<string, unknown>[],
  JoinStage1: PipelineStage,
  JoinStage2: PipelineStage
): Promise<ServiceResponse<PaginatedResult<T>[]>> => {
  try {
    let pageNo = Number(Requested.params.pageNo);
    let perPage = Number(Requested.params.perPage);
    let searcValue = Requested.params.searchKeyword;
    let userEmail = Requested.user?.email;

    let skipRow = (pageNo - 1) * perPage;
    let data;

    if (searcValue !== '0') {
      let SearchQuery = { $or: SearchArry };
      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
        JoinStage1,
        JoinStage2,
        { $match: SearchQuery },
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
        JoinStage1,
        JoinStage2,
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
