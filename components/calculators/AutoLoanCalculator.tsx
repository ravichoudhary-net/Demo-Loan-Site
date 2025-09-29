import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import Chart from './common/Chart';
import SliderInput from './common/SliderInput';

const AutoLoanCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(6000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(4.5);
  const [salesTaxRate, setSalesTaxRate] = useState(7);
  const [tradeInValue, setTradeInValue] = useState(0);

  const {
    monthlyPayment,
    totalCost,
    totalLoanAmount,
    totalInterest,
    amortizationData,
    principal,
    interestComponent,
    downPaymentComponent,
    tradeInComponent,
  } = useMemo(() => {
    const taxAmount = (vehiclePrice - tradeInValue) * (salesTaxRate / 100);
    const totalLoan = vehiclePrice + taxAmount - downPayment - tradeInValue;
    if (totalLoan <= 0 || interestRate <= 0) {
      return { monthlyPayment: 0, totalCost: 0, totalLoanAmount: 0, totalInterest: 0, amortizationData: [], principal: 0, interestComponent: 0, downPaymentComponent: 0, tradeInComponent: 0 };
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const monthlyPmt = numberOfPayments > 0 ?
      totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;

    const totalPmt = monthlyPmt * numberOfPayments;
    const totalInt = totalPmt - totalLoan;
    const totalVehicleCost = vehiclePrice + taxAmount;

    // Amortization
    let balance = totalLoan;
    const amortization = [];
    for (let i = 0; i < numberOfPayments; i++) {
      balance -= (monthlyPmt - (balance * monthlyRate));
      if (i % 5 === 0 || i === numberOfPayments - 1) {
        amortization.push({ month: i + 1, balance: Math.max(0, balance) });
      }
    }

    const principalVal = vehiclePrice;
    const interestVal = totalInt;
    const downPaymentVal = downPayment;
    const tradeInVal = tradeInValue;
    
    return {
      monthlyPayment: monthlyPmt,
      totalCost: vehiclePrice + taxAmount,
      totalLoanAmount: totalLoan,
      totalInterest: totalInt,
      amortizationData: amortization,
      principal: principalVal,
      interestComponent: interestVal,
      downPaymentComponent: downPaymentVal,
      tradeInComponent: tradeInVal,
    };
  }, [vehiclePrice, downPayment, loanTerm, interestRate, salesTaxRate, tradeInValue]);
  
  const paymentBreakdownData = [
    { name: 'Principal', value: principal, color: '#4A80FF' },
    { name: 'Interest', value: interestComponent, color: '#8B5CF6' },
    { name: 'Down Payment', value: downPaymentComponent, color: '#A78BFA' },
    { name: 'Trade-in Value', value: tradeInComponent, color: '#34D399' },
  ].filter(item => item.value > 0);

  const loanTermsComparisonData = [36, 48, 60, 72].map(term => {
    const monthlyRate = interestRate / 100 / 12;
    const pmt = totalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const int = (pmt * term) - totalLoanAmount;
    return {
      name: `${term} months`,
      'Monthly Payment': pmt,
      'Total Interest': int,
    };
  });

  return (
    <CalculatorWrapper
      title="Auto Loan Calculator"
      description="Find out your estimated auto loan payment. Estimate your monthly payments based on loan amount, interest rate, and term."
      onNavigate={onNavigate}
    >
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 bg-blue-50/50 p-6 rounded-xl border border-gray-200">
           <h3 className="text-xl font-bold text-dark-navy mb-4">Vehicle & Loan Details</h3>
            <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Vehicle Price</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Down Payment</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="relative w-2/3">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                    </div>
                    <div className="relative w-1/3">
                        <input type="number" value={((downPayment/vehiclePrice)*100).toFixed(1)} onChange={e => setDownPayment(vehiclePrice * (Number(e.target.value)/100))} className="w-full pl-3 pr-7 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Loan Term (Months)</label>
                    <div className="flex justify-between items-center gap-2 bg-gray-200 p-1 rounded-lg mt-1">
                        {[36, 48, 60, 72].map(term => (
                            <button key={term} onClick={() => setLoanTerm(term)} className={`w-full py-1.5 rounded-md text-sm font-semibold transition-colors ${loanTerm === term ? 'bg-white shadow text-brand-purple' : 'text-gray-600 hover:bg-white/50'}`}>{term}</button>
                        ))}
                    </div>
                </div>
                 <div>
                    <SliderInput 
                        label="Interest Rate (%)" 
                        min={0} max={20} step={0.1} 
                        value={interestRate} 
                        onChange={setInterestRate}
                        valueDisplay={<div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg">{interestRate.toFixed(2)}%</div>}
                    />
                </div>
            </div>
            <h3 className="text-lg font-bold text-dark-navy mt-6 pt-4 border-t border-gray-200 mb-4 flex items-center">
              Additional Options
              <span className="ml-2 text-gray-400 cursor-pointer" title="Include sales tax and trade-in value for a more accurate calculation.">&#9432;</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Sales Tax Rate (%)</label>
                <div className="relative mt-1">
                  <input type="number" value={salesTaxRate} onChange={e => setSalesTaxRate(Number(e.target.value))} className="w-full pl-3 pr-7 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Trade-in Value</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input type="number" value={tradeInValue} onChange={e => setTradeInValue(Number(e.target.value))} className="w-full pl-7 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-brand-purple focus:ring-brand-purple" />
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 text-center">Estimated Monthly Payment</p>
                <p className="text-4xl font-extrabold text-blue-900 mt-1 text-center">${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : '0.00'}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/50 p-2 rounded">
                        <p className="text-blue-700">Total Loan Amount</p>
                        <p className="font-bold text-blue-900">${totalLoanAmount > 0 ? totalLoanAmount.toFixed(2) : '0.00'}</p>
                    </div>
                     <div className="bg-white/50 p-2 rounded">
                        <p className="text-blue-700">Total Vehicle Cost</p>
                        <p className="font-bold text-blue-900">${totalCost > 0 ? totalCost.toFixed(2) : '0.00'}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Analysis */}
        <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-bold text-dark-navy mb-4">Loan Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3">Payment Breakdown</h4>
                    <Chart type="pie" data={paymentBreakdownData} />
                     <div className="mt-3 space-y-1 text-xs">
                        {paymentBreakdownData.map(item => (
                            <div key={item.name} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                                <span className="font-semibold text-gray-800">${item.value.toFixed(2)}</span>
                            </div>
                        ))}
                         <div className="flex justify-between items-center border-t border-gray-200 pt-1 font-bold">
                             <span className="text-gray-800">Total Cost</span>
                             <span className="text-gray-900">${totalCost.toFixed(2)}</span>
                         </div>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3">Loan Balance Over Time</h4>
                     <Chart
                        type="area"
                        data={amortizationData.map(d => ({ x: d.month, y: d.balance }))}
                        config={{
                            xAxis: { label: 'Months', max: loanTerm },
                            yAxis: { label: 'Balance', max: totalLoanAmount },
                            color: '#8B5CF6'
                        }}
                    />
                </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                 <h4 className="font-bold text-gray-800 mb-3">Loan Terms Comparison</h4>
                  <Chart
                    type="bar"
                    data={loanTermsComparisonData}
                    config={{
                        yAxis: { label: 'Amount' },
                        xAxis: { label: 'Term Length' },
                        keys: ['Monthly Payment', 'Total Interest'],
                        colors: ['#4A80FF', '#A78BFA']
                    }}
                />
            </div>
            <div className="text-center">
                <button className="bg-gradient-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm mx-auto">
                    Get Auto Loan Offers
                </button>
                 <p className="text-xs text-gray-500 mt-2">Compare real auto loan offers from our lending partners based on your information</p>
            </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">Understanding Your Auto Loan</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            An auto loan is a secured loan where the vehicle itself serves as collateral. This calculator helps you break down the costs associated with financing a car. It's important to look beyond just the monthly payment and understand the total cost of the loan.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Vehicle Price:</strong> The sticker price of the car. Don't forget to negotiate this!</li>
            <li><strong>Down Payment:</strong> The cash you pay upfront. A larger down payment reduces your loan amount and can often secure you a better interest rate. A common recommendation is 20% for a new car.</li>
            <li><strong>Loan Term:</strong> The length of time you have to repay the loan. A shorter term (e.g., 48 months) means higher monthly payments but less total interest paid. A longer term (e.g., 72 months) lowers your monthly payment but costs you more in interest over time.</li>
            <li><strong>Interest Rate (APR):</strong> The annual cost of the loan, including interest and fees. Your credit score is the biggest factor in determining your APR.</li>
          </ul>
          <p>
            Use this calculator to see how different down payments and loan terms affect your monthly costs and the total interest you'll pay. This will help you find a financing option that fits your budget.
          </p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default AutoLoanCalculator;
