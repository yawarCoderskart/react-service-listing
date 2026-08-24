
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className=''>
                <img
                  src="/logo3.png"
                  alt="logo1"
                  className=" object-cover mr-4 h-[62px]"
                />
              </div>
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div> */}
              {/* <h3 className="text-xl font-bold">Solution Documentation</h3> */}
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering businesses through innovative professional services and cutting-edge solutions. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Our Services</a></li>
              {/* <li><a href="#gallery" className="hover:text-blue-400 transition-colors">Portfolio</a></li> */}
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service 1</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service 2</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service 3</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service 4</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service 5</a></li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">123 Business Ave, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+xxx xxxx xxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">info@domain.com</span>
              </div>
            </div>

            {/* <div className="mt-6">
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-gray-300 text-sm mb-3">Subscribe for updates and exclusive offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-4 py-2 rounded-r-lg transition-opacity">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Develop by yawar.coderskart@gmail.com. All rights reserved. Crafted with ❤️ for professional excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
