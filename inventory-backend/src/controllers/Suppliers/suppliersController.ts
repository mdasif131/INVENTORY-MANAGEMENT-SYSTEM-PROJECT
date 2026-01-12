import type { Request, Response } from 'express';
import { createService } from '../../services/common/createService';
import { AuthRequest } from '../../utility/tsTypes';
import { updateService } from '../../services/common/updateService';
import { listService } from '../../services/common/listService';
import { dropDownService } from '../../services/common/dropDownService';
import SupplierModel from '../../models/Suppliers/suppliersModel';
import { checkAssociateService } from '../../services/common/checkAssociateService';
import mongoose from 'mongoose';
import { deleteService } from '../../services/common/deleteService';
import PurchaseModel from '../../models/Purchases/purchasesModel';


export const createSupplier = async (req: Request, res: Response) => {
  const result = await createService(req as AuthRequest, SupplierModel);
  return res.status(201).json(result);
};
export const updateSupplier= async (req: Request, res: Response) => {
  const result = await updateService(req as AuthRequest, SupplierModel);
  return res.status(200).json(result);
};
export const supplierList = async (req: Request, res: Response) => {
  const SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
  const SearchArray = [
    { name: SearchRgx },
    { phone: SearchRgx },
    { email: SearchRgx },
    { address: SearchRgx },
  ];

  const result = await listService(
    req as AuthRequest,
    SupplierModel,
    SearchArray
  );

  return res.status(200).json(result);
};
export const supplierDropDown = async (req: Request, res: Response) => {
  const result = await dropDownService(req as AuthRequest, SupplierModel, {
    _id: 1,
    name: 1,
  });
  return res.status(200).json(result);
};

export const deleteSupplier= async (req: Request, res: Response): Promise<void> => {
  const deleteID = req.params.id;
  const checkAssociate = await checkAssociateService({ supplierID: new mongoose.Types.ObjectId(deleteID)},PurchaseModel);

  if (checkAssociate) {
    res.status(400).json({ status: 'Can not delete', data: 'Associate with Purchase', });
  }

  const result = await deleteService(req as AuthRequest, SupplierModel);
  res.status(200).json({ status: 'success', data: result })
}