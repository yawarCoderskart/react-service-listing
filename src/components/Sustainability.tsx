
import React from 'react';

const Sustainability = () => {
  const practices = [
    {
      icon: "🌱",
      title: "Organic Farming",
      description: "100% organic cultivation without harmful pesticides or chemicals"
    },
    {
      icon: "💧",
      title: "Water Conservation",
      description: "Advanced irrigation systems that minimize water waste"
    },
    {
      icon: "🦋",
      title: "Biodiversity",
      description: "Protecting local wildlife and maintaining ecological balance"
    },
    {
      icon: "♻️",
      title: "Zero Waste",
      description: "Composting coffee pulp and recycling all farm materials"
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Sustainability Commitment</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're dedicated to sustainable farming practices that protect our environment 
            and ensure the highest quality coffee for generations to come.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {practices.map((practice, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{practice.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-3">{practice.title}</h3>
              <p className="text-gray-600">{practice.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Our Environmental Impact</h3>
              <p className="text-gray-700 mb-6">
                Through our sustainable practices, we've reduced our carbon footprint by 40% 
                over the past five years while increasing coffee quality and yield.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Carbon Reduction</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-green-600 font-semibold">40%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Water Conservation</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-blue-600 font-semibold">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Biodiversity Increase</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-amber-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-amber-600 font-semibold">35%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop"
                alt="Sustainable coffee farming"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
