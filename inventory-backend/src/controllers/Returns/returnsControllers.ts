import type { Request, Response } from 'express';
import ReturnProductModel from '../../models/Returns/returnProduct';
import ReturnSummaryModel from '../../models/Returns/returnSummary';
import { createParentChildsService } from '../../services/common/createParentChildService';
import { listOneJoinService } from '../../services/common/listOneJoinService';
import { AuthRequest } from '../../utility/tsTypes';
import { deleteParentChildService } from '../../services/common/deleteParentChildService';

export const createReturn= async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await createParentChildsService(
    req as AuthRequest,
    ReturnSummaryModel,
    ReturnProductModel,
    'returnID'
  );
  return res.status(201).json(result);
};

export const returnList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { note: SearchRgx },
    { unit: SearchRgx },
    { 'customers.customerName': SearchRgx },
    { 'customers.address': SearchRgx },
    { 'customers.phone': SearchRgx },
  ];
  const JoinStage = {
    $lookup: {
      from: 'customers',
      localField: 'customerID',
      foreignField: '_id',
      as: 'customers',
    },
  };
  const result = await listOneJoinService(
    req as AuthRequest,
    ReturnSummaryModel,
    SearchArray,
    JoinStage
  );

  return res.status(200).json(result);
};
export const returnDelete = async (req: Request, res: Response) => {
  let result = deleteParentChildService(req as AuthRequest, ReturnSummaryModel, ReturnProductModel, 'returnID');
  return res.status(200).json(result);
}