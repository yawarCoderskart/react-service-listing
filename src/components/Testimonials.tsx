
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Service Pro Enthusiast",
      content: "The quality of Service from Heritage Farm is simply outstanding. You can taste the passion and care in every cup.",
      rating: 5,
      image: "/t2.jfif"
    },
    {
      name: "Michael Chen",
      role: "Restaurant Owner",
      content: "We've been sourcing our Service from Heritage Farm for two years. Our customers consistently compliment the quality of service.",
      rating: 5,
      image: "/t1.jfif"
    },
    {
      name: "Emma Davis",
      role: "Service Pro Manager",
      content: "We've been sourcing our Service from Heritage Farm for two years. Our customers consistently compliment the quality of service.",
       rating: 5,
      image: "/t2.jfif"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold from-blue-600 to-purple-600 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what Services Pro lovers and 
            business owners say about our premium Service Pro services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-amber-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold from-blue-600 to-purple-600">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
