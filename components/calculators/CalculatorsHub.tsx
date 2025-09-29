import React from 'react';
import { Page } from '../../App';

const CalculatorCard: React.FC<{ title: string, description: string, onClick: () => void }> = ({ title, description, onClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
        <h3 className="text-xl font-bold text-dark-navy">{title}</h3>
        <p className="mt-2 text-gray-600 flex-grow">{description}</p>
        <button onClick={onClick} className="mt-4 text-brand-purple font-semibold text-left">Use Calculator &rarr;</button>
    </div>
);

const CalculatorsHub: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
    const calculators: { title: string, description: string, page: Page }[] = [
        { title: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payments.', page: 'mortgage-calculator' },
        { title: 'Auto Loan Calculator', description: 'Calculate car loan payments.', page: 'auto-loan-calculator' },
        { title: 'Personal Loan Calculator', description: 'Estimate payments for a personal loan.', page: 'personal-loan-calculator' },
        { title: 'Investment Calculator', description: 'Project the future value of your investments.', page: 'investment-calculator' },
        { title: 'Retirement Calculator', description: 'See if you are on track for retirement.', page: 'retirement-calculator' },
        { title: 'Debt Consolidation Calculator', description: 'See how much you could save.', page: 'debt-consolidation-calculator' },
        { title: 'Loan Refinance Calculator', description: 'Find out if refinancing is right for you.', page: 'loan-refinance-calculator' },
        { title: 'Credit Card Payoff Calculator', description: 'Find the fastest way to pay off card debt.', page: 'credit-card-payoff-calculator' },
        { title: 'Savings Goal Calculator', description: 'Plan how to reach your savings target.', page: 'savings-goal-calculator' },
        { title: 'Amortization Calculator', description: 'See a loan amortization schedule.', page: 'amortization-calculator' },
        { title: 'Paycheck Calculator', description: 'Estimate your take-home pay after taxes.', page: 'paycheck-calculator' },
        { title: 'Lease vs. Buy Calculator', description: 'Compare the costs of leasing vs. buying a car.', page: 'lease-vs-buy-calculator' },
        { title: 'Home Equity Calculator', description: 'Estimate your available home equity.', page: 'home-equity-calculator' },
        { title: 'Student Loan Calculator', description: 'Calculate student loan payments.', page: 'student-loan-calculator' },
        { title: 'Inflation Calculator', description: 'See how inflation affects purchasing power.', page: 'inflation-calculator' },
        { title: 'Cost of Living Calculator', description: 'Compare living costs between cities.', page: 'cost-of-living-calculator' },
        { title: 'APR Calculator', description: 'Calculate the Annual Percentage Rate.', page: 'apr-calculator' },
        { title: 'LTV Calculator', description: 'Calculate Loan-to-Value ratio.', page: 'ltv-calculator' },
        { title: 'DTI Calculator', description: 'Calculate Debt-to-Income ratio.', page: 'dti-calculator' },
        { title: 'Simple Interest Calculator', description: 'Calculate simple interest on a loan.', page: 'simple-interest-calculator' },
    ];

    return (
        <section className="py-20 bg-light-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-dark-navy">Financial Calculators</h1>
                    <p className="mt-4 text-lg text-gray-600">Empower your financial decisions with our suite of easy-to-use calculators.</p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {calculators.map(calc => 
                      <CalculatorCard 
                        key={calc.title} 
                        title={calc.title} 
                        description={calc.description} 
                        onClick={() => onNavigate(calc.page)} 
                      />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CalculatorsHub;
