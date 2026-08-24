
import React from 'react';

const FarmTour = () => {
  const tourSteps = [
    {
      step: "01",
      title: "Planting & Growing",
      description: "Our coffee plants are carefully cultivated in the perfect climate conditions at high altitude.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
    },
    {
      step: "02",
      title: "Harvesting",
      description: "Hand-picked at peak ripeness to ensure only the finest cherries make it to processing.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
    },
    {
      step: "03",
      title: "Processing",
      description: "Traditional wet processing methods preserve the beans' natural flavors and characteristics.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
    },
    {
      step: "04",
      title: "Roasting",
      description: "Master roasters bring out the unique flavor profile of each bean variety.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">From Farm to Cup</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Follow the journey of our coffee beans through every stage of production, 
            from planting to the perfect cup.
          </p>
        </div>
        
        <div className="space-y-16">
          {tourSteps.map((step, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              <div className="lg:w-1/2">
                <img 
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="text-6xl font-bold text-amber-200 mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmTour;
