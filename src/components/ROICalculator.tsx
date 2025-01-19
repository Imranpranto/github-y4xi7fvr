import React, { useState, useRef } from 'react';
import { Calculator, HelpCircle, Download, Share2, TrendingUp, Users, Mail, DollarSign, Target } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function ROICalculator() {
  const [prospects, setProspects] = useState(5000);
  const [openRate, setOpenRate] = useState(75);
  const [replyRate, setReplyRate] = useState(12);
  const [closeRate, setCloseRate] = useState(35);
  const [dealValue, setDealValue] = useState(400);
  const breakdownRef = useRef<HTMLDivElement>(null);

  // Calculate metrics
  const openedEmails = Math.round((prospects * openRate) / 100);
  const positiveReplies = Math.round((openedEmails * replyRate) / 100);
  const closedDeals = Math.round((positiveReplies * closeRate) / 100);
  const expectedRevenue = closedDeals * dealValue;

  const downloadImage = async () => {
    if (!breakdownRef.current) return;

    // Show the title before capturing
    const titleElement = breakdownRef.current.querySelector('div:first-child');
    if (titleElement) {
      titleElement.classList.remove('invisible', 'h-0');
      titleElement.style.position = 'relative';
    }

    breakdownRef.current.style.padding = '32px';

    try {
      const dataUrl = await toPng(breakdownRef.current, {
        quality: 1.0,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        style: {
          margin: '0',
          transform: 'scale(1)',
        },
      });

      const link = document.createElement('a');
      link.download = `cold-email-roi-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();

      breakdownRef.current.style.padding = '';

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
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Cold Email ROI Calculator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Calculate the expected return on investment for your cold email campaigns.
        </p>
      </div>

      <div className="grid grid-cols-[2fr_3fr] gap-6">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Campaign Metrics
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Prospects
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="100"
                  value={prospects}
                  onChange={(e) => setProspects(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0</span>
                  <span>{prospects.toLocaleString()}</span>
                  <span>50k</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Open Rate (%)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={openRate}
                  onChange={(e) => setOpenRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0%</span>
                  <span>{openRate}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Positive Reply Rate (%)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={replyRate}
                  onChange={(e) => setReplyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0%</span>
                  <span>{replyRate}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-purple-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Conversion Metrics
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Rate (%)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0%</span>
                  <span>{closeRate}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Deal Value ($)
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  min="0"
                  value={dealValue}
                  onChange={(e) => setDealValue(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>
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
                Cold Email ROI Calculator
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl border border-slate-200/50 p-6 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Expected Campaign Results
              </h3>

              <div className="grid grid-cols-2 gap-6 [&>*]:h-[180px]">
                <div className="group hover:scale-[1.02] transition-all duration-200">
                  <div className="relative h-full bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border border-emerald-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-2">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Opened Emails</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                          {openedEmails.toLocaleString()}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {openRate}% of {prospects.toLocaleString()} prospects
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:scale-[1.02] transition-all duration-200">
                  <div className="relative h-full bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-blue-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-2">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Positive Replies</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {positiveReplies.toLocaleString()}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {replyRate}% of opened emails
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:scale-[1.02] transition-all duration-200">
                  <div className="relative h-full bg-gradient-to-br from-white to-purple-50/30 rounded-xl border border-purple-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Closed Deals</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {closedDeals.toLocaleString()}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {closeRate}% close rate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:scale-[1.02] transition-all duration-200">
                  <div className="relative h-full bg-gradient-to-br from-white to-orange-50/30 rounded-xl border border-orange-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-2">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Expected Revenue</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          ${expectedRevenue.toLocaleString()}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        ${dealValue} per deal
                      </p>
                    </div>
                  </div>
                </div>
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
                Based on your campaign metrics, you can expect to generate ${expectedRevenue.toLocaleString()} in revenue
                from {closedDeals} closed deals, with an average deal value of ${dealValue}.
                This represents a {((closedDeals / prospects) * 100).toFixed(2)}% overall conversion rate from initial prospects.
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
              <span>Save ROI Breakdown</span>
            </button>
            <div className="flex items-center mt-3 space-x-2 text-sm text-gray-500">
              <Share2 size={14} className="text-indigo-500" />
              <span>Download the ROI breakdown with summary as an image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}