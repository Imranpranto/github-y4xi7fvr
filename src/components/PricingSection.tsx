import React, { useState } from 'react';
import { Users, Globe2, Rocket, CheckCircle } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const calculateYearlyPrice = (monthlyPrice: number) => {
    // 12 months - 2 months free = 10 months worth for yearly
    return (monthlyPrice * 10).toFixed(0);
  };

  return (
    <div id="pricing" className="relative py-24 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#13002E] to-[#13002E]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Pricing Plans
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Choose your Service Provider and Pricing Plan
        </p>

        {/* Provider Selection */}
        <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 mb-12 border border-white/10">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full">
            <img src="https://workspace.google.com/static/img/google-workspace-logo.svg?cache=1" alt="Google Workspace" className="h-6 filter brightness-150" />
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 text-gray-400">
            <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft 365" className="h-5 filter grayscale" />
            <span className="text-sm">Coming Soon</span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-16">
          <div className="relative inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-6 py-2 text-sm font-medium transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#13002E] ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <div className="flex items-center">
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`relative px-6 py-2 text-sm font-medium transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#13002E] ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
              {billingCycle === 'yearly' && (
              <div className="ml-2 animate-fade-in">
                <span className="relative inline-flex rounded-full px-3 py-1 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 border border-purple-400/30 text-[11px] font-semibold text-purple-300">
                  Get 2 months free
                </span>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-transform group-hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-6 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Starter Plan</h3>
              <p className="text-gray-400 mb-6">Best for Freelancers Looking to Startup</p>
              <div className="flex items-baseline mb-8 relative">
                <span className="text-4xl font-bold">${billingCycle === 'yearly' ? calculateYearlyPrice(30) : '30'}</span>
                <span className="text-gray-400 ml-2">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                {billingCycle === 'yearly' && (
                  <span className="absolute -top-4 right-0 text-sm font-bold text-purple-400 animate-fade-in">2 months free!</span>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all mb-8">
                Buy Now →
              </button>
              <ul className="space-y-4 text-left">
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>10 Mailboxes at $3/mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Additional Mailboxes at $3/Mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>US IP accounts only</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Growth Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex rounded-full px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-lg">
                Most Popular
              </span>
            </div>
            <div className="relative bg-gradient-to-b from-indigo-500/20 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 transition-transform group-hover:scale-[1.02] shadow-lg shadow-indigo-500/10">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mb-6 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Growth Plan</h3>
              <p className="text-gray-400 mb-6">Best for Mid-Size Agencies</p>
              <div className="flex items-baseline mb-8 relative">
                <span className="text-4xl font-bold">${billingCycle === 'yearly' ? calculateYearlyPrice(84) : '84'}</span>
                <span className="text-gray-400 ml-2">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                {billingCycle === 'yearly' && (
                  <span className="absolute -top-4 right-0 text-sm font-bold text-purple-400 animate-fade-in">2 months free!</span>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all mb-8">
                Buy Now →
              </button>
              <ul className="space-y-4 text-left">
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>30 Mailboxes at $2.8/mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Additional Mailboxes at $3/Mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>US IP accounts only</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-gradient-to-b from-blue-500/10 to-indigo-500/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 transition-transform group-hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-6 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p className="text-gray-400 mb-6">Best for Agencies with Multiple Clients</p>
              <div className="flex items-baseline mb-8 relative">
                <span className="text-4xl font-bold">${billingCycle === 'yearly' ? calculateYearlyPrice(250) : '250'}</span>
                <span className="text-gray-400 ml-2">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                {billingCycle === 'yearly' && (
                  <span className="absolute -top-4 right-0 text-sm font-bold text-purple-400 animate-fade-in">2 months free!</span>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all mb-8">
                Buy Now →
              </button>
              <ul className="space-y-4 text-left">
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>100 Mailboxes at $2.5/mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Additional Mailboxes at $2.5/Mailbox</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>US IP accounts only</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle size={20} className="text-green-400 mr-3" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}