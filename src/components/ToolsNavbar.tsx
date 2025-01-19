import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import PricingModal from './PricingModal';
import { Link } from 'react-router-dom';

import Logo from './Logo';

export default function ToolsNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const navigate = useNavigate();

  const tools = [
    { label: 'Cost Calculator', id: 'calculator' },
    { label: 'ROI Calculator', id: 'roi' },
    { label: 'Domain Generator', id: 'domain' },
    { label: 'DMARC Generator', id: 'dmarc' },
    { label: 'SPF Generator', id: 'spf-generator' },
    { label: 'SPF Checker', id: 'spf-checker' },
  ];

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
    setIsToolsOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo
              className="h-8 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Home
            </a>
            <div className="relative">
              <button
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                <span>Tools</span>
                <ChevronDown size={16} className={`transform transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                  className="absolute left-0 w-56 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                >
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a
              onClick={() => setIsPricingOpen(true)}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              style={{ cursor: 'pointer' }}
            >
              Pricing
            </a>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <LogIn size={16} />
              <span>Log In</span>
            </button>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Home
            </a>
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              <span>Tools</span>
              <ChevronDown size={16} className={`transform transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isToolsOpen && (
              <div className="pl-4 space-y-1">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            )}
            <a
              onClick={() => setIsPricingOpen(true)}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
              style={{ cursor: 'pointer' }}
            >
              Pricing
            </a>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <button className="w-full text-gray-600 hover:text-gray-900 px-4 py-2 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <LogIn size={16} />
                <span>Log In</span>
              </button>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:from-indigo-700 hover:to-purple-700 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </nav>
  );
}