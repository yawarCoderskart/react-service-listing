import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
export default function UserDropdown({ userInfo, loggedInUser, handleLogout }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
   
    return (
        <div className="relative w-fit">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 hover:bg-gray-100"
            >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                </div>
                {/* <div className="hidden md:block text-left"> */}
                <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">{userInfo.email}</p>
                </div>
                {/* <ChevronDown className="w-4 h-4 hidden md:block text-gray-500" /> */}
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute right-0 mt-[6px] w-40 bg-white border rounded shadow z-10">
                    {loggedInUser ?
                        (
                            <button
                                onClick={() => {
                                    if(currentPath.includes("/admin/")){
                                        navigate("/");
                                    }
                                    else{
                                        navigate("/admin/userProfile");
                                    }
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {currentPath.includes("/admin/") ? "HomePage" : "Admin Panel" }
                            </button>
                        )
                        :
                        ""
                    }

                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
