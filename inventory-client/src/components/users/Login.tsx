import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/formHelper';
import { LoginRequest } from '../../APIRequest/UsersAPIRequest';


const loginVariant = {
  initial: { y: 4, opacity: 0 },
  open: { y: 0, opacity: 1 },
};
const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const submitLogin = async () => {
    const email = emailRef.current?.value || ' ';
    const password = passRef.current?.value || ' ';
    if (IsEmail(email)) {
      ErrorToast('Invalid Email Address');
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required');
    } else {
      const result = await LoginRequest(email, password);
      if (result) {
        window.location.href = '/';
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center px-4 ">
      <Card className="w-full max-sm:max-w-sm md:max-w-md shadow-xl ">
        <CardTitle className="inline-flex items-center justify-center py-5 text-xl text-blue-600">
          Sing In
        </CardTitle>
        <CardContent>
          <motion.form
            initial="initial"
            whileInView={'open'}
            variants={loginVariant}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex flex-col space-y-5"
          >
            <div>
              <Input
                id="email"
                type="email"
                placeholder="User Email"
                className="focus-visible:ring-blue-500"
                ref={input => {
                  emailRef.current = input;
                }}
                required
              />
            </div>

            <div>
              <Input
                id="password"
                placeholder="User password"
                className="focus-visible:ring-blue-500"
                type="password"
                ref={input => {
                  passRef.current = input;
                }}
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
              onClick={submitLogin}
              className="w-full bg-blue-500 text-white inline-flex items-center justify-center py-2 font-semibold rounded-lg hover:bg-blue-600 hoverTransition"
            >
              Next
            </Button>
          </motion.div>
          <div className="flex flex-col items-center justify-center text-[16px] text-slate-500 py-2">
            <Link
              to={'/registration'}
              className="hover:text-blue-500 hoverTransition"
            >
              Sing Up
            </Link>
            <Link
              to={'/send-otp'}
              className="hover:text-blue-500 hoverTransition"
            >
              Forget Password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
