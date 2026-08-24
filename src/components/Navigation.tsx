
import React, { useEffect, useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLocalStorageUtils, setLocalStorageUtils } from '@/utils/appUtils';
import UserDropdown from './ui/UserDropdown';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    // { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ];

  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    if (loggedInUserObj) {
      setLoggedInUser(loggedInUserObj.user);
    }
  }, []);

  const handleLogout = () => {
    setLocalStorageUtils("loggedInUser", null);
    setLoggedInUser(null);
    navigate("/");
  };


  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className=''>
            <img
              src="/logo1.png"
              alt="logo1"
              className=" object-cover mr-4 h-[62px]"
            />
          </div>
          {/* <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Solution Documentation
              </h1>
            </div> 
        </div>*/}

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}

              {loggedInUser ?
                <UserDropdown
                  userInfo={{ name: loggedInUser.name, email: loggedInUser.email }}
                  loggedInUser={loggedInUser}
                  handleLogout={handleLogout}
                />

                :
                (
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Login
                  </Link>
                )
              }

            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {
        isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className='ml-[30%]'>
                {loggedInUser ?

                  <UserDropdown
                    userInfo={{ name: loggedInUser.name, email: loggedInUser.email }}
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                  />

                  :
                  (
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Login
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navigation;
