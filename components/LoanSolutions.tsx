import React, { useState } from 'react';
import { Page } from '../App';

type LoanCategory = 'Personal Loans' | 'Mortgage' | 'Auto Loans' | 'Student Loans';

interface LoanSolutionData {
    id: LoanCategory;
    title: string;
    icon: React.ReactElement;
    description: string;
    benefits: string[];
    topProviders: {
        name: string;
        logoBg: string;
        logoContent: string;
        apr: string;
        amount: string;
    }[];
    cta: {
        text: string;
        page: Page;
    };
}

const tabData: LoanSolutionData[] = [
    {
        id: 'Personal Loans',
        title: 'Personal Loans',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        description: "Flexible financing for debt consolidation, home improvements, medical expenses, or any major goal with competitive rates and fast approval.",
        benefits: ["No collateral required", "Fixed interest rates", "Quick funding times", "Flexible repayment terms"],
        topProviders: [
            { name: 'SoFi', logoBg: 'bg-teal-500', logoContent: 'S', apr: '8.99% - 29.49%', amount: '$5k - $100k' },
            { name: 'Upstart', logoBg: 'bg-gray-700', logoContent: 'U', apr: '6.5% - 35.99%', amount: '$1k - $50k' },
            { name: 'Marcus', logoBg: 'bg-blue-900', logoContent: 'M', apr: '6.99% - 19.99%', amount: '$3.5k - $40k' }
        ],
        cta: { text: 'Read More', page: 'personal-loan-info' }
    },
    {
        id: 'Mortgage',
        title: 'Mortgage',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        description: "Find competitive rates on home purchases, refinancing, and home equity products with expert guidance and personalized service.",
        benefits: ["Low interest rates", "Long repayment terms", "Tax deductible interest", "Builds home equity"],
        topProviders: [
            { name: 'Rocket Mortgage', logoBg: 'bg-red-500', logoContent: 'R', apr: '6.5% - 8.5%', amount: '$50k - $3M' },
            { name: 'Better.com', logoBg: 'bg-blue-500', logoContent: 'B', apr: '6.25% - 8.5%', amount: '$100k - $3M' },
            { name: 'loanDepot', logoBg: 'bg-gray-800', logoContent: 'lD', apr: '6.75% - 8.75%', amount: '$75k - $2.5M' }
        ],
        cta: { text: 'Read More', page: 'mortgage-loan-info' }
    },
    {
        id: 'Auto Loans',
        title: 'Auto Loans',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        description: "Drive away in your dream car with financing for new and used vehicles, featuring competitive rates and flexible terms.",
        benefits: ["New & used vehicles", "Quick approval process", "Flexible loan terms", "Builds credit"],
        topProviders: [
            { name: 'Capital One', logoBg: 'bg-blue-300', logoContent: 'C', apr: '4.99% - 19.99%', amount: '$4k - $100k' },
            { name: 'LightStream', logoBg: 'bg-teal-400', logoContent: 'L', apr: '6.24% - 25.49%', amount: '$5k - $100k' },
            { name: 'CarMax', logoBg: 'bg-yellow-500', logoContent: 'C', apr: '6.99% - 25%', amount: '$5k - $100k' }
        ],
        cta: { text: 'Read More', page: 'auto-loan-info' }
    },
    {
        id: 'Student Loans',
        title: 'Student Loans',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
        description: "Finance your education with competitive rates and flexible repayment options designed for students and families.",
        benefits: ["Deferred payments", "Forgiveness options", "Low interest rates", "Education focus"],
        topProviders: [
            { name: 'College Ave', logoBg: 'bg-blue-300', logoContent: 'C', apr: '3.5% - 12.99%', amount: '$1k - $100k' },
            { name: 'Sallie Mae', logoBg: 'bg-blue-300', logoContent: 'S', apr: '4% - 13%', amount: '$1k - $100k' },
            { name: 'Discover', logoBg: 'bg-orange-500', logoContent: 'D', apr: '4% - 14%', amount: '$1k - $100k' }
        ],
        cta: { text: 'Read More', page: 'student-loan-info' }
    }
];

const LoanSolutions: React.FC<{onNavigate: (page: Page) => void}> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<LoanCategory>('Personal Loans');

  const activeTabData = tabData.find(tab => tab.id === activeTab);

  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-dark-navy">Comprehensive Loan Solutions</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Whatever your financial goal, we have a loan solution to help you achieve it.
        </p>
        
        {/* Tab Buttons */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tabData.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as LoanCategory)}
                    className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                        activeTab === tab.id
                            ? 'bg-gradient-primary text-white shadow-xl'
                            : 'bg-white text-dark-navy shadow-lg border border-gray-100 hover:shadow-xl'
                    }`}
                >
                    <div className={`p-3 rounded-lg inline-block ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-brand-purple'}`}>
                        {tab.icon}
                    </div>
                    <h3 className="text-xl font-bold mt-4">{tab.title}</h3>
                </button>
            ))}
        </div>

        {/* Content Panel */}
        {activeTabData && (
            <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-left">
                <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-dark-navy">{activeTabData.title}</h3>
                        <p className="mt-2 text-gray-600">{activeTabData.description}</p>
                        <h4 className="mt-6 font-semibold text-dark-navy mb-2">Key Benefits:</h4>
                        <ul className="space-y-2">
                           {activeTabData.benefits.map(benefit => (
                                <li key={benefit} className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    <span>{benefit}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-3 lg:border-l lg:pl-8 border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-dark-navy mb-3">Top Providers</h4>
                                <div className="space-y-3">
                                    {activeTabData.topProviders.map(provider => (
                                        <div key={provider.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${provider.logoBg} flex items-center justify-center text-white font-bold`}>{provider.logoContent}</div>
                                            <div>
                                                <p className="font-bold text-dark-navy text-sm">{provider.name}</p>
                                                <p className="text-xs text-gray-500">APR: {provider.apr}</p>
                                                <p className="text-xs text-gray-500">Amount: {provider.amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <button
                                    onClick={() => onNavigate('providers')}
                                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 group">
                                    <p className="font-semibold text-sm text-brand-purple group-hover:underline">View More Loan Providers &rarr;</p>
                                </button>
                                <button
                                    onClick={() => onNavigate(activeTabData.cta.page)}
                                    className="mt-6 w-full bg-gradient-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    {activeTabData.cta.text}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default LoanSolutions;