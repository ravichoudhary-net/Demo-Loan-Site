import React, { useState, FC } from 'react';
import { Provider } from './AllProviders';

const TABS = ['Interest Rates', 'Loan Amounts', 'Processing Time', 'Ratings & Reviews'];

interface ProviderComparisonProps {
    providers: Provider[];
    onClose: () => void;
    onUpdateList: (providers: Provider[]) => void;
}

const ProviderComparison: FC<ProviderComparisonProps> = ({ providers, onClose, onUpdateList }) => {
    const [activeTab, setActiveTab] = useState('Interest Rates');

    const handleRemove = (name: string) => {
        onUpdateList(providers.filter(p => p.name !== name));
    };

    const handleClearAll = () => {
        onUpdateList([]);
    };

    const renderValue = (value: string | number | boolean | string[] | undefined) => {
        if (typeof value === 'boolean') {
            return value ? (
                <span className="flex items-center justify-center text-green-600 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Yes
                </span>
            ) : (
                <span className="flex items-center justify-center text-red-600 font-semibold">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    No
                </span>
            );
        }
         if (typeof value === 'number') {
            return value.toLocaleString();
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value || 'N/A';
    };

    const renderContent = () => {
        let rows: { label: string; key: keyof Provider }[];

        switch (activeTab) {
            case 'Interest Rates':
                rows = [
                    { label: 'Interest Rate Range', key: 'aprRange' },
                    { label: 'Origination Fee', key: 'originationFee' },
                    { label: 'Late Fee', key: 'lateFee' },
                    { label: 'Prepayment Penalty', key: 'prepaymentPenalty' },
                ];
                break;
            case 'Loan Amounts':
                 rows = [
                    { label: 'Loan Amount Range', key: 'amountRange' },
                    { label: 'Minimum Amount', key: 'minAmount' },
                    { label: 'Maximum Amount', key: 'maxAmount' },
                ];
                break;
            case 'Processing Time':
                rows = [
                    { label: 'Funding Time', key: 'time' },
                    { label: 'Processing Speed', key: 'speed' },
                ];
                break;
            case 'Ratings & Reviews':
                rows = [
                    { label: 'Rating', key: 'rating' },
                    { label: 'Number of Reviews', key: 'reviews' },
                ];
                break;
            default:
                return <p className="text-center col-span-full py-8 text-gray-500">Data for {activeTab} is not available yet.</p>;
        }

        return rows.map(({ label, key }) => (
             <div key={key} className="grid grid-cols-4 items-center border-b border-gray-200 py-4 text-sm">
                <p className="font-semibold text-gray-700 col-span-1">{label}</p>
                {providers.map(p => (
                    <div key={`${p.name}-${key}`} className={`text-gray-800 text-center ${key === 'aprRange' ? 'text-green-600 font-bold' : ''}`}>
                        {renderValue(p[key as keyof Provider])}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-dark-navy">Provider Comparison</h2>
                        <button onClick={handleClearAll} className="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
                            Clear All
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                        {TABS.map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTab === tab ? 'bg-brand-purple text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Comparison Table */}
                    <div>
                        {/* Provider Headers */}
                        <div className="grid grid-cols-4 items-center py-4">
                            <div className="col-span-1"></div>
                            {providers.map(p => (
                                <div key={p.name} className="text-center relative px-4">
                                    <button onClick={() => handleRemove(p.name)} className="absolute top-0 right-0 text-gray-400 hover:text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <img src={`https://logo.clearbit.com/${p.name.split(' ')[0]}.com`} alt={p.name} className="w-16 h-16 object-contain mx-auto mb-2 rounded-lg border p-1" />
                                    <p className="font-bold text-dark-navy text-sm">{p.name}</p>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Featured</span>
                                </div>
                            ))}
                        </div>

                        {/* Attribute Rows */}
                        <div className="border-t border-gray-200">
                            {renderContent()}
                        </div>
                        
                        {/* Action Buttons */}
                         <div className="grid grid-cols-4 items-center pt-6">
                             <div className="col-span-1"></div>
                             {providers.map(p => (
                                <div key={p.name} className="text-center px-2">
                                    <button 
                                        onClick={() => window.open(p.website, '_blank', 'noopener,noreferrer')}
                                        className="w-full bg-gradient-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm">
                                        Check Rates
                                    </button>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderComparison;