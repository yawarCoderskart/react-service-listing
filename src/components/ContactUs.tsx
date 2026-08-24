
import useApiService from '@/hooks/useApiService';
import { apiList } from '@/utils/apiListUtils';
import React, { useState } from 'react';
import InputField from './ui/general/input2';
import { Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [contactUsInfo, setContactUsInfo] = useState<any>({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });

  const handlePropChange = (key: string, value: any) => {
    setContactUsInfo((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const {
    loading: addContactUsInfoLoading,
    error: addContactUsInfoError,
    fetchData: addContactUsInfoApi,
  } = useApiService("POST");


  const calladdContactUsInfoApi = async () => {
    const apiRes = await addContactUsInfoApi(
      apiList.addContactUsInfo,
      { contactUsInfoObj: contactUsInfo }
    );
    if (apiRes) {
      toast({
        title: "Message sent Successfuly",
        duration: 3000
      });
      setContactUsInfo({
        name: "",
        email: "",
        subject: "",
        msg: "",
      });
    }
  };

  return (
    // <section id="contact" className="py-20 bg-amber-50">
    <section id="contact" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ready to experience our premium services? Contact us today to place an order
            or learn more about Service Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg--600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Our Location</h4>
                  <p className="text-gray-700">123 Highland xyz Road<br />PNG, 94041</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg--600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Phone</h4>
                  <p className="text-gray-700">+xxx xxxx xxxx</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg--600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✉️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Email</h4>
                  <p className="text-gray-700">info@domain.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg--600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">🕒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Available for Call </h4>
                  <p className="text-gray-700">Mon - Sat: 9:00 AM - 5:00 PM<br />Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* <form className="bg-white p-6 rounded-lg shadow-lg"> */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message</h3>

              <div className="space-y-4">
                <div>
                  <InputField
                    name="name"
                    required={true}
                    error={errors["name"]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    icon={User}
                    placeholder="Your full name"
                    type="text"
                    label="Name*"
                    value={contactUsInfo.name}
                    onChange={(e) =>
                      handlePropChange("name", e.target.value)
                    }
                  />

                </div>

                <div>

                  <InputField
                    name="email"
                    required={true}
                    error={errors["email"]}
                    icon={User}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    type="text"
                    label="Email*"
                    value={contactUsInfo.email}
                    onChange={(e) =>
                      handlePropChange("email", e.target.value)
                    }
                  />
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    value={contactUsInfo.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    onChange={(e) =>
                      handlePropChange("email", e.target.value)
                    }
                  /> */}
                </div>

                <div>

                  <InputField
                    name="subject"
                    required={true}
                    error={errors["subject"]}
                    icon={User}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="What is this about?"
                    type="text"
                    label="Subject*"
                    value={contactUsInfo.subject}
                    onChange={(e) =>
                      handlePropChange("subject", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                    value={contactUsInfo.msg}
                    onChange={(e) =>
                      handlePropChange("msg", e.target.value)
                    }
                  ></textarea>
                </div>

                <button
                  onClick={() => {
                    calladdContactUsInfoApi()
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
