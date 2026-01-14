import { motion } from 'motion/react';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ErrorToast, IsEmpty } from '../../helper/formHelper';
import { getEmail, getOTP } from '../../helper/sessionHelper';
import { useNavigate } from 'react-router';
import { RecoverResetPassRequest } from '../../APIRequest/UsersAPIRequest';
const CreatePassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const email = getEmail();
  const otp = getOTP();
  const setNewPassword = async () => {
    const password = passwordRef.current?.value || ' ';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    if (IsEmpty(password)) {
      ErrorToast('Password Required');
    } else if (IsEmpty(confirmPassword)) {
      ErrorToast('Confirm Password Required');
    } else if (password !== confirmPassword) {
      ErrorToast('Password & Confirm Password Should be Same');
    } else {
      const result = await RecoverResetPassRequest(email, otp, password);
      if (result) {
        navigate('/login');
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeIn' }}
      className="w-full h-screen flex justify-center items-center"
    >
      <Card className="w-full max-w-md">
        <CardTitle className="inline-flex items-center justify-center py-5 text-xl text-gray-900">
          SET NEW PASSWORD
        </CardTitle>
        <CardContent>
          <form className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="flex flex-col space-y-2"
            >
              <label className="">Your email address</label>
              <Input
                id="email"
                type="email"
                readOnly={true}
                value={getEmail() as string}
                placeholder="Set Email"
                className={`focus-visible:ring-0 bg-muted  cursor-not-allowed `}
                ref={input => {
                  emailRef.current = input;
                }}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="flex flex-col space-y-2"
            >
              <label htmlFor="password">New Password</label>
              <Input
                id="password"
                placeholder="User Password"
                className="focus-visible:ring-purple-500"
                type="password"
                ref={input => {
                  passwordRef.current = input;
                }}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="flex flex-col space-y-2"
            >
              <label htmlFor="conPassword">Confirm Password</label>
              <Input
                id="conPassword"
                placeholder="Confrim Password"
                className="focus-visible:ring-purple-500"
                type="password"
                ref={input => {
                  confirmPasswordRef.current = input;
                }}
                required
              />
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <motion.div
            initial={{ y: 25 }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className="w-full"
          >
            <Button
              onClick={setNewPassword}
              className="w-full bg-purple-500 text-white inline-flex items-center justify-center py-2 font-semibold rounded-lg hover:bg-purple-950 hoverTransition"
            >
              Next
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CreatePassword;
