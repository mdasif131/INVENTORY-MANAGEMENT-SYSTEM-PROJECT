import type { Request, Response } from 'express';
import { userCreateService } from '../services/user/userCreateService';
import { userLoginService } from '../services/user/userLoginService';
import { userUpdateService } from '../services/user/userUpdateService';
import { userDetailsService } from '../services/user/userDetailsService';
import { AuthRequest } from '../utility/tsTypes';
import { recoverResetPassService } from '../services/user/userResetPassService';

import { userVerifyOtpService } from '../services/user/userVerifyOtpService';
import { recoverVerifyEmailService } from '../services/user/userVerifyEmailService';

import OTPModel from '../models/Users/otpModel';
import UserModel from '../models/Users/userModel';



export const registration = async (req: Request, res: Response) => {
  const result = await userCreateService(req, UserModel);
  return res.status(201).json(result);
};
export const login = async (req: Request, res: Response) => {
  const result = await userLoginService(req, UserModel);
  return res.status(200).json(result);
};
export const profileUpdate = async (req:Request, res: Response) => {
  const result = await userUpdateService(req as AuthRequest, UserModel);
  return res.status(200).json(result);
};
export const profileDetails = async (req:Request, res: Response) => {
  const result = await userDetailsService(req as AuthRequest, UserModel);
  return res.status(200).json(result);
};
export const recoverVerifyEmail = async (
  req: Request<{ email: string }>,
  res: Response
) => {
  const result = await recoverVerifyEmailService(req, UserModel, OTPModel);
  return res.status(200).json(result);
};
export const recoverVerifyOTP = async (req: Request, res: Response) => {
    const result = await userVerifyOtpService(req, OTPModel);
    return res.status(200).json(result);
};
export const recoverResetPass = async (req: Request, res: Response) => {
   const result = await recoverResetPassService(req, OTPModel, UserModel);
   return res.status(200).json(result);
};
