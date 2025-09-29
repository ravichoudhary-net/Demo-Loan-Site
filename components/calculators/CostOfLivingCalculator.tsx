import React, { useState, useMemo } from 'react';
import { Page } from '../../App';
import CalculatorWrapper from './common/CalculatorWrapper';
import SliderInput from './common/SliderInput';

const cityData = {
  'New York, NY': 100,
  'San Francisco, CA': 95.8,
  'Los Angeles, CA': 80.3,
  'Chicago, IL': 75.9,
  'Washington, D.C.': 82.5,
  'Boston, MA': 85.4,
  'Miami, FL': 78.2,
  'Dallas, TX': 70.1,
  'Houston, TX': 68.3,
  'Atlanta, GA': 72.5,
  'Seattle, WA': 84.1,
  'Denver, CO': 76.8,
  'Austin, TX': 71.1,
  'Phoenix, AZ': 70.5,
};

type City = keyof typeof cityData;

const CostOfLivingCalculator: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [currentSalary, setCurrentSalary] = useState(75000);
  const [currentCity, setCurrentCity] = useState<City>('Chicago, IL');
  const [newCity, setNewCity] = useState<City>('San Francisco, CA');

  const { equivalentSalary, difference, percentageDiff } = useMemo(() => {
    const currentIndex = cityData[currentCity];
    const newIndex = cityData[newCity];
    const salary = (currentSalary / currentIndex) * newIndex;
    const diff = salary - currentSalary;
    const percent = (diff / currentSalary) * 100;
    return {
      equivalentSalary: salary,
      difference: diff,
      percentageDiff: percent,
    };
  }, [currentSalary, currentCity, newCity]);

  return (
    <CalculatorWrapper
      title="Cost of Living Calculator"
      description="Compare the cost of living between major cities and find out how much you'd need to earn in a new city to maintain your current lifestyle."
      onNavigate={onNavigate}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SliderInput label="Current Annual Salary" value={currentSalary} min={30000} max={500000} step={1000} onChange={setCurrentSalary} format={v => `$${v.toLocaleString()}`} />
          <div>
            <label className="font-semibold text-gray-700 block mb-2">Current City</label>
            <select value={currentCity} onChange={e => setCurrentCity(e.target.value as City)} className="w-full p-2 border-gray-300 rounded-md">
              {Object.keys(cityData).map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-2">New City</label>
            <select value={newCity} onChange={e => setNewCity(e.target.value as City)} className="w-full p-2 border-gray-300 rounded-md">
              {Object.keys(cityData).map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-light-bg p-6 rounded-lg sticky top-28 text-center">
            <p className="text-sm text-gray-500">To maintain your lifestyle in {newCity}, you would need a salary of approximately:</p>
            <p className="text-5xl font-extrabold text-brand-purple my-4">${equivalentSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
             <div className={`mt-4 p-3 rounded-md shadow-sm ${difference > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                <p className="font-bold">
                    That's a {percentageDiff > 0 ? 'raise' : 'pay cut'} of ${Math.abs(difference).toLocaleString(undefined, { maximumFractionDigits: 0 })} ({Math.abs(percentageDiff).toFixed(1)}%).
                </p>
             </div>
             <p className="text-xs text-gray-500 mt-4">Data is based on a relative index and is for estimation purposes only.</p>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-lg bg-gray-50 border">
        <h3 className="text-2xl font-bold text-dark-navy mb-4">About the Cost of Living Calculator</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            When considering a job offer in a new city or planning a relocation, your salary is only half of the equation. The cost of living—which includes expenses like housing, transportation, food, and taxes—can vary dramatically from one place to another. This calculator helps you put your salary into context.
          </p>
          <p>
            How it works:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Cost of Living Index:</strong> We use a simplified index where a baseline city (like New York) is assigned a value of 100. Other cities are indexed relative to this baseline. A city with an index of 80 is 20% cheaper to live in than the baseline city.</li>
            <li><strong>Equivalent Salary Calculation:</strong> The calculator determines the salary you would need in the new city to have the same purchasing power as your current salary in your current city.</li>
          </ul>
          <p>
            Use this tool to get a better sense of a job offer's true value. A significant salary increase might not be as attractive if it's in a city with a much higher cost of living. Conversely, a seemingly smaller salary might go much further in a more affordable location.
          </p>
          <p><strong>Disclaimer:</strong> This tool uses a simplified data set for major cities and should be used for estimation purposes only. Actual costs can vary based on your specific lifestyle, neighborhood, and spending habits.</p>
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default CostOfLivingCalculator;
