import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { email, z } from 'zod';
// import { useSearchParams, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';
import { parseFetaureLsit } from '@/utils/servicesUtils';
import { apiList } from '@/utils/apiListUtils';
import useApiService from '@/hooks/useApiService';
import { getLocalStorageUtils, manageStringConvertionUtils, setLocalStorageUtils } from '@/utils/appUtils';


const checkoutSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  // password: z.string().nullable().optional(),
  password: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  message: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const serviceObj = location.state?.service;
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  // const service = searchParams.get('service');

  const {
    loading: isAddEditOrderLoading,
    error: errorAddEditOrder,
    fetchData: addOrderApi,
  } = useApiService("POST");

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...loggedInUser,
      message: '',
    },
  });

  useEffect(() => {
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    if (loggedInUserObj) {
     
      setLoggedInUser(loggedInUserObj.user);
      form.reset(
        {
          ...loggedInUserObj.user,
          password : ""
        }
      );
    }
  }, []);

  useEffect(() => {
    if (errorAddEditOrder) {
      toast({
        title: errorAddEditOrder,
        description: "Use another email or login.",
        duration: 3000
      });
      form.setValue("email", "");
      // Set an error
      form.setError("email", {
        type: "manual",
        message: errorAddEditOrder,
      });
      form.setFocus("email")
    }
  }, [errorAddEditOrder]);

  // const {
  //   loading: isEmailExistLoading,
  //   error: errorEmailExist,
  //   fetchData: isEmailExist,
  // } = useApiService("POST");


  // const checkIsEmailExist = async (email: string) => {
  //   const userWithExistingEmail = await isEmailExist(
  //     apiList.isEmailExist,
  //     {
  //       email
  //     }
  //   );
  //   if (userWithExistingEmail) {
  //     // Clear the input
  //     form.setValue("email", "");
  //     // Set an error
  //     form.setError("email", {
  //       type: "manual",
  //       message: `User with this email {email} already exists`,
  //     });
  //   }
  // }

  const onSubmit = async (data: CheckoutForm) => {
    const reqObj = {
      userObj: {
        'name': ( loggedInUser && loggedInUser.id ? loggedInUser.name :  data.name),
        'email': ( loggedInUser && loggedInUser.id ? loggedInUser.email :  data.email),
        'password': ( loggedInUser && loggedInUser.id ? undefined : (data.password != "" ? data.password : undefined  ) ),
        'id': (loggedInUser ? loggedInUser.id : null),
        'phone': ( loggedInUser && loggedInUser.id ? manageStringConvertionUtils(loggedInUser.phone) :  manageStringConvertionUtils(data.phone)),
        'address': ( loggedInUser && loggedInUser.id ? loggedInUser.address :  data.address),
        'message': data.message,
      },
      serviceObj:
      {
        'id': serviceObj.id,
        'title': serviceObj.title,
        'price': serviceObj.price,
      }

    }
    const userObj = await addOrderApi(
      apiList.addOrder,
      reqObj
    );
    if (userObj && userObj.iserror != true) {
      toast({
        title: "Service Request Submitted Successfully",
        description: "We'll contact you within 24 hours to discuss your requirements.",
        duration: 3000
      });
      if (userObj.access_token) {
        setLocalStorageUtils("loggedInUser", userObj);
      }
      // setTimeout(() => {
      navigate('/admin/userProfile', { state: { loggedInUser: userObj.user } });
      // }, 2000);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Button>

          <div className="">

            <div
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Settings className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{serviceObj.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{serviceObj.description}</p>

              <ul className="space-y-2 mb-6 text-center">
                {
                  parseFetaureLsit(serviceObj.features).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
              </ul>

              <div className="border-t pt-4 text-left">
                <p className="text-lg font-semibold text-blue-600 mb-3"> Price: ${serviceObj.price}</p>

              </div>
            </div>

            <p className="text-lg text-gray-600 mt-4">
              Fill in your details and we'll get in touch to discuss your requirements
            </p>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* <fieldset disabled={loggedInUser != null && loggedInUser.id != null} > */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={loggedInUser != null && loggedInUser.id != null}
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
                  {!(loggedInUser != null && loggedInUser.id != null) &&
                    <FormField
                      control={form.control}
                      name="password"
                      disabled={loggedInUser != null && loggedInUser.id != null}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>password *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }

                  <FormField
                    control={form.control}
                    name="email"

                    disabled={loggedInUser != null && loggedInUser.id != null}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    disabled={loggedInUser != null && loggedInUser.id != null}
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

                  <FormField
                    control={form.control}
                    name="address"
                    disabled={loggedInUser != null && loggedInUser.id != null}
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

                <FormField
                  control={form.control}
                  name="message"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your specific requirements..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                  <div className="space-y-2 text-blue-800">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>We'll review your request within 24 hours</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Our team will contact you to discuss details</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>We'll provide a custom quote for your project</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-lg py-6"
                  disabled={isAddEditOrderLoading}
                >
                  {isAddEditOrderLoading ? 'Submitting...' : 'Submit Service Request'}
                </Button>
                {/* </fieldset> */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;