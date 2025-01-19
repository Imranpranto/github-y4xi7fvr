import React from 'react';
import { Users, Mail, ArrowRight, Target, Rocket, Shield } from 'lucide-react';

import Logo from './Logo';

export default function LeadGenBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="relative rounded-md bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-8">
        <div className="absolute top-4 right-4">
          <Logo className="h-6 w-auto brightness-200" />
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-lg p-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Done-For-You B2B Cold Email Lead Generation Services
              </h3>
              <p className="text-white/80">
                End-to-end lead generation solution for B2B businesses
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Email Infrastructure</p>
                <p className="text-white/80 text-sm">
                Avoid spam traps with a solid foundation
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lead Lists</p>
                <p className="text-white/80 text-sm">
                Prioritize quality. Understand your Ideal Client Profile deeply
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Email Scripts</p>
                <p className="text-white/80 text-sm">
                Personalization is vital, but relevancy is king
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lead Management</p>
                <p className="text-white/80 text-sm">
                Turn replies into revenue swiftly and precisely
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <a 
              href="mailto:support@coldicp.com"
              className="text-white/80 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>support@coldicp.com</span>
            </a>
            <a
              href="mailto:support@coldicp.com"
              className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}