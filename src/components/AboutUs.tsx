
import React from 'react';
import { CheckCircle, Users, Award, Target } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Our skilled professionals bring years of industry experience"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of successful projects and satisfied clients"
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "We focus on achieving your business objectives efficiently"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-blue-600 font-semibold text-lg mb-2">About Solution Documentation</h3>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Businesses Through Professional Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over a decade of experience in the industry, we've established ourselves as a trusted partner for businesses seeking comprehensive professional services. Our commitment to excellence and innovation drives everything we do.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that every business has unique challenges and opportunities. That's why we take a personalized approach to each project, ensuring that our solutions align perfectly with your goals and vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Expert Team Members</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop"
                alt="Professional team meeting"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full -z-10"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", description: "We conduct business with honesty and transparency" },
              { title: "Innovation", description: "We embrace new technologies and creative solutions" },
              { title: "Excellence", description: "We strive for perfection in every project" },
              { title: "Partnership", description: "We build lasting relationships with our clients" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
