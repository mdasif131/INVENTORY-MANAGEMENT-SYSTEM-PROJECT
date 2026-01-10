import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import { AuthRequest } from '../../utility/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import CategoriesModel from '../../models/Categories/categoriesModel';


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

  const result = await listService(req as AuthRequest, CategoriesModel, SearchArray);

  return res.status(200).json(result);
};
export const categoryDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, CategoriesModel, {
    _id: 1,
    name: 1,
  });
  return res.status(200).json(result);
};