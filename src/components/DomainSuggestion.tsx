import React, { useState } from 'react';
import { Search, Lightbulb, Copy, Check, RefreshCw, HelpCircle, Globe, Download, FileDown, ClipboardCopy } from 'lucide-react';

interface DomainSuggestion {
  name: string;
  type: string;
}

type SuggestionType = 'mixed' | 'prefix' | 'suffix';

const prefixes = ['try', 'get', 'hey', 'hi', 'lab', 'join', 'meet', 'my', 'your'];
const businessTerms = ['works', 'hub', 'project', 'pro', 'team'];
const actionWords = ['explore', 'build', 'grow', 'start', 'reach', 'check'];
const techFocused = ['design', 'made', 'tech', 'app', 'digital'];
const modifiers = ['easy', 'fast', 'smart', 'next', 'plus'];
const timeRelated = ['now', 'today', '24'];
const qualityIndicators = ['prime', 'elite', 'top'];

const demoSuggestions: DomainSuggestion[] = [
  { name: 'trycoldicp.com', type: 'Prefix' },
  { name: 'coldicphub.com', type: 'Suffix' },
  { name: 'getcoldicp.com', type: 'Prefix' },
  { name: 'coldicplab.com', type: 'Suffix' },
  { name: 'coldicpteam.com', type: 'Suffix' },
  { name: 'smartcoldicp.com', type: 'Prefix' },
  { name: 'coldicpworks.com', type: 'Suffix' },
  { name: 'coldicptech.com', type: 'Suffix' },
  { name: 'coldicppro.com', type: 'Suffix' },
  { name: 'meetcoldicp.com', type: 'Prefix' },
];

export default function DomainSuggestion() {
  const [mainDomain, setMainDomain] = useState('');
  const [count, setCount] = useState(10);
  const [suggestionType, setSuggestionType] = useState<SuggestionType>('mixed');
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateSuggestions = () => {
    setLoading(true);
    const allTerms = [
      ...prefixes,
      ...businessTerms,
      ...actionWords,
      ...techFocused,
      ...modifiers,
      ...timeRelated,
      ...qualityIndicators,
    ];

    const results: DomainSuggestion[] = [];
    const usedNames = new Set();
    const baseDomain = mainDomain.toLowerCase().replace('.com', '');

    // Generate prefix combinations
    while (results.length < count && results.length < 100) {
      const term = allTerms[Math.floor(Math.random() * allTerms.length)];
      let domainName = '';
      let type = '';
      
      switch (suggestionType) {
        case 'prefix':
          domainName = `${term}${baseDomain}.com`;
          type = 'Prefix';
          break;
        case 'suffix':
          domainName = `${baseDomain}${term}.com`;
          type = 'Suffix';
          break;
        default:
          // Mixed mode
          if (Math.random() < 0.5) {
            domainName = `${term}${baseDomain}.com`;
            type = 'Prefix';
          } else {
            domainName = `${baseDomain}${term}.com`;
            type = 'Suffix';
          }
      }

      if (!usedNames.has(domainName)) {
        usedNames.add(domainName);
        results.push({
          name: domainName,
          type,
        });
      }
    }

    setSuggestions(results);
    setLoading(false);
  };

  const copyToClipboard = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopied(domain);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllToClipboard = () => {
    const allDomains = suggestions.map(s => s.name).join('\n');
    navigator.clipboard.writeText(allDomains);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Domain Name', 'Type'],
      ...suggestions.map(s => [s.name, s.type])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${mainDomain.replace('.com', '')}_${suggestions.length}_suggestions_list.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2 p-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Domain Name Generator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Generate creative domain name variations for your cold email campaigns.
        </p>
      </div>

      <div className="grid grid-cols-[2fr_3fr] gap-6">
        {/* Left Column - Input */}
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Domain Configuration
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Domain
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="text"
                  value={mainDomain}
                  onChange={(e) => setMainDomain(e.target.value.toLowerCase())}
                  placeholder="e.g., coldicp.com"
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggestion Type
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'mixed', label: 'Mixed' },
                    { value: 'prefix', label: 'Prefix Only' },
                    { value: 'suffix', label: 'Suffix Only' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSuggestionType(option.value as SuggestionType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        suggestionType === option.value
                          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border border-indigo-200'
                          : 'text-gray-600 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Suggestions
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={count}
                  onChange={(e) => setCount(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                />
              </div>

              <button
                onClick={generateSuggestions}
                disabled={!mainDomain || loading}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Lightbulb className="w-5 h-5" />
                )}
                <span>{loading ? 'Generating...' : 'Generate Suggestions'}</span>
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/50 bg-gradient-to-br from-white to-purple-50/30 p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Available Terms
              </h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Prefixes</h4>
                <div className="flex flex-wrap gap-1">
                  {prefixes.map(term => (
                    <span key={term} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Business Terms</h4>
                <div className="flex flex-wrap gap-1">
                  {businessTerms.map(term => (
                    <span key={term} className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-700">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Action Words</h4>
                <div className="flex flex-wrap gap-1">
                  {actionWords.map(term => (
                    <span key={term} className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl border border-slate-200/50 p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Domain Suggestions
              </h3>
              {(suggestions.length > 0 || (!mainDomain && demoSuggestions.length > 0)) && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyAllToClipboard}
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    {copied === 'all' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="group hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="relative bg-white rounded-lg border border-slate-200/50 p-4 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {suggestion.name}
                        </h4>
                        <button
                          onClick={() => copyToClipboard(suggestion.name)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {copied === suggestion.name ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : !mainDomain && (
                demoSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="group hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="relative bg-white/50 rounded-lg border border-slate-200/50 p-4 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-500">
                          {suggestion.name}
                        </h4>
                        <Copy className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}