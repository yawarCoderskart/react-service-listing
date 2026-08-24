
import React, { useContext, useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getLocalStorageUtils, setLocalStorageUtils } from '@/utils/appUtils';
import UserDropdown from '../ui/UserDropdown';
import { useNavigate } from 'react-router-dom';
import { LoggedInUserContext } from './AdminLayout';

export function AdminHeader() {
  const { loggedInUser, handleLoggedInUserChanged } = useContext(LoggedInUserContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const loggedInUserObj = getLocalStorageUtils("loggedInUser");
  //   if (loggedInUserObj) {
  //     handleLoggedInUserChanged(loggedInUserObj.user);
  //   }
  // }, []);

  const handleLogout = () => {
    setLocalStorageUtils("loggedInUser", null);
    handleLoggedInUserChanged(null);
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          {/* <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button> */}


          <UserDropdown
            userInfo={{ name: loggedInUser?.user?.name, email: loggedInUser?.user?.email }}
            loggedInUser={loggedInUser}
            handleLogout={handleLogout}
          />
          {/* <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{loggedInUser.name}</p>
              <p className="text-xs text-gray-500">{loggedInUser.email}</p>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
