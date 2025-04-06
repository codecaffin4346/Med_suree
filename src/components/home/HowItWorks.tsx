
import React from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Enter Your Details',
    description: 'Provide information about your age, health status, and other relevant factors that influence insurance costs.'
  },
  {
    number: '02',
    title: 'Get Instant Predictions',
    description: 'Our AI model analyzes your information to provide accurate cost estimates and eligibility for various schemes.'
  },
  {
    number: '03',
    title: 'Explore Your Options',
    description: 'Review personalized recommendations for insurance plans and government schemes that match your profile.'
  },
  {
    number: '04',
    title: 'Save & Apply',
    description: 'Save your results, compare options, and follow our guided process to apply for your selected schemes.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-medsure-light">
      <div className="medsure-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-medsure-primary mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to demystify your healthcare costs and find the right coverage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="text-5xl font-bold text-medsure-primary/10 mb-4">{step.number}</div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-medsure-primary mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Checkmark for completed steps (just visual) */}
              <div className="absolute top-0 right-4">
                <CheckCircle className="h-6 w-6 text-medsure-primary/20" />
              </div>
              
              {/* Connector line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-medsure-primary/20 -translate-x-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
