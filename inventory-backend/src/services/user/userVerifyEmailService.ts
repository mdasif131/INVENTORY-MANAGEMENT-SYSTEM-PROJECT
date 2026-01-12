import type { Request } from 'express';
import type { Model } from 'mongoose';
import { getOTPEmailTemplate } from '../../utility/getOTPEmailTemplate';
import { sendEmailUtility } from '../../utility/sendEmailUtility';
import {
  OTPDocument,
  ServiceResponse2,
  UserDocument,
} from '../../types/tsTypes';

export const recoverVerifyEmailService = async (
  Requested: Request<{ email: string }>,
  userModel: Model<UserDocument>,
  otpModel: Model<OTPDocument>
): Promise<ServiceResponse2> => {
  const email = Requested.params.email;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    // Step 01 : Check if email exists
    const userExist = await userModel.aggregate([
      { $match: { email: email } },
      { $count: 'total' },
    ]);
    if (userExist.length > 0) {
      // Step 02: Get user name for personalization
      const user = await userModel.findOne({ email: email });
      const userName = user?.firstName ?? 'User';

      // Step 03: Create OTP record
      await otpModel.create({ email: email, otp: otp });

      // Step 04: Generate HTML email template
      const emailHTML = getOTPEmailTemplate(otp, userName);
      const emailText = `Hello ${userName}, Your OTP is ${otp}. This code will expire in 10 minutes.`;

      // Step 05: Send Email with HTML template
      const sendEmail = await sendEmailUtility(
        email,
        emailText,
        'Task Manager App PIN Verification',
        emailHTML
      );
      return {
        status: 'success',
        message: 'OTP sent to email',
        data: sendEmail,
      };
    } else {
      return { status: 'fail', message: 'Email does not exist' };
    }
  } catch (error) {
    return { status: 'fail', message: 'Internal Server Error', error };
  }
};
