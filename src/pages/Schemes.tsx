
import React from 'react';
import Layout from '@/components/layout/Layout';
import SchemesFinder from '@/components/schemes/SchemesFinder';

const Schemes = () => {
  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="medsure-container">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-medsure-primary mb-4">Find Government Healthcare Schemes</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover government healthcare schemes you may be eligible for based on your personal information. Our tool will help you navigate the complex world of healthcare assistance programs.
            </p>
          </div>
          
          <SchemesFinder />
        </div>
      </section>
    </Layout>
  );
};

export default Schemes;
