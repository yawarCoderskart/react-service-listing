
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { string, z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useApiService from "@/hooks/useApiService";
import { getLocalStorageUtils, manageStringConvertionUtils, setLocalStorageUtils } from "@/utils/appUtils";
import { apiList } from '@/utils/apiListUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { LoggedInUserContext } from '@/components/admin/AdminLayout';

const UserProfile = () => {
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loggedInUser, handleLoggedInUserChanged } = useContext(LoggedInUserContext);

  const [userObj, setUserObj] = useState<any>(location.state?.userObj);
  const [isSelfLoggedIn, setIsSelfLoggedIn] = useState<boolean>(true);

  const {
    loading: isLoading,
    error,
    fetchData: editUserApi,
  } = useApiService("POST", true);

  const checkoutSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().nullable().optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters")
  });
  type CheckoutForm = z.infer<typeof checkoutSchema>;
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues:
    {
      'name': userObj?.name,
      'email': userObj?.email,
      'phone': String(userObj?.phone),
      'address': userObj?.address,
    },

  });

  useEffect(() => {
    if (!userObj) {
      setIsSelfLoggedIn(true);
      const loggedInUser = getLocalStorageUtils("loggedInUser");
      if (loggedInUser) {
        let userData = {
          'name': loggedInUser.user.name,
          'email': loggedInUser.user.email,
          'id': loggedInUser.user.id,
          'phone': String(loggedInUser.user.phone),
          'address': loggedInUser.user.address,
        }

        setUserObj(userData);
        form.reset(userData);
      }
      else {
        toast({
          title: "Login to continue",
          duration: 3000
        });
        navigate("/login");
      }
    }
    else {
      setIsSelfLoggedIn(false);
    }
  }, []);


  const onSubmit = async (data: CheckoutForm) => {
    let reqObj: any = {
      'name': data.name,
      'email': data.email,
      'id': (userObj ? userObj.id : null),
      'phone': manageStringConvertionUtils(data.phone),
      'address': data.address,
    }
    if (data.password) {
      reqObj.password = data.password;
    }
    const isUserUpdated = await editUserApi(
      apiList.editUser,
      reqObj
    );
    if (isUserUpdated) {
      toast({
        title: "User updated Successfully",
        duration: 3000
      });
      if (isSelfLoggedIn)
        handleLoggedInUserChanged({
          name: reqObj.name,
          email: reqObj.email,
          phone: reqObj.phone,
          address: reqObj.address
        });

      // const userFromLocalStorage = getLocalStorageUtils("loggedInUser").user;
      // setLocalStorageUtils("loggedInUser",
      //   {
      //     ...userFromLocalStorage,
      //     user: {
      //       ...userFromLocalStorage,
      //       name: reqObj.name,
      //       email: reqObj.email,
      //       phone: reqObj.phone,
      //       address: reqObj.address,
      //     }
      //   }
      // );

      setUserObj(
        {
          ...userObj,
          name: reqObj.name,
          email: reqObj.email,
          phone: reqObj.phone,
          address: reqObj.address,
        }
      );
    }
  };
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <fieldset disabled={userObj != null && userObj.id != null} > */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                // disabled={userObj != null && userObj.id != null}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                // disabled={userObj != null && userObj.id != null}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"

                // disabled={userObj != null && userObj.id != null}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        // onBlur={(e) => {
                        //   checkIsEmailExist(e.target.value);
                        // }}
                        placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                // disabled={userObj != null && userObj.id != null}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password *</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="address"
                // disabled={userObj != null && userObj.id != null}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-1/3  bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
            {/* </fieldset> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
