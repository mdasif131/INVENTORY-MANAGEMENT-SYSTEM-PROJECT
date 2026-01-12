import type { Request } from 'express';
import type { Model } from 'mongoose';
import { OTPDocument, ServiceResponse2 } from '../../types/tsTypes';
export const userVerifyOtpService = async (
  Requested: Request,
  otpModel: Model<OTPDocument>
): Promise<ServiceResponse2> => {
  const email = Requested.params.email;
  const otpCode = Requested.params.otp;
  try {
    const OTPCount = await otpModel.aggregate([
      { $match: { email: email, otp: otpCode, status: 0 } },
      { $count: 'total' },
    ]);
    if (OTPCount.length > 0) {
      const OTPUpdate = await otpModel.updateOne(
        { email: email, otp: otpCode, status: 0 },
        { $set: { status: 1 } }
      );
      return {
        status: 'success',
        message: 'OTP verified successfully',
        data: OTPUpdate,
      };
    } else {
      return { status: 'fail', message: 'Invalid OTP code' };
    }
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
