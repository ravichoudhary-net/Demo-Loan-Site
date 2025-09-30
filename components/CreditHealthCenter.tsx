import React, { useState } from 'react';
import { Page } from '../App';

type ScoreRange = 'Excellent (780-850)' | 'Good (670-779)' | 'Fair (580-669)' | 'Poor (300-579)';
const SCORE_RANGES: ScoreRange[] = ['Excellent (780-850)', 'Good (670-779)', 'Fair (580-669)', 'Poor (300-579)'];

const FACTORS = [
  'High credit card balances',
  'Short credit history',
  'Recent hard inquiries',
  'Missed or late payments',
  'Not enough types of credit',
  'Other / Not sure'
];

interface Tip {
  title: string;
  description: string;
}

const CreditHealthCenter: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [selectedRange, setSelectedRange] = useState<ScoreRange | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Tip[] | null>(null);

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) ? prev.filter(f => f !== factor) : [...prev, factor]
    );
  };

  const handleGetPlan = async () => {
    if (!selectedRange) {
      setError("Please select a credit score range.");
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);

    const userPrompt = `A user has a credit score in the '${selectedRange}' range. The main factors they believe are affecting their score are: ${selectedFactors.length > 0 ? selectedFactors.join(', ') : 'not specified'}.`;
    
    const systemPrompt = `You are a helpful financial advisor. Your goal is to provide exactly three unique, simple, and encouraging tips to help a user improve their credit score. Respond with a JSON object that contains a single key "tips". The value of "tips" should be an array of three objects. Each object must have two keys: "title" (a short, catchy headline) and "description" (a 2-3 sentence explanation). Do not include any other text or explanations in your response.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "x-ai/grok-4-fast",
          "messages": [
            { "role": "system", "content": systemPrompt },
            { "role": "user", "content": userPrompt }
          ],
          "response_format": { "type": "json_object" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API Error:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      
      if (parsed.tips && parsed.tips.length > 0) {
        setResults(parsed.tips);
      } else {
        throw new Error("AI did not return the expected JSON format.");
      }
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate your action plan at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark-navy">Credit Health Center</h1>
          <p className="mt-4 text-lg text-gray-600">Get a free, personalized action plan to improve your credit health. No credit pull, no impact on your score.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {!results && (
            <>
              {/* Step 1 */}
              <div>
                <h2 className="text-xl font-bold text-dark-navy mb-4">1. What's your estimated credit score?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SCORE_RANGES.map(range => (
                    <button 
                      key={range} 
                      onClick={() => setSelectedRange(range)}
                      className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${selectedRange === range ? 'border-brand-purple bg-purple-50 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-400'}`}
                    >
                      <span className="font-bold block text-dark-navy">{range.split(' ')[0]}</span>
                      <span className="text-xs text-gray-500">{range.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-dark-navy mb-4">2. What factors might be affecting your score? <span className="text-base font-normal text-gray-500">(Optional)</span></h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FACTORS.map(factor => (
                    <button 
                      key={factor}
                      onClick={() => handleFactorToggle(factor)}
                      className={`p-3 rounded-lg border text-sm text-left transition-colors ${selectedFactors.includes(factor) ? 'bg-brand-purple text-white border-brand-purple' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                    >
                      {factor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <button
                  onClick={handleGetPlan}
                  disabled={loading || !selectedRange}
                  className="w-full bg-gradient-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Generating Your Plan...
                    </>
                  ) : 'Get My Free Action Plan'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  This will not impact your credit score.
                </p>
              </div>
            </>
          )}

          {results && (
            <div>
                <h2 className="text-2xl font-bold text-dark-navy text-center mb-2">Your Personalized Action Plan</h2>
                <p className="text-center text-gray-600 mb-6">Here are three simple steps you can take to start improving your credit health.</p>
                <div className="space-y-4">
                    {results.map((tip, index) => (
                        <div key={index} className="bg-light-bg p-5 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-brand-purple flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {tip.title}
                            </h3>
                            <p className="mt-2 text-gray-700 text-sm">{tip.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="mt-8 text-center">
                    <button
                        onClick={() => { setResults(null); setSelectedRange(null); setSelectedFactors([]); }}
                        className="bg-white text-gray-700 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300"
                    >
                        Start Over
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreditHealthCenter;