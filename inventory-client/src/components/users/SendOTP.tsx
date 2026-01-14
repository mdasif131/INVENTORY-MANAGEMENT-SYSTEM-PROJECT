import { motion } from 'motion/react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { useRef } from 'react';
import { ErrorToast, IsEmail } from '../../helper/formHelper';
import { useNavigate } from 'react-router';
import { RecoverVerifyEmailRequest } from '../../APIRequest/UsersAPIRequest';

const loginVariant = {
  initial: { y: 4, opacity: 0 },
  open: { y: 0, opacity: 1 },
};
const SendOTP = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const verifyEmail = async () => {
    const email = emailRef.current?.value || ' ';
    if (IsEmail(email)) {
      ErrorToast('Valid Email Address Required');
    } else {
      const result = await RecoverVerifyEmailRequest(email);
      if (result) {
        navigate('/verify-otp');
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="inline-flex justify-start text-xl text-gray-900">
            EMAIL ADDRESS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.form
            initial="initial"
            whileInView={'open'}
            variants={loginVariant}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col gap-y-2">
              <label htmlFor="email" className="font-semibold ">
                Your email address
              </label>
              <Input
                id="email"
                type="email"
                ref={input => {
                  emailRef.current = input;
                }}
                placeholder="User Email"
                className="focus-visible:ring-purple-500"
                required
              />
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
              onClick={verifyEmail}
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

export default SendOTP;
