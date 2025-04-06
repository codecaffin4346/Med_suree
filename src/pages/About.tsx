
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Check } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="medsure-container">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-medsure-primary mb-4">About Medsure</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our mission is to make healthcare more accessible by simplifying insurance costs and government scheme information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-medsure-primary mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Medsure was founded with a simple mission: to make healthcare more affordable and accessible for everyone. We recognized that understanding insurance costs and finding appropriate government healthcare schemes is unnecessarily complicated.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of healthcare policy experts, data scientists, and software engineers came together to build a platform that leverages AI to simplify these complex decisions.
              </p>
              <p className="text-gray-600">
                Today, Medsure helps thousands of people make informed healthcare decisions, save money on insurance, and find government assistance programs they qualify for but might otherwise have missed.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Card className="w-full max-w-md bg-white shadow-xl border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-medsure-light aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 bg-medsure-primary/10 flex items-center justify-center">
                      <Shield className="h-32 w-32 text-medsure-primary opacity-20" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                      <div className="relative mb-6">
                        <Shield className="h-16 w-16 text-medsure-primary" />
                        <Heart className="h-8 w-8 text-medsure-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <h3 className="text-2xl font-bold text-medsure-primary mb-2">Our Values</h3>
                      <p className="text-gray-600">
                        Transparency, Accessibility, and Empowerment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-medsure-primary mb-6 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md border-none">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-medsure-light rounded-full p-3">
                      <Shield className="h-8 w-8 text-medsure-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-medsure-primary mb-2 text-center">AI-Powered Insights</h3>
                  <p className="text-gray-600 text-center">
                    Our machine learning algorithms analyze vast amounts of healthcare data to provide accurate cost predictions and scheme matching.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md border-none">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-medsure-light rounded-full p-3">
                      <Heart className="h-8 w-8 text-medsure-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-medsure-primary mb-2 text-center">User-Centered Design</h3>
                  <p className="text-gray-600 text-center">
                    We've designed our platform with simplicity in mind, ensuring users of all technical abilities can navigate it with ease.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md border-none">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-medsure-light rounded-full p-3">
                      <Check className="h-8 w-8 text-medsure-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-medsure-primary mb-2 text-center">Comprehensive Coverage</h3>
                  <p className="text-gray-600 text-center">
                    We maintain an up-to-date database of both private insurance factors and government healthcare schemes across all states.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-medsure-light rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-medsure-primary mb-6 text-center">Our Commitment to Privacy</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              We understand that health and financial information is sensitive. Medsure is built with privacy at its core, ensuring your data is secure, never sold to third parties, and only used to provide you with the services you request.
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-medsure-primary mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Have questions or feedback about Medsure? We'd love to hear from you!
            </p>
            <p className="text-gray-600">
              Email: <a href="mailto:contact@medsure.com" className="text-medsure-primary hover:underline">contact@medsure.com</a>
            </p>
            <p className="text-gray-600">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
