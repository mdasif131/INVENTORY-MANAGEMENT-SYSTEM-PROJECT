import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  ErrorToast,
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
  SuccessToast,
} from '../../helper/formHelper';
import { useNavigate } from 'react-router-dom';
import { GetProfileDetails, ProfileUpdateRequest } from '../../APIRequest/UsersAPIRequest';

const Profile = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userImgView = useRef<HTMLImageElement>(null);
  const userImgRef = useRef<HTMLInputElement>(null);
  const hasFetched = useRef(false);

  const profileList = useSelector((state: RootState) => state.profile.value);
  const profileData = profileList;

  const handleImageUpload = async (): Promise<void> => {
    const ImgFile = userImgRef.current?.files?.[0];
    if (!ImgFile) return;

    // Validate file type
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg+xml',
    ];
    if (!validTypes.includes(ImgFile.type)) {
      ErrorToast('Please select a valid image file (JPG, PNG, SVG)');
      return;
    }

    // Validate file size (max 4MB)
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (ImgFile.size > maxSize) {
      ErrorToast('Image size must be less than 4MB');
      return;
    }
    try {
      const base64Img = await getBase64(ImgFile);
      if (userImgView.current) {
        userImgView.current.src = base64Img;
        SuccessToast('Successfully Upload File');
      }
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(error.message);
      } else {
        ErrorToast('Failed to upload image');
      }
    }
  };

  const updateMyProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const firstName = firstNameRef.current?.value || '';
    const lastName = lastNameRef.current?.value || '';
    const mobile = mobileRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const photo = userImgView.current?.src || '';

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
      const result = await ProfileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      );
      if (result) {
        navigate('/');
      }
    }
  };
  useEffect(() => {
    if (hasFetched.current) return; // solve multiple re-render
    hasFetched.current = true;
    GetProfileDetails();
  }, []);
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto bg-white px-8 py-10 rounded-xl shadow-2xl relative">
       <button onClick={()=> navigate('/')} className='absolute right-5 top-4 text-red-400 cursor-pointer'><X  size={25}/></button>
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <img
            ref={input => {
              userImgView.current = input;
            }}
            src={profileData?.photo}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <hr className="w-full mt-6 border-slate-300" />
        </div>

        {/* Form */}
        <form
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {/* Profile Picture */}
          <div className="flex flex-col">
            <label htmlFor="picture" className="text-lg font-semibold mb-2">
              Profile Picture
            </label>
            <label
              htmlFor="picture"
              className="border rounded-md py-2 px-4 text-center cursor-pointer hover:ring hover:ring-purple-500"
            >
              Upload Image
            </label>
            <input
              key={Date.now()}
              ref={input => {
                userImgRef.current = input;
              }}
              onChange={handleImageUpload}
              id="picture"
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              className="hidden"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Email Address</label>
            <Input
              key={Date.now()}
              readOnly
              ref={input => {
                emailRef.current = input;
              }}
              id="email"
              type="email"
              defaultValue={profileData?.email}
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">First Name</label>
            <Input
              key={Date.now()}
              id="name"
              type="text"
              defaultValue={profileData?.firstName}
              ref={input => {
                firstNameRef.current = input;
              }}
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Last Name</label>
            <Input
              key={Date.now()}
              id="lastName"
              type="text"
              defaultValue={profileData?.lastName}
              ref={input => {
                lastNameRef.current = input;
              }}
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Mobile</label>
            <Input
              id="mobile"
              ref={input => {
                mobileRef.current = input;
              }}
              type="text"
              defaultValue={profileData?.mobile}
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Password</label>
            <Input
              key={Date.now()}
              id="password"
              ref={input => {
                passwordRef.current = input;
              }}
              type="password"
              defaultValue={profileData?.password}
              placeholder="••••••••"
              className="focus-visible:ring-purple-500"
            />
          </div>

          {/* Update Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center pt-4">
            <Button
              onClick={updateMyProfile}
              size="lg"
              variant="secondary"
              className="w-full max-w-md"
            >
              UPDATE
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
