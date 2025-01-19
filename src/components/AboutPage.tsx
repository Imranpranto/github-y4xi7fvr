import React from 'react';
import { Users, Globe2, Shield, Award, Target, Rocket, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13002E] via-[#240043] to-[#13002E] text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            Revolutionizing{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cold Email Infrastructure
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 mb-12">
            We're on a mission to simplify cold email infrastructure setup and management, helping businesses scale their outreach efforts with confidence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">32000+</h3>
              <p className="text-gray-400">Active Mailboxes</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                  <Globe2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">9,000+</h3>
              <p className="text-gray-400">Domains Managed</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-gray-400">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-400">
                <p>
                  COLDICP was born from a simple observation: setting up and managing cold email infrastructure was unnecessarily complex and time-consuming for businesses.
                </p>
                <p>
                  What started as a solution to streamline our own email operations quickly evolved into a comprehensive platform that helps businesses of all sizes deploy and manage their cold email infrastructure with ease.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers worldwide, providing them with the tools and infrastructure they need to succeed in their outreach efforts.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 transform translate-y-8">
                  <Award className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Quality First</h3>
                  <p className="text-gray-400">Premium infrastructure that delivers results</p>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <Target className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Customer Focus</h3>
                  <p className="text-gray-400">Your success is our priority</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <Shield className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
                  <p className="text-gray-400">Rock-solid infrastructure you can trust</p>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 transform translate-y-8">
                  <Rocket className="w-8 h-8 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400">Always improving and evolving</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}

      {/* CTA Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Cold Email Infrastructure?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses who trust COLDICP for their cold email infrastructure needs.
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center justify-center mx-auto">
              <span>Get Started Today</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}