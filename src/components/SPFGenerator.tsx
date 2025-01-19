import React, { useState } from 'react';
import { Mail, Shield, HelpCircle, Info, Copy, ChevronDown, AlertCircle } from 'lucide-react';
import { SPFRecord } from '../types';

export default function SPFGenerator() {
  const [domain, setDomain] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({
    domain: '',
  });

  const [record, setRecord] = useState<SPFRecord>({
    includes: ['spf.protection.outlook.com'],
    ips: [],
    mechanisms: ['mx', 'a'],
  });

  const commonIncludes = [
    { value: 'spf.protection.outlook.com', label: 'Microsoft 365' },
    { value: 'amazonses.com', label: 'Amazon SES' },
    { value: '_spf.google.com', label: 'Google Workspace' },
    { value: 'spf.smtp.com', label: 'SMTP.com' },
    { value: 'mailgun.org', label: 'Mailgun' },
    { value: 'sendgrid.net', label: 'SendGrid' },
    { value: 'servers.mcsv.net', label: 'Mailchimp' },
  ];

  const generateRecord = () => {
    let spf = 'v=spf1';
    
    // Add mechanisms
    record.mechanisms.forEach(mech => {
      spf += ` ${mech}`;
    });
    
    // Add includes
    record.includes.forEach(include => {
      spf += ` include:${include}`;
    });
    
    // Add IPs
    record.ips.forEach(ip => {
      if (ip.includes('/')) {
        spf += ` ip4:${ip}`;
      } else {
        spf += ` ip4:${ip}/32`;
      }
    });
    
    spf += ' ~all';
    
    return spf;
  };

  const handleGenerate = () => {
    const newErrors = {
      domain: '',
    };

    if (!domain) {
      newErrors.domain = 'Domain is required';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-_.]+[a-zA-Z0-9]$/.test(domain)) {
      newErrors.domain = 'Invalid domain format';
    }

    setErrors(newErrors);

    if (!newErrors.domain) {
      setShowResults(true);
    }
  };

  const handleIncludeToggle = (value: string) => {
    setRecord(prev => ({
      ...prev,
      includes: prev.includes.includes(value)
        ? prev.includes.filter(i => i !== value)
        : [...prev.includes, value]
    }));
  };

  const handleMechanismToggle = (value: string) => {
    setRecord(prev => ({
      ...prev,
      mechanisms: prev.mechanisms.includes(value)
        ? prev.mechanisms.filter(m => m !== value)
        : [...prev.mechanisms, value]
    }));
  };

  const handleAddIP = (ip: string) => {
    if (ip && !record.ips.includes(ip)) {
      setRecord(prev => ({
        ...prev,
        ips: [...prev.ips, ip]
      }));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2 p-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SPF Record Generator
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Create a valid SPF record to protect your domain from email spoofing.
        </p>
      </div>

      <div className="space-y-8">
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
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Service Providers
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {commonIncludes.map((provider) => (
                    <label
                      key={provider.value}
                      className={`group flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer border-2 ${
                        record.includes[0] === provider.value
                          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-200'
                          : 'hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          record.includes[0] === provider.value
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                            : 'bg-slate-100 group-hover:bg-slate-200'
                        }`}>
                          <Mail className={`w-5 h-5 ${
                            record.includes[0] === provider.value ? 'text-white' : 'text-slate-600'
                          }`} />
                        </div>
                        <span className={`text-sm font-medium ${
                          record.includes[0] === provider.value ? 'text-indigo-700' : 'text-gray-700'
                        }`}>{provider.label}</span>
                      </div>
                      <input
                        type="radio"
                        name="provider"
                        checked={record.includes[0] === provider.value}
                        onChange={() => setRecord(prev => ({ ...prev, includes: [provider.value] }))}
                        className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                      />
                    </label>
                  ))}
                </div>
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
                <div className="pt-4 border-t border-slate-200/50 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mechanisms
                      <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                        <HelpCircle size={16} />
                      </button>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['mx', 'a', 'ptr'].map((mech) => (
                        <label
                          key={mech}
                          className={`flex items-center space-x-2 p-3 rounded-lg transition-all cursor-pointer ${
                            record.mechanisms.includes(mech)
                              ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={record.mechanisms.includes(mech)}
                            onChange={() => handleMechanismToggle(mech)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-900 uppercase">{mech}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IP Addresses
                      <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                        <HelpCircle size={16} />
                      </button>
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add IP (e.g., 192.168.1.1 or 192.168.1.0/24)"
                          className="flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddIP((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                      {record.ips.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {record.ips.map((ip) => (
                            <span
                              key={ip}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700"
                            >
                              {ip}
                              <button
                                onClick={() => setRecord(prev => ({
                                  ...prev,
                                  ips: prev.ips.filter(i => i !== ip)
                                }))}
                                className="ml-2 text-indigo-600 hover:text-indigo-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={!domain}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm disabled:hover:scale-100 flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>

        {showResults && (
          <div className="space-y-6">
            <h2 className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Generated results for <span className="font-bold">{domain}</span> domain
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="group hover:scale-[1.02] transition-all duration-200">
                <div className="relative bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border border-emerald-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden h-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-2">
                          <Shield className="w-6 h-6 text-white" />
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
                      Your SPF record is properly formatted and ready to be published
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
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-2">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Policy Mode</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                        Soft Fail (~all)
                      </span>
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Messages that fail SPF checks may be marked but not rejected
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg border border-slate-200/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Publish the following DNS TXT record
              </h3>
              
              <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-600">
                <li>Log into your DNS zone</li>
                <li>Create a new TXT record with the provided data</li>
                <li>Set TTL to 3600 seconds (1 hour) or lower</li>
              </ol>

              <div className="bg-white/80 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                <div className="grid grid-cols-[100px_1fr] border-b border-slate-200">
                  <div className="p-4 font-medium text-gray-600 bg-slate-50 border-r border-slate-200">Host</div>
                  <div className="p-4 font-mono flex items-center justify-between">
                    @
                    <button onClick={() => navigator.clipboard.writeText('@')}>
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
                your SPF record may not be immediately visible to all email systems.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}