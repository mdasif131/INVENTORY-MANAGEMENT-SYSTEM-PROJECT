import type { Request, Response } from 'express';
import SellProductModel from '../../models/Sell/sellProductModel';
import SellSummaryModel from '../../models/Sell/sellSummaryModel';
import { createParentChildsService } from '../../services/common/createParentChildService';
import { listOneJoinService } from '../../services/common/listOneJoinService';
import { AuthRequest } from '../../utility/tsTypes';
import { deleteParentChildService } from '../../services/common/deleteParentChildService';

export const createSales = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await createParentChildsService(
    req as AuthRequest,
    SellSummaryModel,
    SellProductModel,
    'sellID'
  );
  return res.status(201).json(result);
};

export const SalesList = async (req: Request, res: Response) => {
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
    SellSummaryModel,
    SearchArray,
    JoinStage
  );

  return res.status(200).json(result);
};

export const salesDelete = async (req: Request, res: Response) => {
  let result = deleteParentChildService(req as AuthRequest, SellSummaryModel, SellProductModel, 'sellID');
  return res.status(200).json(result);
}