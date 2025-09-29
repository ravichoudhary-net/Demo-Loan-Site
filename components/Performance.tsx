
import React from 'react';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ icon: React.ReactElement; value: string; title: string; description: string; barColor: string; }> = ({ icon, value, title, description, barColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <p className="text-4xl font-extrabold text-dark-navy">{value}</p>
    <h3 className="text-lg font-bold text-dark-navy mt-1">{title}</h3>
    <p className="text-gray-600 text-sm mt-1">{description}</p>
    <div className="w-24 h-1.5 bg-gray-200 rounded-full mx-auto mt-4">
      <div className={`h-full rounded-full ${barColor}`} style={{width: '60%'}}></div>
    </div>
  </div>
);

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const FeatureChip: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
    {icon}
    <span className="font-semibold text-gray-700">{text}</span>
  </div>
);

const Performance: React.FC = () => {
  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 mb-4">
          <span className="text-sm font-semibold text-brand-purple">AI-Powered Analytics</span>
        </div>
        <h2 className="text-4xl font-extrabold text-dark-navy">
          Performance That Speaks <br />
          <span className="text-transparent bg-clip-text bg-gradient-secondary">For Itself</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Our advanced machine learning algorithms deliver exceptional results through intelligent data processing and real-time market analysis.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            icon={<div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>}
            value="50,000+"
            title="Active Users"
            description="AI-Powered Matching"
            barColor="bg-purple-500"
          />
          <StatCard 
            icon={<div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>}
            value="$2.5B+"
            title="Loans Processed"
            description="Smart Analytics Engine"
            barColor="bg-blue-500"
          />
          <StatCard 
            icon={<div className="p-4 bg-gradient-to-br from-green-500 to-teal-400 rounded-2xl text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>}
            value="99.9%"
            title="Security Rate"
            description="Enterprise-Grade Protection"
            barColor="bg-green-500"
          />
          <StatCard 
            icon={<div className="p-4 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4M6 20v-2m0 2a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4" /></svg></div>}
            value="3 Min"
            title="Avg. Processing"
            description="Neural Network Speed"
            barColor="bg-red-500"
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
            <FeatureChip icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944a11.954 11.954 0 007.834 3.055A12.002 12.002 0 0110 18a12.002 12.002 0 01-7.834-13.001zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg>} text="SOC 2 Certified"/>
            <FeatureChip icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>} text="256-bit Encryption"/>
            <FeatureChip icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>} text="98% Accuracy Rate"/>
            <FeatureChip icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>} text="Real-time Processing"/>
        </div>
      </div>
    </section>
  );
};

export default Performance;