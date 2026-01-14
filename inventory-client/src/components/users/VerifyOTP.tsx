import { motion } from 'motion/react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { ErrorToast } from '../../helper/formHelper';
import { getEmail } from '../../helper/sessionHelper';
import { useNavigate } from 'react-router';
import { RecoverVerifyOTPRequest } from '../../APIRequest/UsersAPIRequest';
const loginVariant = {
  initial: { y: 4, opacity: 0 },
  open: { y: 0, opacity: 1 },
};
const VerifyOTP = () => {
  const navigate = useNavigate();
  const email = getEmail();
  const [otp, setOtp] = useState<string>('');
  const submitOTP = async () => {
    if (otp.length === 6) {
      const result = await RecoverVerifyOTPRequest(email, otp);
      if (result) {
        navigate('/create-password');
      }
    } else {
      ErrorToast('Enter 6 Digit Code Required');
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="inline-flex justify-start text-xl text-gray-900">
            OTP VERIFICATION
          </CardTitle>
          <CardDescription>
            A 6 Digit verification code has been sent to you email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            initial="initial"
            whileInView={'open'}
            variants={loginVariant}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col gap-y-2 w-full">
              <label htmlFor="email" className="font-semibold ">
                Your email address
              </label>
              <InputOTP
                value={otp}
                onChange={(value: string) => setOtp(value)}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="flex w-full ">
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={0}
                  />
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={1}
                  />
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={2}
                  />
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={3}
                  />
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={4}
                  />
                  <InputOTPSlot
                    className="border-purple-500 flex-1"
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </motion.form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full"
          >
            <Button
              onClick={submitOTP}
              className="w-full bg-purple-500 text-white inline-flex items-center justify-center py-2 font-semibold rounded-lg hover:bg-purple-950 hoverTransition"
            >
              Send OTP
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;
