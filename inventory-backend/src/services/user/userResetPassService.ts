import type { Request } from 'express';
import type { Model } from 'mongoose';
import {
  OTPDocument,
  ServiceResponse2,
  UserDocument,
} from '../../types/tsTypes';

export const recoverResetPassService = async (
  Requested: Request,
  otpModel: Model<OTPDocument>,
  userModel: Model<UserDocument>
): Promise<ServiceResponse2> => {
  const { email, otp, password } = Requested.body;
  let updateStatus = 1;
  try {
    const OTPCount = await otpModel.aggregate([
      { $match: { email: email, otp: otp, status: updateStatus } },
      { $count: 'total' },
    ]);

    if (OTPCount.length > 0) {
      const passwordUpdate = await userModel.updateOne(
        { email: email },
        { $set: { password: password } }
      );
      return {
        status: 'success',
        message: 'Password reset successfully',
        data: passwordUpdate,
      };
    } else {
      return { status: 'fail', message: 'Invalid OTP code' };
    }
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
