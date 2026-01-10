import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import { AuthRequest } from '../../utility/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import CustomerModel from '../../models/Customers/customerModel';


export const createCustomer = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, CustomerModel);
  return res.status(201).json(result);
};
export const updateCustomer= async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, CustomerModel);
  return res.status(200).json(result);
};
export const CustomerList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { customerName: SearchRgx },
    { phone: SearchRgx },
    { email: SearchRgx },
    { address: SearchRgx },
  ];

  const result = await listService(
    req as AuthRequest,
    CustomerModel,
    SearchArray
  );

  return res.status(200).json(result);
};
export const customerDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, CustomerModel, {
    _id: 1,
    customerName: 1,
  });
  return res.status(200).json(result);
};
