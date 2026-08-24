
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Database, Settings, LogOut, SettingsIcon, User, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLocalStorageUtils, setLocalStorageUtils } from '@/utils/appUtils';
import { useToast } from "@/hooks/use-toast";
import { USER_TYPE } from '@/utils/constantUtils';



export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    console.log(loggedInUserObj);

    if (!loggedInUserObj) {
      toast({
        title: "You are not allowed to access this page",
        duration: 3000
      });
      navigate("/login");
    }
    else {
      if (loggedInUserObj.user.userType == USER_TYPE.ADMIN) {
        setMenuItems([
          { title: "HomePage", url: "/", icon: Home },
          { title: "Profile", url: "/admin/userProfile", icon: User },
          // { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
          { title: "Services", url: "/admin/services", icon: SettingsIcon },
          { title: "Users", url: "/admin/users", icon: Users },
          { title: "Orders", url: "/admin/orders", icon: Database },
          // { title: "Contact Us", url: "/admin/contact_us", icon: Database },
          // { title: "Settings", url: "/admin/settings", icon: Settings },
        ]);
      }
      else if (loggedInUserObj.user.userType == USER_TYPE.CUSTOMER) {
        setMenuItems([
          { title: "HomePage", url: "/", icon: Home },
          { title: "Profile", url: "/admin/userProfile", icon: User },
          { title: "Orders", url: "/admin/orders", icon: Database },
        ]);
      }
    }
  }, []);



  const handleLogOut = async () => {
    setLocalStorageUtils("loggedInUser", null);
    navigate("/login");
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r bg-white shadow-lg">
      <SidebarHeader className="border-b p-6 " >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
          navigate("/");
        }}>
          <div className=''>
            <img
              src="/logo1.png"
              alt="logo1"
              className=" rounded-full object-cover mr-4"
            />
          </div>
          {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div> */}
          {/* {state !== "collapsed" && (
            <div>
              <h2 className="font-bold text-lg text-gray-900">Solution Documentation</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )} */}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 ">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton
                    asChild
                    className={`rounded-lg transition-all duration-200 ${isActive(item.url)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5" />
                      {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogOut} className="rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              {state !== "collapsed" && <span className="font-medium">Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
