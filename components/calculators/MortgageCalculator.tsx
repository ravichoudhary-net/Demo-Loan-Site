import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import Chart from './common/Chart';
import SliderInput from './common/SliderInput';

const MortgageCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [homeInsurance, setHomeInsurance] = useState(1200);

  const handleHomePriceChange = (value: number) => {
    setHomePrice(value);
    const newDownPayment = (downPaymentPercent / 100) * value;
    setDownPayment(newDownPayment);
  };

  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    const newPercent = (value / homePrice) * 100;
    setDownPaymentPercent(parseFloat(newPercent.toFixed(1)));
  };

  const handleDownPaymentPercentChange = (value: number) => {
    setDownPaymentPercent(value);
    const newDownPayment = (value / 100) * homePrice;
    setDownPayment(Math.round(newDownPayment));
  };
  
  const loanAmount = homePrice - downPayment;
  
  const { monthlyPayment, pAndI, monthlyTax, monthlyInsurance, totalInterest, totalPrincipal, amortizationData } = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0) {
      return { monthlyPayment: 0, pAndI: 0, monthlyTax: 0, monthlyInsurance: 0, totalInterest: 0, totalPrincipal: 0, amortizationData: [] };
    }
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyTaxVal = propertyTax / 12;
    const monthlyInsuranceVal = homeInsurance / 12;

    const pAndIVal = numberOfPayments > 0 ?
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;
    
    const monthlyPaymentVal = pAndIVal + monthlyTaxVal + monthlyInsuranceVal;

    const totalPayment = pAndIVal * numberOfPayments;
    const totalInterestVal = totalPayment - loanAmount > 0 ? totalPayment - loanAmount : 0;
    
    // Amortization
    let balance = loanAmount;
    const amortization = [];
    for (let i = 0; i < numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = pAndIVal - interestPayment;
        balance -= principalPayment;
        if (i % 12 === 0 || i === numberOfPayments - 1) { // Add point for each year start + end
            amortization.push({ month: i + 1, balance: Math.max(0, balance) });
        }
    }

    return { 
        monthlyPayment: monthlyPaymentVal, 
        pAndI: pAndIVal, 
        monthlyTax: monthlyTaxVal, 
        monthlyInsurance: monthlyInsuranceVal,
        totalInterest: totalInterestVal,
        totalPrincipal: loanAmount,
        amortizationData: amortization,
    };
  }, [loanAmount, loanTerm, interestRate, propertyTax, homeInsurance]);

  const pieChartData = [
    { name: 'Principal & Interest', value: pAndI, color: '#4A80FF' },
    { name: 'Property Tax', value: monthlyTax, color: '#34D399' },
    { name: 'Insurance', value: monthlyInsurance, color: '#FBBF24' },
  ];

  return (
    <CalculatorWrapper
      title="Mortgage Calculator"
      description="Estimate your monthly mortgage payment including taxes, insurance, and other costs. This calculator helps you determine how much house you can afford."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side: Inputs */}
        <div className="bg-green-50/50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Mortgage Details</h3>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1"><span className="text-green-600 mr-2">&#8962;</span>Home Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input type="number" value={homePrice} onChange={(e) => handleHomePriceChange(Number(e.target.value))} className="w-full pl-7 pr-12 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1"><span className="text-green-600 mr-2">$</span>Down Payment</label>
              <div className="flex items-center gap-2">
                <div className="relative w-2/3">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input type="number" value={Math.round(downPayment)} onChange={(e) => handleDownPaymentChange(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                </div>
                <div className="relative w-1/3">
                  <input type="number" value={downPaymentPercent} onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))} className="w-full pl-3 pr-7 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              {/* FIX: Replaced misused SliderInput component with a standard HTML range input to fix missing 'label' prop error. */}
              <input
                type="range"
                min={0}
                max={homePrice}
                step={1000}
                value={downPayment}
                onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-2"><span className="text-green-600 mr-2">&#128197;</span>Loan Term (Years)</label>
              <div className="flex justify-between items-center gap-2 bg-gray-200 p-1 rounded-lg">
                {[15, 20, 30].map(term => (
                    <button key={term} onClick={() => setLoanTerm(term)} className={`w-full py-1.5 rounded-md text-sm font-semibold transition-colors ${loanTerm === term ? 'bg-white shadow text-brand-purple' : 'text-gray-600 hover:bg-white/50'}`}>{term}</button>
                ))}
                <div className="relative">
                   <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-20 pl-3 pr-2 py-1.5 rounded-md border-gray-300 shadow-sm text-sm" />
                </div>
              </div>
            </div>

             <div>
                <SliderInput 
                    label="Interest Rate (%)" 
                    min={2} max={10} step={0.125} 
                    value={interestRate} 
                    onChange={setInterestRate} 
                    valueDisplay={<div className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-lg">{interestRate.toFixed(3)}%</div>}
                />
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-dark-navy mt-6 pt-4 border-t border-gray-200 mb-4 flex items-center">
            Other Costs
            <span className="ml-2 text-gray-400 cursor-pointer" title="Annual property tax and homeowners insurance costs.">&#9432;</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="text-sm font-medium text-gray-700">Annual Property Tax</label>
                   <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                  </div>
              </div>
              <div>
                  <label className="text-sm font-medium text-gray-700">Annual Insurance</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                  </div>
              </div>
          </div>

          <div className="mt-6 bg-green-100 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-green-800">Estimated Monthly Payment</p>
            <p className="text-4xl font-extrabold text-green-900 mt-1">${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Right Side: Analysis */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-dark-navy mb-4">Payment Analysis</h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                    <h4 className="font-bold text-gray-800 mb-3">Payment Breakdown</h4>
                    <Chart type="pie" data={pieChartData} />
                </div>
                <div>
                    <div className="space-y-2 text-sm">
                        {pieChartData.map(item => (
                            <div key={item.name} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                                <span className="font-semibold text-gray-800">${item.value.toFixed(2)}/mo</span>
                            </div>
                        ))}
                         <div className="flex justify-between items-center border-t border-gray-200 pt-2 font-bold">
                             <span className="text-gray-800">Total</span>
                             <span className="text-gray-900">${monthlyPayment.toFixed(2)}/mo</span>
                         </div>
                    </div>
                </div>
             </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
             <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full">
                Loan Amount: ${loanAmount.toLocaleString()}
            </div>
             <h4 className="font-bold text-gray-800 mb-3">Loan Balance Over Time</h4>
             <Chart
                type="area"
                data={amortizationData.map(d => ({ x: d.month, y: d.balance }))}
                config={{
                    xAxis: { label: 'Months', max: loanTerm * 12 },
                    yAxis: { label: 'Balance', max: loanAmount },
                    color: '#34D399'
                }}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg text-center border">
                    <p className="text-xs text-gray-500">Total Principal</p>
                    <p className="font-bold text-lg text-dark-navy">${totalPrincipal.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center border">
                    <p className="text-xs text-gray-500">Total Interest</p>
                    <p className="font-bold text-lg text-dark-navy">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-gradient-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full">
                Get Mortgage Offers
            </button>
            <p className="text-xs text-gray-500 mt-2">Compare real mortgage offers from our lending partners based on your information</p>
          </div>
        </div>
      </div>
       <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About This Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            A mortgage is likely the largest loan you'll ever take on, so it's crucial to understand the costs involved. This calculator helps you estimate your monthly payment, which is more than just paying back the loan amount. It typically includes four main components, often abbreviated as PITI:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Principal:</strong> The amount of money you borrowed from the lender.</li>
            <li><strong>Interest:</strong> The cost of borrowing the money, expressed as a percentage rate.</li>
            <li><strong>Taxes:</strong> Property taxes, which are collected by your lender and paid to your local government.</li>
            <li><strong>Insurance:</strong> Homeowner's insurance to protect your property against damage, and potentially Private Mortgage Insurance (PMI) if your down payment is less than 20%.</li>
          </ul>
          <p>
            Use this tool to experiment with different home prices, down payments, and loan terms to see how they affect your monthly payment and the total interest you'll pay over the life of the loan. This can help you determine a comfortable budget for your new home.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default MortgageCalculator;
