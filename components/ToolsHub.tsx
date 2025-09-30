import React from 'react';
import { Page } from '../App';

interface FeatureCardProps {
    icon: React.ReactElement;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    colorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonText, onClick, colorClass }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col text-center items-center h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 ${colorClass}`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-dark-navy">{title}</h3>
        <p className="text-gray-600 mt-3 mb-6 flex-grow">{description}</p>
        <button 
            onClick={onClick}
            className="mt-auto w-full bg-gradient-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {buttonText}
        </button>
    </div>
);

const ToolsHub: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    
    const handleGuidesClick = () => {
        const loanSolutionsSection = document.querySelector('.bg-light-bg');
        if(loanSolutionsSection) {
            loanSolutionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-dark-navy">Your Financial Toolkit</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Empowering you with the right tools and knowledge to make confident financial decisions.
                </p>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        title="Compare Lenders"
                        description="Browse and filter our comprehensive list of over 50 verified loan providers to find the best rates and terms for your needs."
                        buttonText="View Lenders"
                        onClick={() => onNavigate('providers')}
                        colorClass="bg-gradient-to-br from-blue-500 to-sky-400"
                    />
                     <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        title="Explore Loan Guides"
                        description="Learn everything you need to know about personal, mortgage, auto, and student loans with our expert-written guides."
                        buttonText="Read Guides"
                        onClick={handleGuidesClick}
                        colorClass="bg-gradient-to-br from-purple-500 to-indigo-500"
                    />
                    <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                        title="Plan with Calculators"
                        description="From mortgage estimates to retirement planning, use our 20+ free financial calculators to make informed decisions."
                        buttonText="Use Calculators"
                        onClick={() => onNavigate('calculators')}
                        colorClass="bg-gradient-to-br from-green-400 to-cyan-400"
                    />
                    <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        title="Credit Health Center"
                        description="Get a free credit score estimate and personalized AI-powered tips to improve your financial health. No impact on your score."
                        buttonText="Check Credit Health"
                        onClick={() => onNavigate('credit-health')}
                        colorClass="bg-gradient-to-br from-orange-500 to-red-400"
                    />
                </div>
            </div>
        </section>
    );
};

export default ToolsHub;