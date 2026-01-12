import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import BrandModel from '../../models/Brands/brandModel';
import { AuthRequest } from '../../types/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import mongoose from 'mongoose';
import { checkAssociateService } from '../../services/common/checkAssociateService';
import ProductModel from '../../models/Products/productsModel';
import { deleteService } from '../../services/common/deleteService';

export const createBrand = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, BrandModel);
  return res.status(201).json(result);
};
export const updateBrand = async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, BrandModel);
  return res.status(200).json(result);
};
export const brandList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [{ name: SearchRgx }];

  const result = await listService(req as AuthRequest, BrandModel, SearchArray);

  return res.status(200).json(result);
};
export const brandDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, BrandModel, {
    _id: 1,
    name: 1,
  });
  return res.status(200).json(result);
};

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deleteID = req.params.id;

  const checkAssociate = await checkAssociateService(
    { brandID: new mongoose.Types.ObjectId(deleteID) },
    ProductModel
  );

  if (checkAssociate) {
    res
      .status(400)
      .json({ status: 'Can not delete', data: 'Associate with Product' });
  }

  const result = await deleteService(req as AuthRequest, BrandModel);
  res.status(200).json({ status: 'success', data: result });
};
