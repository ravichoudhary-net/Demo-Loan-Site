import React, { useState } from 'react';
import { Page } from '../App';

const NavLink: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode; hasDropdown?: boolean }> = ({ href, onClick, children, hasDropdown }) => {
  const commonProps = {
    className: "flex items-center text-gray-600 hover:text-brand-purple transition-colors",
  };
  
  if (href) {
    return (
      <a href={href} {...commonProps}>
        {children}
        {hasDropdown && <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
      </a>
    );
  }

  return (
     <button onClick={onClick} {...commonProps}>
        {children}
        {hasDropdown && <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
     </button>
  );
};

const Header: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div onClick={() => onNavigate('home')} className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
              </svg>
            </div>
            <span className="font-bold text-xl text-dark-navy">Demo Loan Site</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink onClick={() => onNavigate('providers')} hasDropdown>Loan Providers</NavLink>
            <NavLink href="#" hasDropdown>Loan Types</NavLink>
            <NavLink href="#" hasDropdown>Resources</NavLink>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-600 hover:text-brand-purple">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-brand-purple">Sign In</button>
          <button className="bg-gradient-primary text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            Check Rates
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;