import type { Request, Response } from 'express';
import ExpensesModel from '../../models/Expenses/expensesModel';
import { createService } from '../../services/common/createService';
import { updateService } from '../../services/common/updateService';
import { AuthRequest } from '../../types/tsTypes';
import { listOneJoinService } from '../../services/common/listOneJoinService';
import { deleteService } from '../../services/common/deleteService';
import { detailsByIDService } from '../../services/common/detailsByIDService';

export const createExpense = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, ExpensesModel);
  return res.status(201).json(result);
};
export const updateExpense = async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, ExpensesModel);
  return res.status(200).json(result);
};

export const expenseDetailsById = async (req: Request, res: Response) => {
  const result = await detailsByIDService(req as AuthRequest, ExpensesModel);
  return res.status(200).json(result);
};

export const expensesList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { note: SearchRgx },
    { amount: SearchRgx },
    { 'type.name': SearchRgx },
  ];
  const JoinStage = {
    $lookup: {
      from: 'expensetypes',
      localField: 'typeID',
      foreignField: '_id',
      as: 'type',
    },
  };
  const result = await listOneJoinService(
    req as AuthRequest,
    ExpensesModel,
    SearchArray,
    JoinStage
  );

  return res.status(200).json(result);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const result = await deleteService(req as AuthRequest, ExpensesModel);
  return res.status(200).json(result);
};
