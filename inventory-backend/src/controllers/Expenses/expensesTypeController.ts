import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import { AuthRequest } from '../../utility/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import ExpenseTypeModel from '../../models/Expenses/expenseTypeModel';

export const createExpensetypes = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, ExpenseTypeModel);
  return res.status(201).json(result);
};
export const updateExpensetypes = async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, ExpenseTypeModel);
  return res.status(200).json(result);
};
export const expensetypesList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [{ name: SearchRgx }];

  const result = await listService(
    req as AuthRequest,
    ExpenseTypeModel,
    SearchArray
  );

  return res.status(200).json(result);
};
export const ExpensetypesDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, ExpenseTypeModel, {
    _id: 1,
    name: 1,
  });
  return res.status(200).json(result);
};
