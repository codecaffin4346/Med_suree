
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-medsure-primary text-white">
      <div className="medsure-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Healthcare Decisions?</h2>
          <p className="text-lg text-white/80 mb-8">
            Start your journey toward clearer insurance costs and better healthcare coverage today. No complicated forms or jargon—just straightforward guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/predict">
              <Button className="bg-white text-medsure-primary hover:bg-white/90 px-6 py-6 text-base">
                Predict My Insurance Cost
              </Button>
            </Link>
            <Link href="/schemes">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 text-base flex items-center gap-2">
                <span>Find Government Schemes</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
