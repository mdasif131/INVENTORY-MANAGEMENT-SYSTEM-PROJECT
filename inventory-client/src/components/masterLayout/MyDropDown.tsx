import { LogOut, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getUerInfo, removeSession } from '../../helper/sessionHelper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

const MyDropDown = () => {
  const userInfo = getUerInfo();

  const onLogout = () => {
    removeSession();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all hover:ring-2 hover:ring-purple-300">
          <img
            src={userInfo?.photo}
            alt="profile image"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 sm:w-64 md:w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 animate-in fade-in-0 zoom-in-95"
        align="end"
        sideOffset={5}
      >
        <DropdownMenuLabel>
          <div className="flex flex-col items-center justify-center py-3 px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden rounded-full mb-2">
              <img
                src={userInfo?.photo}
                alt="profile image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h6 className="text-base sm:text-lg font-bold text-gray-900 truncate max-w-full px-2">
              {userInfo?.firstName}
            </h6>
            {userInfo?.email && (
              <p className="text-xs sm:text-sm text-gray-500 truncate max-w-full px-2">
                {userInfo?.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink
              to="/profile"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-500/10 hover:border-l-4 hover:border-purple-500 transition-all cursor-pointer text-gray-700 hover:text-purple-600 focus:outline-none focus:bg-purple-500/10"
            >
              <UserRound size={18} className="shrink-0" />
              <span className="text-sm sm:text-base font-medium">Profile</span>
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-purple-500/10 hover:border-l-4 hover:border-purple-500 transition-all cursor-pointer text-gray-700 hover:text-purple-600 focus:outline-none focus:bg-purple-500/10"
            >
              <LogOut size={18} className="shrink-0" />
              <span className="text-sm sm:text-base font-medium">Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyDropDown;
