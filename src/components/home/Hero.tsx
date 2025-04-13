
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Heart, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="medsure-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-medsure-primary mb-6 leading-tight">
              Understand Your <span className="text-medsure-secondary">Medical Insurance</span> Costs
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Medsure helps you predict insurance costs and find suitable government healthcare schemes using AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/predict">
                <Button className="btn-primary px-6 py-6 text-base flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>old Insurance Cost</span>
                </Button>
              </Link>
              <Link href="/predict2">
                <Button className="btn-primary px-6 py-6 text-base flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>New Predict Insurance Cost</span>
                </Button>
              </Link>
              <Link href="/schemes">
                <Button variant="outline" className="px-6 py-6 text-base border-medsure-primary text-medsure-primary hover:bg-medsure-primary hover:text-white flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Find Government Schemes</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-medsure-primary/10 rounded-full blur-3xl transform -translate-y-1/4"></div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/d99e4b3e-3f66-467d-971a-640a5542d431.png" 
                  alt="Medsure logo" 
                  className="w-64 h-64 md:w-80 md:h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
