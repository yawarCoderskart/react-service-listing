
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { scrollToDivUtil } from '@/utils/appUtils';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Professional Services That Deliver Results",
      subtitle: "Transform Your Business with Expert Solutions",
      description: "We provide comprehensive professional services designed to elevate your business to new heights. From consulting to implementation, we're your trusted partner.",
      image: "/sli1.jfif",
      cta: "Explore Services",
      divId: "services"
    },
    {
      id: 2,
      title: "Innovation Meets Excellence",
      subtitle: "Cutting-Edge Solutions for Modern Challenges",
      description: "Our team of experts leverages the latest technologies and methodologies to solve complex business challenges and drive sustainable growth.",
      image: "/sli2.jfif",
      cta: "Explore Services",
      divId: "services"
    },
    {
      id: 3,
      title: "Your Success is Our Mission",
      subtitle: "Personalized Approach, Outstanding Results",
      description: "We believe in building lasting partnerships. Our customized solutions are tailored to your unique needs and goals.",
      image: "/sli3.jfif",
      cta: "Contact Us",
      divId: "contact"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            } ${index < currentSlide ? '-translate-x-full' : ''}`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-3xl">
                  {/* <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm ml-2">Trusted by 500+ clients</span>
                  </div> */}

                  <h2 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => scrollToDivUtil(slide.divId, 0)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                      {slide.cta}
                    </button>
                    {/* <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Demo
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
