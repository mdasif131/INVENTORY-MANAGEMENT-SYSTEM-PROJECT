import type { Request, Response } from 'express';
import ExpensesModel from '../../models/Expenses/expensesModel';

export const expenseSummaryService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = (req as any).user?.email;
    const data = await ExpensesModel.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: '$amount' },
              },
            },
          ],
          last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
                totalAmount: { $sum: '$amount' },
              },
            },
            { $sort: { _id: 1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    res.status(200).json({status: 'success', data: data.reverse()})
  } catch (error) {
    res
      .status(500)
      .json({ status: 'fail', message: 'Internal Server Error', error });
  }
};
