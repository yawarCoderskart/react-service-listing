
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutUs from '../components/AboutUs';
import OurServices from '../components/OurCoffee';
import FarmTour from '../components/FarmTour';
import Gallery from '../components/Gallery';
import Sustainability from '../components/Sustainability';
import Testimonials from '../components/Testimonials';
import ContactUs from '../components/ContactUs';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSlider />
      <AboutUs />
      <OurServices />
      {/* <FarmTour /> */}
      {/* <Gallery /> */}
      {/* <Sustainability /> */}
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
