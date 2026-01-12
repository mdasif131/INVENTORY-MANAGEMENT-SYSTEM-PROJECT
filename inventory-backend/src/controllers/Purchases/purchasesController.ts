import type { Request, Response } from 'express';
import { createParentChildsService } from '../../services/common/createParentChildService';
import { AuthRequest } from '../../types/tsTypes';
import PurchaseProductModel from '../../models/Purchases/purchaseProductsModel';
import PurchaseModel from '../../models/Purchases/purchasesModel'; // Use proper name
import { listOneJoinService } from '../../services/common/listOneJoinService';
import { deleteParentChildService } from '../../services/common/deleteParentChildService';

export const createPurchases = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await createParentChildsService(
    req as AuthRequest,
    PurchaseModel,
    PurchaseProductModel,
    'purchaseID'
  );
  return res.status(201).json(result);
};

export const purchasesList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { note: SearchRgx },
    { unit: SearchRgx },
    { 'suppliers.name': SearchRgx },
    { 'suppliers.address': SearchRgx },
    { 'suppliers.phone': SearchRgx },
  ];
  const JoinStage = {
    $lookup: {
      from: 'suppliers',
      localField: 'supplierID',
      foreignField: '_id',
      as: 'suppliers',
    },
  };
  const result = await listOneJoinService(
    req as AuthRequest,
    PurchaseModel,
    SearchArray,
    JoinStage
  );

  return res.status(200).json(result);
};

export const purchaseDelete = async (req: Request, res: Response) => {
  let result = deleteParentChildService(
    req as AuthRequest,
    PurchaseModel,
    PurchaseProductModel,
    'purchaseID'
  );
  return res.status(200).json(result);
};
