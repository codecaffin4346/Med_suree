
import React from 'react';
import { Calculator, Search, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Calculator className="h-10 w-10 text-medsure-primary" />,
    title: 'Accurate Cost Prediction',
    description: 'Our AI algorithm analyzes multiple factors to provide precise insurance premium estimates tailored to your profile.'
  },
  {
    icon: <Search className="h-10 w-10 text-medsure-primary" />,
    title: 'Scheme Matching',
    description: 'Discover government healthcare schemes you qualify for based on your demographic and health information.'
  },
  {
    icon: <Award className="h-10 w-10 text-medsure-primary" />,
    title: 'Personalized Recommendations',
    description: 'Get customized advice on insurance options and schemes that best suit your specific healthcare needs.'
  },
  {
    icon: <Clock className="h-10 w-10 text-medsure-primary" />,
    title: 'Time-Saving Process',
    description: 'What would take hours of research can be accomplished in minutes with our streamlined platform.'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="medsure-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-medsure-primary mb-4">How Medsure Helps You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform simplifies the complex world of medical insurance and government healthcare schemes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-medsure-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
