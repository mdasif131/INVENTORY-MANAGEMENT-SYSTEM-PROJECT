import type { Request, Response } from 'express';
import ProductModel from '../../models/Products/productsModel';
import { createService } from '../../services/common/createService';
import { updateService } from '../../services/common/updateService';
import { AuthRequest } from '../../types/tsTypes';
import { listTwoJoinService } from '../../services/common/listTwoJoinService';
import mongoose from 'mongoose';
import { checkAssociateService } from '../../services/common/checkAssociateService';
import { deleteService } from '../../services/common/deleteService';
import SellProductModel from '../../models/Sell/sellProductModel';
import PurchaseProductModel from '../../models/Purchases/purchaseProductsModel';
import ReturnProductModel from '../../models/Returns/returnProduct';

export const createProduct = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, ProductModel);
  return res.status(201).json(result);
};
export const updateProduct = async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, ProductModel);
  return res.status(200).json(result);
};

export const productList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { name: SearchRgx },
    { unit: SearchRgx },
    { 'categories.name': SearchRgx },
    { 'brands.name': SearchRgx },
  ];
  const JoinStage1 = {
    $lookup: {
      from: 'categories',
      localField: 'categoryID',
      foreignField: '_id',
      as: 'categories',
    },
  };
  const JoinStage2 = {
    $lookup: {
      from: 'brands',
      localField: 'brandID',
      foreignField: '_id',
      as: 'brands',
    },
  };
  const result = await listTwoJoinService(
    req as AuthRequest,
    ProductModel,
    SearchArray,
    JoinStage1,
    JoinStage2
  );

  return res.status(200).json(result);
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deleteID = req.params.id;
  const checkSalesAssociate = await checkAssociateService(
    { customerID: new mongoose.Types.ObjectId(deleteID) },
    SellProductModel
  );
  const checkPurchaseAssociate = await checkAssociateService(
    { customerID: new mongoose.Types.ObjectId(deleteID) },
    PurchaseProductModel
  );
  const checkReturnAssociate = await checkAssociateService(
    { customerID: new mongoose.Types.ObjectId(deleteID) },
    ReturnProductModel
  );

  if (checkSalesAssociate) {
    res
      .status(400)
      .json({ status: 'Can not delete', data: 'Associate with Sales' });
  } else if (checkPurchaseAssociate) {
    res
      .status(400)
      .json({ status: 'Can not delete', data: 'Associate with Purchase' });
  } else if (checkReturnAssociate) {
    res
      .status(400)
      .json({ status: 'Can not delete', data: 'Associate with Return' });
  } else {
    const result = await deleteService(req as AuthRequest, ProductModel);
    res.status(200).json({ status: 'success', data: result });
  }
};
