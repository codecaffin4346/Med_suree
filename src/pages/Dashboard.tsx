
import React from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="medsure-container">
          <Dashboard />
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
