import React from 'react';
import { Page, LoanFilters } from '../App';

interface LoanData {
    title: string;
    description: string;
    icon: React.ReactElement;
    features: string[];
    startingApr: string;
    page: Page;
    isMostPopular: boolean;
    colors: {
        iconBg: string;
        borderBg: string;
    };
}

const loanData: LoanData[] = [
    {
        title: 'Personal Loans',
        description: 'Flexible financing for debt consolidation, home improvements, medical expenses, or any personal goal with competitive rates and fast approval.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>,
        features: ['No collateral', 'Quick funding', 'Fixed rates', 'Flexible terms'],
        startingApr: '5.99%',
        page: 'personal-loan-info',
        isMostPopular: true,
        colors: {
            iconBg: 'bg-blue-500',
            borderBg: 'bg-gradient-to-r from-orange-400 to-yellow-400',
        },
    },
    {
        title: 'Mortgage Loans',
        description: 'Find competitive rates on home purchases, refinancing, and home equity products with expert guidance and personalized service.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        features: ['Low rates', 'Tax benefits', 'Long terms', 'Expert guidance'],
        startingApr: '6.50%',
        page: 'mortgage-loan-info',
        isMostPopular: false,
        colors: {
            iconBg: 'bg-green-500',
            borderBg: 'bg-gradient-to-r from-green-400 to-emerald-400',
        },
    },
    {
        title: 'Auto Loans',
        description: 'Drive away in your dream car with financing for new and used vehicles, featuring competitive rates and flexible terms.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        features: ['New & used', 'Builds credit', 'Quick approval', 'Own your car'],
        startingApr: '4.50%',
        page: 'auto-loan-info',
        isMostPopular: false,
        colors: {
            iconBg: 'bg-purple-500',
            borderBg: 'bg-gradient-to-r from-purple-400 to-pink-400',
        },
    },
    {
        title: 'Business Loans',
        description: 'Fuel your business growth with funding options for entrepreneurs and established companies seeking capital expansion.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
        features: ['Large amounts', 'Growth funding', 'Tax deductible', 'Flexible use'],
        startingApr: '7.00%',
        page: 'business-loan-info',
        isMostPopular: false,
        colors: {
            iconBg: 'bg-orange-500',
            borderBg: 'bg-gradient-to-r from-orange-400 to-red-400',
        },
    },
    {
        title: 'Student Loans',
        description: 'Finance your education with competitive rates and flexible repayment options designed for students and families.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
        features: ['Deferred payments', 'Forgiveness options', 'Low rates', 'Education focus'],
        startingApr: '3.73%',
        page: 'student-loan-info',
        isMostPopular: false,
        colors: {
            iconBg: 'bg-indigo-500',
            borderBg: 'bg-gradient-to-r from-blue-400 to-indigo-400',
        },
    },
    {
        title: 'Home Equity Loans',
        description: 'Access the equity in your home for major expenses, debt consolidation, or home improvements with competitive rates.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        features: ['Use home equity', 'Tax benefits', 'Lower rates', 'Large amounts'],
        startingApr: '8.25%',
        page: 'home-equity-loan-info',
        isMostPopular: false,
        colors: {
            iconBg: 'bg-teal-500',
            borderBg: 'bg-gradient-to-r from-teal-400 to-cyan-400',
        },
    },
];

const LoanCard: React.FC<{ data: LoanData; onNavigate: (page: Page) => void; onSearch: (filters: LoanFilters) => void; }> = ({ data, onNavigate, onSearch }) => {
    const handleExploreClick = () => {
        onSearch({ searchQuery: '', loanAmount: 0, loanPurpose: data.title });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col p-6 pt-0 relative overflow-hidden h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className={`h-1.5 w-full ${data.colors.borderBg} mb-5`}></div>
            
            {data.isMostPopular && (
                <div className="absolute top-4 -left-10 bg-orange-500 text-white text-xs font-bold px-10 py-1.5 transform -rotate-45 shadow-md">
                    Most Popular
                </div>
            )}

            <div className="absolute top-4 right-4 bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-bold px-3 py-1.5 rounded-full border border-green-200/50">
                Starting at <span className="text-green-900">{data.startingApr}</span>
            </div>

            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white ${data.colors.iconBg}`}>
                {data.icon}
            </div>

            <h3 className="text-2xl font-bold text-dark-navy mt-4">{data.title}</h3>
            <p className="text-gray-600 mt-2 text-sm flex-grow">{data.description}</p>
            
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                {data.features.map(feature => (
                    <li key={feature} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center space-x-4">
                <button
                    onClick={handleExploreClick}
                    className="font-bold text-brand-purple hover:underline"
                >
                    Explore Options &rarr;
                </button>
                <button 
                    onClick={() => onNavigate(data.page)}
                    className="text-gray-700 bg-white font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                    Read More
                </button>
            </div>
        </div>
    );
}

const LoanSolutions: React.FC<{onNavigate: (page: Page) => void; onSearch: (filters: LoanFilters) => void;}> = ({ onNavigate, onSearch }) => {
  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="inline-block bg-white text-sm text-gray-600 font-semibold px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">&#10024;</span> Compare rates from multiple lenders with a single application — without affecting your credit score
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanData.map((loan) => (
                <LoanCard key={loan.title} data={loan} onNavigate={onNavigate} onSearch={onSearch} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default LoanSolutions;