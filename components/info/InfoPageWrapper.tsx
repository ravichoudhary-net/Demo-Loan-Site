import React from 'react';
import { Page } from '../../App';

interface InfoPageWrapperProps {
  title: string;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
}

const InfoPageWrapper: React.FC<InfoPageWrapperProps> = ({ title, onNavigate, children, sidebarContent }) => {
  return (
    <section className="py-20 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => onNavigate('home')} className="flex items-center text-brand-purple font-semibold hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-4xl font-extrabold text-dark-navy mb-6">{title}</h1>
                <div className="prose prose-lg max-w-none text-gray-700">
                    {children}
                </div>
            </div>
            <aside className="lg:col-span-1 space-y-8 sticky top-28">
                {sidebarContent}
            </aside>
        </div>
      </div>
    </section>
  );
};

export default InfoPageWrapper;