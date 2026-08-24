
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { createContext, useEffect, useState } from "react";
import { getLocalStorageUtils, setLocalStorageUtils } from '@/utils/appUtils';


type LoggedInUserContextType = {
  loggedInUser: any;
  handleLoggedInUserChanged: (user: any) => void;
};

export const LoggedInUserContext = createContext<LoggedInUserContextType>({
  loggedInUser: null,
  handleLoggedInUserChanged: () => { },
});

const AdminLayout = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    handleLoggedInUserChanged({});
    // const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    // if (loggedInUserObj) {
    //   handleLoggedInUserChanged(loggedInUserObj.user);
    // }
  }, []);

  const handleLoggedInUserChanged = (userDetail: any) => {
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    if (loggedInUserObj != null) {
      const userInfo = (userDetail && userDetail.user ? userDetail.user : userDetail);
      loggedInUserObj.user = {
        ...loggedInUserObj.user,
        ...userInfo
      };
      setLoggedInUser((prevState: any) => ({
        ...prevState,
        user: {
          ...prevState?.user || {},
          ...loggedInUserObj.user,
          // ...userInfo,
        }
      }));
      setLocalStorageUtils("loggedInUser", loggedInUserObj);
    }
    else {
      setLoggedInUser(null);
    }
    

    //  window.location.reload();
  }


  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, handleLoggedInUserChanged }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </LoggedInUserContext.Provider>
  );
};

export default AdminLayout;
