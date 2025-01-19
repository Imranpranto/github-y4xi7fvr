import React, { useState } from 'react';
import { Mail, Shield, HelpCircle, Info, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface SPFCheckResult {
  isValid: boolean;
  record?: string;
  lookups: number;
  mechanisms: string[];
  includes: string[];
  ips: string[];
  errors: string[];
  warnings: string[];
}

export default function SPFChecker() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({
    domain: '',
  });

  const [checkResult, setCheckResult] = useState<SPFCheckResult>({
    isValid: false,
    lookups: 0,
    mechanisms: [],
    includes: [],
    ips: [],
    errors: [],
    warnings: [],
  });

  const handleCheck = async () => {
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
      setLoading(true);
      setShowResults(false);

      try {
        const response = await api.get(`/api/v1/lookup/spf/${encodeURIComponent(domain)}`);
        // Only log serializable data
        const { data } = response;
        console.log('API Response:', JSON.stringify(data, null, 2));

        if (!data || !data.RecordData) {
          throw new Error('Failed to retrieve SPF record');
        }

        // Check if we have a valid SPF record in the response
        const spfText = data.RecordData.split('\n')
          .find(line => line.trim().startsWith('v=spf1'));

        const result: SPFCheckResult = {
          isValid: !!spfText,
          record: spfText,
          lookups: 0,
          mechanisms: [],
          includes: [],
          ips: [],
          errors: [],
          warnings: [],
        };

        // Parse the SPF record
        if (spfText) {
          const parts = spfText.split(' ').filter(Boolean);
          
          parts.forEach(part => {
            if (part === 'v=spf1') return;

            if (part.startsWith('include:')) {
              result.includes.push(part.slice(8));
              result.lookups++;
            } else if (part.startsWith('ip4:') || part.startsWith('ip6:')) {
              result.ips.push(part);
            } else if (['a', 'mx', 'ptr', '~all', '-all', '?all', '+all'].includes(part)) {
              result.mechanisms.push(part);
            }
          });

          // Validate common issues
          if (result.lookups > 10) {
            result.warnings.push('Too many DNS lookups (max 10 allowed)');
          }

          if (!parts.some(p => p.endsWith('all'))) {
            result.warnings.push('Missing all mechanism qualifier');
          }

          if (parts.includes('+all')) {
            result.warnings.push('Using +all is not recommended as it allows any server to send mail');
          }
        } else {
          result.isValid = false;
          result.errors.push('No SPF record found');
        }

        setCheckResult(result);
        setShowResults(true);
      } catch (error) {
        // Safely log error details
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('API Error:', errorMessage);
        
        setCheckResult({
          isValid: false,
          record: undefined,
          lookups: 0,
          mechanisms: [],
          includes: [],
          ips: [],
          errors: ['Failed to check SPF record. Please verify your domain and API key configuration.'],
          warnings: [],
        });
        setShowResults(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2 p-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SPF Record Checker
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Check and validate your domain's SPF record for common issues and best practices.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200/50 p-6 bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Domain Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain *
                  <button className="ml-2 text-gray-400 hover:text-gray-500 transition-colors">
                    <HelpCircle size={16} />
                  </button>
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
                    <AlertTriangle size={12} className="mr-1" />
                    {errors.domain}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCheck}
              disabled={!domain || loading}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm disabled:hover:scale-100 flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              <span>{loading ? 'Checking...' : 'Check SPF Record'}</span>
            </button>
          </div>
        </div>

        {showResults && (
          <div className="space-y-6">
            <h2 className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Analysis results for <span className="font-bold">{domain}</span>
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="group hover:scale-[1.02] transition-all duration-200">
                <div className={`relative bg-gradient-to-br ${
                  checkResult.isValid
                    ? 'from-white to-emerald-50/30'
                    : 'from-white to-red-50/30'
                } rounded-xl border ${
                  checkResult.isValid
                    ? 'border-emerald-200/50'
                    : 'border-red-200/50'
                } p-6 backdrop-blur-sm shadow-lg overflow-hidden h-[180px]`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${
                    checkResult.isValid
                      ? 'from-emerald-500/10 to-green-500/10'
                      : 'from-red-500/10 to-rose-500/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`bg-gradient-to-r ${
                          checkResult.isValid
                            ? 'from-emerald-500 to-green-500'
                            : 'from-red-500 to-rose-500'
                        } rounded-lg p-2`}>
                          {checkResult.isValid ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <XCircle className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Record Status</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${
                        checkResult.isValid
                          ? 'from-emerald-600 to-green-600'
                          : 'from-red-600 to-rose-600'
                      } bg-clip-text text-transparent`}>
                        {checkResult.isValid ? 'Valid' : 'Invalid'}
                      </span>
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${
                        checkResult.isValid
                          ? 'from-emerald-500 to-green-500'
                          : 'from-red-500 to-rose-500'
                      } animate-pulse`} />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {checkResult.isValid
                        ? 'Your SPF record is properly formatted'
                        : 'Your SPF record has issues that need attention'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group hover:scale-[1.02] transition-all duration-200">
                <div className="relative bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-blue-200/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden h-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-2">
                          <Info className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">DNS Lookups</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {checkResult.lookups} / 10
                      </span>
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {checkResult.lookups <= 10
                        ? 'Within the recommended limit'
                        : 'Exceeds the recommended limit of 10 lookups'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {checkResult.record && (
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg border border-slate-200/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Current SPF Record
                </h3>
                <div className="font-mono text-sm bg-white/80 rounded-lg border border-slate-200/50 p-4">
                  {checkResult.record}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg border border-slate-200/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Detailed Analysis
              </h3>

              <div className="space-y-6">
                {checkResult.errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-600 flex items-center">
                      <XCircle size={16} className="mr-2" />
                      Errors
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {checkResult.errors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {checkResult.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-amber-600 flex items-center">
                      <AlertTriangle size={16} className="mr-2" />
                      Warnings
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {checkResult.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-amber-600">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Mechanisms</h4>
                    <div className="flex flex-wrap gap-2">
                      {checkResult.mechanisms.map((mech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700"
                        >
                          {mech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Includes</h4>
                    <div className="flex flex-wrap gap-2">
                      {checkResult.includes.map((include, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700"
                        >
                          {include}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">IP Addresses</h4>
                    <div className="flex flex-wrap gap-2">
                      {checkResult.ips.map((ip, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700"
                        >
                          {ip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-100/50 p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-1.5">
                  <Info size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Recommendations
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {checkResult.isValid ? (
                    <>
                      Your SPF record is valid and follows best practices.
                      {checkResult.warnings.length > 0 && ' However, there are some recommendations for improvement.'}
                    </>
                  ) : (
                    'Your SPF record needs attention. Please fix the identified issues to ensure proper email authentication.'
                  )}
                </p>
                {(checkResult.warnings.length > 0 || !checkResult.isValid) && (
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                    <li>Consider using ~all instead of +all for better security</li>
                    <li>Keep DNS lookups under 10 to prevent timeouts</li>
                    <li>Use specific IP ranges instead of broad mechanisms when possible</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}