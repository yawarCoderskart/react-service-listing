
import React, { useEffect, useState } from 'react';
import { Monitor, Database, Settings, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useApiService from '@/hooks/useApiService';
import { apiList } from '@/utils/apiListUtils';
import { truncateText } from '@/utils/appUtils';
import { parseFetaureLsit } from '@/utils/servicesUtils';

const OurServices = () => {
  const navigate = useNavigate();
  const [ServiceList, setServiceList] = useState<any[]>([]);

  useEffect(() => {
    callgetServicesApi("", 1); // 1 = reset to first page
  }, []);
  const {
    loading: isGetServiceListLoading,
    error: errorGetServiceList,
    fetchData: getServicesApi,
  } = useApiService("POST");

  const callgetServicesApi = async (searchQuery, pageNumber) => {
    const servilsitData = await getServicesApi(
      apiList.getServices,
      {
        "sortingColumn": "id",
        "sortingOrder": "DESC"
      }
    );
    setServiceList(servilsitData.serviceList);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-blue-600 font-semibold text-lg mb-2">Our Services</h3>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Solutions for Every Business Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of services designed to help your business thrive in today's competitive landscape.
          </p>
        </div>
        {ServiceList.length == 0
          ?
          (
            <div className='mt-4 text-gray-600 text-center'>
              No data found
            </div>
          )
          :
          ""

        }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ServiceList.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{truncateText(service.description, 200)}</p>

              <ul className="space-y-2 mb-6">
                {

                  parseFetaureLsit(service.features).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
              </ul>

              <div className="border-t pt-4">
                <p className="text-lg font-semibold text-blue-600 mb-3">Price: ${service.price}</p>
                <button
                  // onClick={() => navigate(`/checkout?service=${encodeURIComponent(service)}`)}
                  onClick={() => navigate('/checkout', { state: { service } })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Place order
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* Additional Services Section */}
        {/* <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Something Different?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We understand that every business is unique. If you don't see exactly what you're looking for,
              let's discuss how we can create a custom solution tailored to your specific needs.
            </p>
            <button
              onClick={() => navigate('/checkout?service=Custom Solution')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Get Custom Quote
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default OurServices;