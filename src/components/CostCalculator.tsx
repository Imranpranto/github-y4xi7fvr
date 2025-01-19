import React, { useState, useEffect } from 'react';
import { espCosts, sequencerCosts } from '../data/costs';
import { DollarSign, Building2, Server, Calculator, HelpCircle, Clock, Calendar, Download, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function CostCalculator() {
  const [users, setUsers] = useState(1);
  const [selectedESP, setSelectedESP] = useState('Google Workspace');
  const breakdownRef = React.useRef<HTMLDivElement>(null);
  const [espCost, setEspCost] = useState(0);
  const [selectedSequencer, setSelectedSequencer] = useState('Smartlead');
  const [sequencerCost, setSequencerCost] = useState(0);
  const [infrastructure, setInfrastructure] = useState({
    servers: 0,
    security: 0,
    maintenance: 0,
    backup: 0,
    other: 0,
  });
  const [view, setView] = useState<'monthly' | '3months' | '6months' | '9months' | 'annual'>('monthly');

  const esp = espCosts.find((esp) => esp.name === selectedESP)!;
  const sequencer = sequencerCosts.find((seq) => seq.name === selectedSequencer)!;

  const monthlyTotal =
    espCost * users +
    sequencerCost +
    Object.values(infrastructure).reduce((a, b) => a + b, 0);

  const getTimeframeMultiplier = () => {
    switch (view) {
      case '3months': return 3;
      case '6months': return 6;
      case '9months': return 9;
      case 'annual': return 12;
      default: return 1;
    }
  };

  const timeframeTotal = monthlyTotal * getTimeframeMultiplier();

  const infrastructureBreakdown = [
    { name: 'Servers', value: infrastructure.servers, percentage: monthlyTotal ? (infrastructure.servers / monthlyTotal * 100).toFixed(1) : '0' },
    { name: 'Security', value: infrastructure.security, percentage: monthlyTotal ? (infrastructure.security / monthlyTotal * 100).toFixed(1) : '0' },
    { name: 'Maintenance', value: infrastructure.maintenance, percentage: monthlyTotal ? (infrastructure.maintenance / monthlyTotal * 100).toFixed(1) : '0' },
    { name: 'Backup', value: infrastructure.backup, percentage: monthlyTotal ? (infrastructure.backup / monthlyTotal * 100).toFixed(1) : '0' },
    { name: 'Other', value: infrastructure.other, percentage: monthlyTotal ? (infrastructure.other / monthlyTotal * 100).toFixed(1) : '0' },
  ];


  const downloadImage = async () => {
    if (!breakdownRef.current) return;

    // Show the title before capturing
    const titleElement = breakdownRef.current.querySelector('div:first-child');
    if (titleElement) {
      titleElement.classList.remove('invisible', 'h-0');
      titleElement.style.position = 'relative';
    }

    // Add padding to ensure full content is captured
    breakdownRef.current.style.padding = '32px';

    try {
      const dataUrl = await toPng(breakdownRef.current, {
        quality: 1.0,
        backgroundColor: '#ffffff',
        pixelRatio: 2, // Increase resolution
        style: {
          margin: '0',
          transform: 'scale(1)',
        },
        filter: (node) => {
          // Ensure tooltips and other floating elements are not captured
          const exclusions = ['tippy', 'tooltip', 'popup'];
          return !exclusions.some(className => 
            node.className?.includes?.(className)
          );
        },
      });

      const link = document.createElement('a');
      link.download = `email-costs-${view}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();

      // Reset padding after capture
      breakdownRef.current.style.padding = '';

      // Hide the title again
      if (titleElement) {
        titleElement.classList.add('invisible', 'h-0');
        titleElement.style.position = 'absolute';
      }
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-indigo-50/10 via-purple-50/10 to-pink-50/10">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2 p-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Email Cost Calculator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Calculate your total email infrastructure costs including ESP, sequencer, and infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-[2fr_3fr] gap-6">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Email Service Provider
              </h3>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <select
                  value={selectedESP}
                  onChange={(e) => setSelectedESP(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                >
                  {espCosts.map((esp) => (
                    <option key={esp.name} value={esp.name}>
                      {esp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per User ($/month)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={espCost}
                  onChange={(e) => setEspCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Users
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  min="1"
                  value={users}
                  onChange={(e) => setUsers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-purple-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Server className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Email Sequencer
              </h3>
            </div>
            <div className="grid gap-4">
              <select
                value={selectedSequencer}
                onChange={(e) => setSelectedSequencer(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
              >
                {sequencerCosts.map((seq) => (
                  <option key={seq.name} value={seq.name}>
                    {seq.name}
                  </option>
                ))}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Cost ($)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sequencerCost}
                  onChange={(e) => setSequencerCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-pink-50/30 p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Server className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Infrastructure Costs
              </h3>
            </div>
            <div className="grid gap-4">
              {Object.entries(infrastructure).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="capitalize">{key}</span> ($/month)
                    {key === 'other' && (
                      <span className="ml-1 text-xs text-gray-500">
                        (Additional costs not covered above)
                      </span>
                    )}
                    <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                      <HelpCircle size={16} />
                    </button>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) =>
                      setInfrastructure((prev) => ({
                        ...prev,
                        [key]: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <div ref={breakdownRef}>
            <div className="invisible h-0 overflow-hidden" style={{ position: 'absolute', top: 0 }}>
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                COLDICP
              </h1>
              <p className="text-gray-600 text-center text-lg mb-6">
                Email Setup Cost Calculator
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl border border-slate-200/50 p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Total Cost Breakdown
              </h3>
              <div className="flex items-center">
                <div className="relative flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                  {[
                    { id: 'monthly', label: '1M', icon: <Clock size={12} /> },
                    { id: '3months', label: '3M', icon: <Clock size={12} /> },
                    { id: '6months', label: '6M', icon: <Clock size={12} /> },
                    { id: '9months', label: '9M', icon: <Clock size={12} /> },
                    { id: 'annual', label: '1Y', icon: <Calendar size={12} /> },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setView(option.id as typeof view)}
                      className={`relative flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        view === option.id
                          ? 'text-indigo-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500">
                  Total Cost ({view === 'monthly' ? 'Monthly' : 
                    view === 'annual' ? '12 Months' : 
                    view.replace('months', 'M')})
                </p>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-8 w-8 text-indigo-600" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {timeframeTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    ESP Cost - {selectedESP} ({monthlyTotal ? (espCost * users / monthlyTotal * 100).toFixed(1) : '0'}%)
                    <span className="block text-xs text-gray-500">
                      {users} user{users !== 1 ? 's' : ''} × ${espCost}/user
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${(espCost * users * getTimeframeMultiplier()).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${monthlyTotal ? (espCost * users / monthlyTotal * 100) : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Sequencer - {selectedSequencer} ({monthlyTotal ? (sequencerCost / monthlyTotal * 100).toFixed(1) : '0'}%)
                    <span className="block text-xs text-gray-500">
                      Fixed cost per month
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${(sequencerCost * getTimeframeMultiplier()).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                    style={{ width: `${monthlyTotal ? (sequencerCost / monthlyTotal * 100) : 0}%` }}
                  ></div>
                </div>
              </div>

              {infrastructureBreakdown.map((item) => (
                <div key={item.name} className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.name} ({item.percentage}%)</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${(item.value * getTimeframeMultiplier()).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-100/50 p-6 backdrop-blur-sm mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Calculator size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Summary</h3>
            </div>
            <p className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Your total email infrastructure cost is ${monthlyTotal.toFixed(2)} per month
              {view !== 'monthly' && ` (${timeframeTotal.toFixed(2)} for ${
                view === 'annual' ? '12 months' : view.replace('months', ' months')
              })`}.
              This includes all ESP, sequencer, and infrastructure costs for {users} user{users !== 1 ? 's' : ''}.
            </p>
          </div>
          </div>
          
          {/* Save Image Button */}
          <div className="flex flex-col items-center justify-center mt-8">
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              title="Download as image"
            >
              <Download size={18} className="text-white" />
              <span>Save Cost Breakdown</span>
            </button>
            <div className="flex items-center mt-3 space-x-2 text-sm text-gray-500">
              <Share2 size={14} className="text-indigo-500" />
              <span>Download the cost breakdown with summary as an image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}