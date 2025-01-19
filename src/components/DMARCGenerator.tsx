import React, { useState, useEffect } from 'react';
import { DMARCPolicy } from '../types';
import { Copy, CheckCircle, HelpCircle, Info, Shield, Mail, AlertCircle, ChevronDown } from 'lucide-react';

export default function DMARCGenerator() {
  const [policy, setPolicy] = useState<DMARCPolicy>({
    domain: '',
    policy: 'none',
    percentage: 100,
    rua: '',  // Will be updated when domain changes
    ruf: '',
    subdomainPolicy: 'none',
    spfAlignment: 'r',
    dkimAlignment: 'r',
    reportingInterval: 86400,
    failureOptions: ['1'],
  });

  const [errors, setErrors] = useState({
    domain: '',
    rua: '',
  });

  const [copied, setCopied] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateRecord = () => {
    if (!policy.domain) return '';
    
    let record = `v=DMARC1,p=${policy.policy},pct=${policy.percentage},aspf=${policy.spfAlignment},adkim=${policy.dkimAlignment}`;
    
    if (policy.rua) {
      record += `,rua=mailto:${policy.rua},ri=${policy.reportingInterval}`;
    }

    if (policy.failureOptions.length > 0) {
      record += `,fo=${policy.failureOptions.join(':')}`;
    }
    
    return record;
  };

  const handleGenerate = () => {
    const newErrors = {
      domain: '',
      rua: '',
    };

    if (!policy.domain) {
      newErrors.domain = 'Domain is required';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-_.]+[a-zA-Z0-9]$/.test(policy.domain)) {
      newErrors.domain = 'Invalid domain format';
    }

    if (!policy.rua) {
      newErrors.rua = 'Aggregate report email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(policy.rua)) {
      newErrors.rua = 'Invalid email format';
    }

    setErrors(newErrors);

    if (!newErrors.domain && !newErrors.rua) {
      setShowResults(true);
    }
  };

  // Update RUA email when domain changes
  useEffect(() => {
    if (policy.domain) {
      setPolicy(prev => ({
        ...prev,
        rua: `dmarc@${policy.domain}`
      }));
    }
  }, [policy.domain]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateRecord());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2 p-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DMARC Record Generator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Create a valid DMARC record in a few clicks to use it in your DNS.
        </p>
      </div>

      <div className="space-y-8">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200/50 p-6 bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Basic Configuration
              </h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain *
                </label>
                <input
                  type="text"
                  value={policy.domain}
                  onChange={(e) => setPolicy({ ...policy, domain: e.target.value })}
                  placeholder="example.com"
                  className={`w-full rounded-lg ${
                    errors.domain ? 'border-red-300' : 'border-slate-200'
                  } bg-white px-4 py-2.5 text-sm border-2 hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm`}
                />
                {errors.domain && (
                  <div className="absolute -bottom-5 left-0 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.domain}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Policy type
                  </label>
                  <button className="text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'none', label: 'None (monitoring)' },
                    { value: 'quarantine', label: 'Quarantine' },
                    { value: 'reject', label: 'Reject' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-all cursor-pointer ${
                        policy.policy === option.value
                          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="policy"
                        value={option.value}
                        checked={policy.policy === option.value}
                        onChange={(e) => setPolicy({ ...policy, policy: e.target.value as DMARCPolicy['policy'] })}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Percentage of Messages (%) *
                  <span className="ml-1 text-xs text-gray-500">(Required)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={policy.percentage}
                  onChange={(e) =>
                    setPolicy({
                      ...policy,
                      percentage: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                    })
                  }
                  className="w-full rounded-md border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/50 p-6 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Reporting Configuration
              </h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aggregate reports send to *
                </label>
                <input
                  type="email"
                  value={policy.rua}
                  onChange={(e) => setPolicy(prev => ({ ...prev, rua: e.target.value }))}
                  placeholder="Enter email for aggregate reports (e.g. dmarc@yourdomain.com)"
                  className={`w-full rounded-lg ${
                    errors.rua ? 'border-red-300' : 'border-slate-200'
                  } bg-white px-4 py-2.5 text-sm border-2 hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm`}
                />
                {errors.rua && (
                  <div className="absolute -bottom-5 left-0 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.rua}
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  This email address will receive periodic reports about email authentication results
                </p>
              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                />
                <span>Advanced Options</span>
              </button>

              {showAdvanced && (
                <div className="pt-4 border-t border-slate-200/50">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subdomain policy
                        <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                          <HelpCircle size={16} />
                        </button>
                      </label>
                      <select
                        value={policy.subdomainPolicy}
                        onChange={(e) => setPolicy({ ...policy, subdomainPolicy: e.target.value })}
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                      >
                        <option value="none">None (monitoring)</option>
                        <option value="quarantine">Quarantine</option>
                        <option value="reject">Reject</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SPF identifier alignment
                        <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                          <HelpCircle size={16} />
                        </button>
                      </label>
                      <select
                        value={policy.spfAlignment}
                        onChange={(e) => setPolicy({ ...policy, spfAlignment: e.target.value })}
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                      >
                        <option value="r">Relaxed</option>
                        <option value="s">Strict</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DKIM identifier alignment
                        <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                          <HelpCircle size={16} />
                        </button>
                      </label>
                      <select
                        value={policy.dkimAlignment}
                        onChange={(e) => setPolicy({ ...policy, dkimAlignment: e.target.value })}
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                      >
                        <option value="r">Relaxed</option>
                        <option value="s">Strict</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reporting interval (seconds)
                        <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                          <HelpCircle size={16} />
                        </button>
                      </label>
                      <input
                        type="number"
                        value={policy.reportingInterval}
                        onChange={(e) => setPolicy({
                          ...policy,
                          reportingInterval: Math.max(3600, parseInt(e.target.value) || 86400),
                        })}
                        min="3600"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Minimum 3600 seconds (1 hour). Default is 86400 seconds (24 hours).
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Failure reporting options
                        <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                          <HelpCircle size={16} />
                        </button>
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: '0', label: 'Generate report if all mechanisms fail' },
                          { value: '1', label: 'Generate report if any mechanism fails' },
                          { value: 'd', label: 'Generate report if DKIM fails' },
                          { value: 's', label: 'Generate report if SPF fails' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={policy.failureOptions.includes(option.value)}
                              onChange={(e) => {
                                const newOptions = e.target.checked
                                  ? [...policy.failureOptions, option.value]
                                  : policy.failureOptions.filter(o => o !== option.value);
                                setPolicy({ ...policy, failureOptions: newOptions });
                              }}
                              className="rounded border-slate-300 text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Failure reports send to
                    </label>
                    <input
                      type="email"
                      value={policy.ruf}
                      onChange={(e) => setPolicy({ ...policy, ruf: e.target.value })}
                      placeholder="Enter email for failure reports (optional)"
                      className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This email address will receive detailed reports about authentication failures
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={!policy.domain || !policy.rua}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm disabled:hover:scale-100 flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            <h2 className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Generated results for <span className="font-bold">{policy.domain}</span> domain
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="group hover:scale-[1.02] transition-all duration-200">
                <div className="relative bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border border-emerald-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden h-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-2">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Record Status</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Valid
                      </span>
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Your DMARC record is properly formatted and ready to be published
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:scale-[1.02] transition-all duration-200">
                <div className="relative bg-gradient-to-br from-white to-orange-50/30 rounded-xl border border-orange-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden h-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`bg-gradient-to-r rounded-lg p-2 ${
                          policy.policy === 'none' ? 'from-orange-500 to-yellow-500' :
                          policy.policy === 'quarantine' ? 'from-yellow-500 to-amber-500' :
                          'from-red-500 to-rose-500'
                        }`}>
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Domain Policy</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                        policy.policy === 'none' ? 'from-orange-600 to-yellow-600' :
                        policy.policy === 'quarantine' ? 'from-yellow-600 to-amber-600' :
                        'from-red-600 to-rose-600'
                      }`}>
                        {policy.policy.charAt(0).toUpperCase() + policy.policy.slice(1)}
                      </span>
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r animate-pulse ${
                        policy.policy === 'none' ? 'from-orange-500 to-yellow-500' :
                        policy.policy === 'quarantine' ? 'from-yellow-500 to-amber-500' :
                        'from-red-500 to-rose-500'
                      }`} />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {policy.policy === 'none' ? 'Monitoring mode - no action taken on failing messages' :
                       policy.policy === 'quarantine' ? 'Failed messages will be marked as spam' :
                       'Failed messages will be rejected'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg border border-slate-200/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Publish the following DNS TXT record on <span className="text-indigo-600">_dmarc.{policy.domain}</span> subdomain
              </h3>
              
              <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-600">
                <li>Log into your DNS zone</li>
                <li>Navigate to the DNS record section</li>
                <li>Create a new TXT record with the provided data</li>
              </ol>

              <div className="bg-white/80 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                <div className="grid grid-cols-[100px_1fr] border-b border-slate-200">
                  <div className="p-4 font-medium text-gray-600 bg-slate-50 border-r border-slate-200">Host</div>
                  <div className="p-4 font-mono flex items-center justify-between">
                    _dmarc.{policy.domain}
                    <button onClick={() => navigator.clipboard.writeText(`_dmarc.${policy.domain}`)}>
                      <Copy size={16} className="text-gray-400 hover:text-gray-600 transition-colors" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-slate-200">
                  <div className="p-4 font-medium text-gray-600 bg-slate-50 border-r border-slate-200">Type</div>
                  <div className="p-4">TXT</div>
                </div>
                <div className="grid grid-cols-[100px_1fr]">
                  <div className="p-4 font-medium text-gray-600 bg-slate-50 border-r border-slate-200">Value</div>
                  <div className="p-4 font-mono flex items-center justify-between group">
                    <div className="truncate pr-2">
                      {generateRecord()}
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(generateRecord())}>
                      <Copy size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-100/50 p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                  <Info size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Note</h3>
              </div>
              <p className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                DNS changes may take 24-48 hours to propagate globally. During this time, 
                your DMARC record may not be immediately visible to all email systems.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}