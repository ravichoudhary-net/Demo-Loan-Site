import React from 'react';

const StepCard: React.FC<{ number: number; title: string; description: string; color: string; }> = ({ number, title, description, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg ${color}`}>
      {number}
    </div>
    <h3 className="text-xl font-bold text-dark-navy mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Simple Process
        </div>
        <h2 className="text-4xl font-extrabold text-dark-navy">How Our Site Works</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Finding your perfect loan match is easy with our simple process
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8 items-center relative">
            <StepCard number={1} title="Compare Providers" description="Browse our curated list of top-rated loan providers. Filter by loan type, amount, and term length to find options that match your needs." color="bg-gradient-to-br from-purple-500 to-indigo-500" />
            <div className="hidden md:block absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 text-brand-blue">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
             <StepCard number={2} title="Check Your Rate" description="Select a provider and check your personalized rate. This pre-qualification process won't affect your credit score." color="bg-gradient-to-br from-green-400 to-cyan-400" />
            <div className="hidden md:block absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 text-brand-blue">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
             <StepCard number={3} title="Get Your Loan" description="Complete your application with your chosen provider and receive your funds quickly, often as soon as the next business day." color="bg-gradient-to-br from-blue-500 to-sky-400" />
        </div>
        <button className="mt-12 bg-gradient-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">
          Start Comparing Now
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;