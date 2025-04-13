
import React from 'react';
// import Layout from '@/components/layout/Layout';
import PredictionForm from '@/components/PredictionForm';

const Predict = () => {
  return (
      <section className="py-12 bg-gray-50">
        <div className="medsure-container">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-medsure-primary mb-4">Insurance Cost Prediction</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tool analyzes your information to provide personalized insurance cost estimates. All predictions are based on data patterns and analytics.
            </p>
          </div>
          
          <PredictionForm />
        </div>
      </section>
  );
};

export default Predict;
