
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useApiService from "@/hooks/useApiService";
import { setLocalStorageUtils } from "@/utils/appUtils";
import { apiList } from '@/utils/apiListUtils';
import { USER_TYPE } from '@/utils/constantUtils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("currentPath", currentPath);

  const {
    loading: isLoading,
    error,
    fetchData: callLogInApi,
  } = useApiService("POST");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedInUser = await callLogInApi(apiList.login, {
      ...formData,
    });
    // if (loggedInUser && currentPath == "/login" && loggedInUser.userType != USER_TYPE.ADMIN) {
    loggedInUser.user.password = null;
    setLocalStorageUtils("loggedInUser", loggedInUser);
    // navigate("/admin/userProfile", { state: { userObj: loggedInUser.user } });
    navigate("/admin/userProfile" );
    // }
    // else if (loggedInUser && currentPath == "/s_adm_login" && loggedInUser.userType == USER_TYPE.ADMIN) {
    //    loggedInUser.user.password = null,
    //   setLocalStorageUtils("loggedInUser", loggedInUser);
    //   navigate("/admin/dashboard");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <ArrowLeft className="h-8 w-8 ml-4 mt-4 cursor-pointer" onClick={() => {
          navigate("/");
        }} />
        <CardHeader className="text-center pb-6 p-0">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600">Sign in to your admin account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@Solution Documentation.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              {isLoading
                ?
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                :
                " Sign In"
              }


            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-red-700">
              {error}
            </p>
            {/* <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
