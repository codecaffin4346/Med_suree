
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const testimonials = [
  {
    quote: "Medsure helped me find an insurance plan that saved me over $2,000 annually compared to what I was paying before.",
    name: "Sarah Johnson",
    title: "Teacher, 42"
  },
  {
    quote: "I had no idea I qualified for a government healthcare scheme until Medsure's recommendation system pointed me in the right direction.",
    name: "Michael Chen",
    title: "Freelancer, 35"
  },
  {
    quote: "As a senior citizen on a fixed income, knowing my exact insurance costs in advance has been incredibly helpful for budgeting.",
    name: "Eleanor Davis",
    title: "Retiree, 68"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="medsure-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-medsure-primary mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands who have already benefited from Medsure's insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover bg-gradient-to-br from-white to-medsure-light/30 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-medsure-primary p-2">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-center italic">"{testimonial.quote}"</p>
                <div className="text-center">
                  <p className="font-semibold text-medsure-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
