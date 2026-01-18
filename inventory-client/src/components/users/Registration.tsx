import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

import { useRef } from 'react';

import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
} from '../../helper/formHelper';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { defultPhoto } from '../../assets/images/constant';
import { RegistrationRequest } from '../../APIRequest/UsersAPIRequest';
const Registration = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onRegistration = async () => {
    const email = emailRef.current?.value || '';
    const firstName = firstNameRef.current?.value || '';
    const lastName = lastNameRef.current?.value || '';
    const mobile = mobileRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const photo = defultPhoto || '';

    if (IsEmail(email)) {
      ErrorToast('Valid Email Adress Required');
    } else if (IsEmpty(firstName)) {
      ErrorToast('First Name Required');
    } else if (IsEmpty(lastName)) {
      ErrorToast('Last Name Required');
    } else if (!IsMobile(mobile)) {
      ErrorToast('Valid Mobile Required');
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required');
    } else {
      const result = await RegistrationRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      );
      if (result) {
        navigate('/login');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-screen flex justify-center items-center px-4"
    >
      <Card className="w-full max-w-md max-sm:max-w-sm shadow-xl">
        <CardTitle className="inline-flex items-center justify-center py-5 text-xl text-blue-600">
          Sing Up
        </CardTitle>
        <CardContent>
          <form className="flex flex-col space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Input
                id="name"
                placeholder="First Name"
                className="focus-visible:ring-blue-500"
                type="text"
                ref={input => {
                  firstNameRef.current = input;
                }}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Input
                id="lastName"
                placeholder="Last Name"
                className="focus-visible:ring-blue-500"
                type="text"
                ref={input => {
                  lastNameRef.current = input;
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
            >
              <Input
                id="mobile"
                placeholder="Mobile"
                className="focus-visible:ring-blue-500"
                type="text"
                ref={input => {
                  mobileRef.current = input;
                }}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Input
                id="password"
                placeholder="User Password"
                className="focus-visible:ring-blue-500"
                type="password"
                ref={input => {
                  passwordRef.current = input;
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
              onClick={onRegistration}
              className="w-full bg-blue-500 text-white inline-flex items-center justify-center py-2 font-semibold rounded-lg hover:bg-blue-600 hoverTransition"
            >
              Next
            </Button>
          </motion.div>
          <div className="flex flex-col items-center justify-center text-[16px] text-slate-500 py-2">
            <Link
              to={'/login'}
              className="hover:text-blue-500 hoverTransition"
            >
              Sing In
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
    </motion.div>
  );
};

export default Registration;
