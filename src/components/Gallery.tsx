
import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    {
      src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
      alt: "Coffee beans drying in the sun",
      category: "Processing"
    },
    {
      src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
      alt: "Lush coffee plantation",
      category: "Farm"
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      alt: "Fresh coffee cup",
      category: "Product"
    },
    {
      src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
      alt: "Coffee harvest",
      category: "Harvest"
    },
    {
      src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
      alt: "Mountain coffee farm",
      category: "Farm"
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      alt: "Coffee roasting",
      category: "Processing"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Gallery</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the beauty of our coffee farm through these captivating images 
            that showcase our passion and dedication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-sm bg-amber-600 px-3 py-1 rounded-full mb-2">
                    {image.category}
                  </div>
                  <div className="text-lg font-semibold">{image.alt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
