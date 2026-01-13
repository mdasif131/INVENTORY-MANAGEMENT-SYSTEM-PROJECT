import type { Request, Response } from 'express';
import PurchaseModel from '../../models/Purchases/purchasesModel';

export const purchaseSummaryService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = (req as any).user?.email;
    const data = await PurchaseModel.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: '$grandTotal' },
              },
            },
          ],
          last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
                totalAmount: { $sum: '$grandTotal' },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'fail', message: 'Internal Server Error', error });
  }
};
