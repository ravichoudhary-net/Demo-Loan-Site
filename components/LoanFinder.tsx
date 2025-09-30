import React, { useState } from 'react';
import { LoanFilters } from '../App';

const FeatureTag: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
    {icon}
    <span>{text}</span>
  </div>
);

const LenderCard: React.FC<{ name: string; rating: number; apr: string; amount: string; time: string; reviews: string; tags: string[]; isFeatured?: boolean; }> = ({ name, rating, apr, amount, time, reviews, tags }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-dark-navy">{name}</h3>
      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-sm font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>{rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="mt-4 space-y-3 text-gray-600">
      <p><strong>APR Range:</strong> <span className="font-semibold text-brand-purple">{apr}</span></p>
      <p><strong>Loan Amount:</strong> {amount}</p>
      <p><strong>Processing Time:</strong> <span className="font-semibold text-green-600">{time}</span></p>
      <p><strong>Reviews:</strong> {reviews}</p>
    </div>
    <div className="mt-4 flex space-x-2">
      {tags.map(tag => (
        <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tag}</span>
      ))}
    </div>
    <div className="mt-6 space-y-3">
      <button className="w-full bg-gradient-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">View Details</button>
      <button className="w-full bg-white text-gray-700 font-bold py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Get Pre-Qualified</button>
    </div>
  </div>
);

const LoanFinder: React.FC<{ onSearch: (filters: LoanFilters) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loanAmount, setLoanAmount] = useState('0');
  const [loanPurpose, setLoanPurpose] = useState('');
  
  const handleCompare = () => {
    onSearch({
      searchQuery,
      loanAmount: parseInt(loanAmount, 10),
      loanPurpose,
    });
  };

  const handleViewAll = () => {
     onSearch({ searchQuery: '', loanAmount: 0, loanPurpose: '' });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-dark-navy">Find Your Perfect Loan Match</h2>
        <p className="mt-4 text-lg text-gray-600">Compare rates from top lenders in seconds. No impact to your credit score.</p>
        <div className="mt-10 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-4 gap-4 items-center">
            <div className="relative md:col-span-1">
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search lenders..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white text-dark-navy placeholder-gray-400 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"/>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <select 
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                className="w-full pl-8 pr-10 py-3 appearance-none bg-white text-dark-navy border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent">
                <option value="0">Loan Amount</option>
                <option value="5000">$5,000</option>
                <option value="10000">$10,000</option>
                <option value="25000">$25,000</option>
                <option value="50000">$50,000</option>
                <option value="100000">$100,000+</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
             <div className="relative">
                <select 
                  value={loanPurpose}
                  onChange={e => setLoanPurpose(e.target.value)}
                  className="w-full px-4 py-3 appearance-none bg-white text-dark-navy border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent">
                  <option value="">Loan Purpose</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Home Improvement">Home Improvement</option>
                  <option value="Auto">Auto Loan</option>
                  <option value="Student">Student Loan</option>
                  <option value="Business">Business Loan</option>
                  <option value="Personal">General Personal Loan</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
            <button 
              onClick={handleCompare}
              className="w-full md:col-span-1 bg-gradient-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              <span>Compare Rates</span>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <FeatureTag icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>} text="No Credit Impact" />
            <FeatureTag icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>} text="60 Second Results" />
            <FeatureTag icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>} text="Bank-Level Security" />
          </div>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <LenderCard name="Wells Fargo" rating={4.1} apr="7.49% - 23.24%" amount="$3,000 - $100,000" time="1-7 Business Days" reviews="25,000" tags={['Competitive rates', 'Fast approval']} />
          <LenderCard name="Bank of America" rating={4.0} apr="6.99% - 19.99%" amount="$3,000 - $100,000" time="1-5 Business Days" reviews="18,500" tags={['Competitive rates', 'Fast approval']} />
          <LenderCard name="JPMorgan Chase" rating={4.2} apr="6.99% - 24.99%" amount="$1,000 - $50,000" time="Same Day" reviews="22,000" tags={['Competitive rates', 'Fast approval']} />
        </div>
        <button 
          onClick={handleViewAll}
          className="mt-12 bg-white text-gray-700 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300 flex items-center mx-auto">
          View All Lenders
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </section>
  );
};

export default LoanFinder;