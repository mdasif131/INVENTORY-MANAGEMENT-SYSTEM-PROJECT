import type { Request, Response } from 'express';
import SellProductModel from '../../models/Sell/sellProductModel';

export const salesReportService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = (req as any).user?.email;
    const fromDate = req.body.fromDate as string;
    const toDate = req.body.toDate as string;
    const data = await SellProductModel.aggregate([
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
              $group: { _id: 0, totalAmount: { $sum: '$total' } },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: 'products',
                localField: 'productID',
                foreignField: '_id',
                as: 'products',
              },
            },
            { $unwind: '$products' },
            {
              $lookup: {
                from: 'brands',
                localField: 'products.brandID',
                foreignField: '_id',
                as: 'brands',
              },
            },
            { $unwind: '$brands' },
            {
              $lookup: {
                from: 'categories',
                localField: 'products.categoryID',
                foreignField: '_id',
                as: 'categories',
              },
            },
            { $unwind: '$categories' },
            {
              $project: {
                'products._id': 0,
                'products.createdAt': 0,
                'products.updatedAt': 0,
                'brands._id': 0,
                'brands.createdAt': 0,
                'brands.updatedAt': 0,
                'categories._id': 0,
                'categories.createdAt': 0,
                'categories.updatedAt': 0,
              },
            },
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
