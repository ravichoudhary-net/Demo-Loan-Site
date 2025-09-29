
import React from 'react';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const StatPill: React.FC<{ icon: React.ReactElement; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm text-center">
    <div className="flex justify-center text-white mb-2">{icon}</div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-white/80">{label}</p>
  </div>
);

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const SecurityFeature: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
    <div className="flex items-center space-x-2 text-white/80">
        {icon}
        <span>{text}</span>
    </div>
);


const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold">Ready to Find Your Perfect Loan?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">
          Compare top lenders, check personalized rates, and choose the right option for you — all in one place.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-white/90 text-brand-purple font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white transition-colors transform hover:-translate-y-0.5">
            Compare Loan Providers
          </button>
          <button className="bg-transparent border-2 border-white/80 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
            Learn How It Works →
          </button>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatPill 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
            value="300+"
            label="Verified Lenders"
          />
          <StatPill 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            value="$2B+"
            label="Loans Funded"
          />
          <StatPill 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
            value="4.8/5"
            label="User Rating"
          />
          <StatPill 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.915 2.002L11 7m0 3h2m5-3h-5M7 15h5.5" /></svg>}
            value="100K+"
            label="Happy Customers"
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <SecurityFeature icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>} text="Bank-Level Security" />
            <SecurityFeature icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>} text="No Credit Impact" />
            <SecurityFeature icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>} text="Instant Matching" />
        </div>
      </div>
    </section>
  );
};

export default CTA;