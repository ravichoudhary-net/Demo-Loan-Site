import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsHub from './components/ToolsHub';
import HowItWorks from './components/HowItWorks';
import Performance from './components/Performance';
import Testimonials from './components/Testimonials';
import LoanSolutions from './components/LoanSolutions';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import AllProviders from './components/AllProviders';
import CalculatorsHub from './components/calculators/CalculatorsHub';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import AutoLoanCalculator from './components/calculators/AutoLoanCalculator';
import PersonalLoanCalculator from './components/calculators/PersonalLoanCalculator';
import DebtConsolidationCalculator from './components/calculators/DebtConsolidationCalculator';
import LoanRefinanceCalculator from './components/calculators/LoanRefinanceCalculator';
import HomeEquityCalculator from './components/calculators/HomeEquityCalculator';
import StudentLoanCalculator from './components/calculators/StudentLoanCalculator';
import AmortizationCalculator from './components/calculators/AmortizationCalculator';
import APRCalculator from './components/calculators/APRCalculator';
import LTVCalculator from './components/calculators/LTVCalculator';
import DTICalculator from './components/calculators/DTICalculator';
import SimpleInterestCalculator from './components/calculators/SimpleInterestCalculator';
import SavingsGoalCalculator from './components/calculators/SavingsGoalCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import CreditCardPayoffCalculator from './components/calculators/CreditCardPayoffCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import InflationCalculator from './components/calculators/InflationCalculator';
import PaycheckCalculator from './components/calculators/PaycheckCalculator';
import LeaseVsBuyCalculator from './components/calculators/LeaseVsBuyCalculator';
import CostOfLivingCalculator from './components/calculators/CostOfLivingCalculator';
import ProviderComparison from './components/ProviderComparison';
import { Provider } from './components/AllProviders';

import PersonalLoanInfo from './components/info/PersonalLoanInfo';
import MortgageLoanInfo from './components/info/MortgageLoanInfo';
import AutoLoanInfo from './components/info/AutoLoanInfo';
import StudentLoanInfo from './components/info/StudentLoanInfo';
import BusinessLoanInfo from './components/info/BusinessLoanInfo';
import HomeEquityLoanInfo from './components/info/HomeEquityLoanInfo';
import CreditHealthCenter from './components/CreditHealthCenter';

export type Page =
  | 'home'
  | 'providers'
  | 'comparison'
  | 'calculators'
  | 'credit-health'
  | 'mortgage-calculator'
  | 'auto-loan-calculator'
  | 'personal-loan-calculator'
  | 'debt-consolidation-calculator'
  | 'loan-refinance-calculator'
  | 'home-equity-calculator'
  | 'student-loan-calculator'
  | 'amortization-calculator'
  | 'apr-calculator'
  | 'ltv-calculator'
  | 'dti-calculator'
  | 'simple-interest-calculator'
  | 'savings-goal-calculator'
  | 'retirement-calculator'
  | 'credit-card-payoff-calculator'
  | 'investment-calculator'
  | 'inflation-calculator'
  | 'paycheck-calculator'
  | 'lease-vs-buy-calculator'
  | 'cost-of-living-calculator'
  | 'personal-loan-info'
  | 'mortgage-loan-info'
  | 'auto-loan-info'
  | 'student-loan-info'
  | 'business-loan-info'
  | 'home-equity-loan-info';

export interface LoanFilters {
  searchQuery: string;
  loanAmount: number;
  loanPurpose: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [providersToCompare, setProvidersToCompare] = useState<Provider[]>([]);
  const [activeFilters, setActiveFilters] = useState<LoanFilters>({
    searchQuery: '',
    loanAmount: 0,
    loanPurpose: '',
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleSearch = (filters: LoanFilters) => {
    setActiveFilters(filters);
    handleNavigate('providers');
  };

  const handleCompare = (providers: Provider[]) => {
    if (providers.length > 0) {
      setProvidersToCompare(providers);
      handleNavigate('comparison');
    }
  };

  const handleUpdateComparisonList = (providers: Provider[]) => {
    setProvidersToCompare(providers);
    if (providers.length === 0) {
      handleNavigate('providers');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'providers':
        return <AllProviders onCompare={handleCompare} initialFilters={activeFilters} />;
      case 'comparison':
        return <ProviderComparison providers={providersToCompare} onClose={() => handleNavigate('providers')} onUpdateList={handleUpdateComparisonList} />;
      case 'calculators':
        return <CalculatorsHub onNavigate={handleNavigate} />;
      case 'credit-health':
        return <CreditHealthCenter onNavigate={handleNavigate} />;
      case 'mortgage-calculator':
        return <MortgageCalculator onNavigate={handleNavigate} />;
      case 'auto-loan-calculator':
        return <AutoLoanCalculator onNavigate={handleNavigate} />;
      case 'personal-loan-calculator':
        return <PersonalLoanCalculator onNavigate={handleNavigate} />;
      case 'debt-consolidation-calculator':
        return <DebtConsolidationCalculator onNavigate={handleNavigate} />;
      case 'loan-refinance-calculator':
        return <LoanRefinanceCalculator onNavigate={handleNavigate} />;
      case 'home-equity-calculator':
        return <HomeEquityCalculator onNavigate={handleNavigate} />;
      case 'student-loan-calculator':
        return <StudentLoanCalculator onNavigate={handleNavigate} />;
      case 'amortization-calculator':
        return <AmortizationCalculator onNavigate={handleNavigate} />;
      case 'apr-calculator':
        return <APRCalculator onNavigate={handleNavigate} />;
      case 'ltv-calculator':
        return <LTVCalculator onNavigate={handleNavigate} />;
      case 'dti-calculator':
        return <DTICalculator onNavigate={handleNavigate} />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculator onNavigate={handleNavigate} />;
      case 'savings-goal-calculator':
        return <SavingsGoalCalculator onNavigate={handleNavigate} />;
      case 'retirement-calculator':
        return <RetirementCalculator onNavigate={handleNavigate} />;
      case 'credit-card-payoff-calculator':
        return <CreditCardPayoffCalculator onNavigate={handleNavigate} />;
      case 'investment-calculator':
        return <InvestmentCalculator onNavigate={handleNavigate} />;
      case 'inflation-calculator':
        return <InflationCalculator onNavigate={handleNavigate} />;
      case 'paycheck-calculator':
        return <PaycheckCalculator onNavigate={handleNavigate} />;
      case 'lease-vs-buy-calculator':
        return <LeaseVsBuyCalculator onNavigate={handleNavigate} />;
      case 'cost-of-living-calculator':
        return <CostOfLivingCalculator onNavigate={handleNavigate} />;
      case 'personal-loan-info':
        return <PersonalLoanInfo onNavigate={handleNavigate} />;
      case 'mortgage-loan-info':
        return <MortgageLoanInfo onNavigate={handleNavigate} />;
      case 'auto-loan-info':
        return <AutoLoanInfo onNavigate={handleNavigate} />;
      case 'student-loan-info':
        return <StudentLoanInfo onNavigate={handleNavigate} />;
      case 'business-loan-info':
        return <BusinessLoanInfo onNavigate={handleNavigate} />;
      case 'home-equity-loan-info':
        return <HomeEquityLoanInfo onNavigate={handleNavigate} />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <ToolsHub onNavigate={handleNavigate} />
            <LoanSolutions onNavigate={handleNavigate} onSearch={handleSearch} />
            <HowItWorks />
            <Performance />
            <Testimonials />
            <FAQ />
            <CTA />
          </>
        );
    }
  };

  return (
    <div className="bg-white font-sans">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header onNavigate={handleNavigate} />
      </div>
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate}/>
    </div>
  );
};

export default App;