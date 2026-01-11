import type { Request, Response } from 'express';
import { createParentChildsService } from '../../services/common/createParentChildService';
import { AuthRequest } from '../../utility/tsTypes';
import PurchaseProductModel from '../../models/Purchases/purchaseProductsModel';
import PurchaseModel from '../../models/Purchases/purchasesModel'; // Use proper name


export const createPurchases = async (req: Request, res: Response): Promise<Response> => {
  const result = await createParentChildsService(req as AuthRequest, PurchaseModel, PurchaseProductModel, "purchaseID");
  return res.status(201).json(result);
};
