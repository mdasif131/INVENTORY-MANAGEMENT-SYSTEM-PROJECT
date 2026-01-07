import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface JWTPayload {
  userId: string;
  email: string;
}

const generateToken = (
  res: Response,
  userId: string,
  email: string
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId, email } as JWTPayload, secret, {
    expiresIn: '30d',
  });

  return token;
};

export default generateToken;
