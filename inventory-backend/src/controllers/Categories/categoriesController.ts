import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import { AuthRequest } from '../../types/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import CategoriesModel from '../../models/Categories/categoriesModel';
import { checkAssociateService } from '../../services/common/checkAssociateService';
import ProductModel from '../../models/Products/productsModel';
import mongoose from 'mongoose';
import { deleteService } from '../../services/common/deleteService';
import { detailsByIDService } from '../../services/common/detailsByIDService';

export const createCategory = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, CategoriesModel);
  return res.status(201).json(result);
};
export const updateCategory = async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, CategoriesModel);
  return res.status(200).json(result);
};
export const categoryList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [{ name: SearchRgx }];

  const result = await listService(
    req as AuthRequest,
    CategoriesModel,
    SearchArray
  );

  return res.status(200).json(result);
};
export const categoryDetailsById = async (req: Request, res: Response) => {
  const result = await detailsByIDService(req as AuthRequest, CategoriesModel);
  return res.status(200).json(result);
};

export const categoryDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, CategoriesModel, {
    _id: 1,
    name: 1,
  });
  return res.status(200).json(result);
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deleteID = req.params.id;

  const checkAssociate = await checkAssociateService(
    { categoryID: new mongoose.Types.ObjectId(deleteID) },
    ProductModel
  );

  if (checkAssociate) {
    res
      .status(409)
      .json({ status: 'Associate', data: 'Associate with Product' });
    return;
  }

  const result = await deleteService(req as AuthRequest, CategoriesModel);
  res.status(200).json({ status: 'success', data: result });
};
