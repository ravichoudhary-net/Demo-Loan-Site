import React from 'react';
import { Page } from '../App';

const Hero: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-dark-navy leading-tight">
            Find Your Perfect Loan, <span className="text-transparent bg-clip-text bg-gradient-primary">Faster.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            Compare personalized loan offers from top lenders in minutes, without impacting your credit score. Our AI-powered platform makes finding the best rates simple and transparent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onNavigate('providers')}
              className="bg-gradient-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">
              Check My Rates
            </button>
            <button 
              onClick={() => onNavigate('calculators')}
              className="bg-white text-gray-700 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300">
              Calculators
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center md:justify-start space-x-4">
            <div className="flex -space-x-2">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="User"/>
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="User"/>
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="User"/>
            </div>
            <p className="text-sm text-gray-500">
              Join <span className="font-bold text-gray-700">50,000+</span> happy customers
            </p>
          </div>
        </div>
        <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop" alt="Loan comparison dashboard" className="rounded-2xl shadow-2xl"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;