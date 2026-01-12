import type { Request, Response } from 'express';
import ExpensesModel from '../../models/Expenses/expensesModel';

export const expenseReportService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = (req as any).user?.email;
    const fromDate = req.body.fromDate as string;
    const toDate = req.body.toDate as string;
    const joinWithExpensStage = {$lookup: {from: 'expensetypes',localField: 'typeID',foreignField: '_id',as: 'Type',},};
    const unwindExpensStage = { $unwind: '$Type' };
    const projectionStage = {$project: {'Type._id': 0,'Type.userEmail': 0,'Type.createdAt': 0,'Type.updatedAt': 0,},};

    const data = await ExpensesModel.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: { _id: 0, totalAmount: { $sum: '$amount' } },
            },
          ],
          Rows: [
            joinWithExpensStage,
            unwindExpensStage,
            projectionStage
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
