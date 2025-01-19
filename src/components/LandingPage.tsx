import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Star, Users, Globe2, Rocket, ChevronDown, Calculator, Mail, Shield, CheckCircle, AlertTriangle, TrendingUp, Settings, ArrowRight, Calendar } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
import PricingSection from './PricingSection';

import Logo from './Logo';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        styles: {
          branding: {
            brandColor: "#6366f1"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const tools = [
    { icon: <Calculator size={20} />, label: 'Cold Email Cost Calculator', id: 'calculator' },
    { icon: <TrendingUp size={20} />, label: 'Cold Email ROI Calculator', id: 'roi' },
    { icon: <Globe2 size={20} />, label: 'Cold Email Domain Generator', id: 'domain' },
    { icon: <Shield size={20} />, label: 'DMARC Generator for Cold Email', id: 'dmarc' },
    { icon: <Mail size={20} />, label: 'SPF Generator for Cold Email', id: 'spf-generator' },
    { icon: <CheckCircle size={20} />, label: 'SPF Checker for Cold Email', id: 'spf-checker' },
  ];

  const handleToolClick = (toolId: string) => {
    window.location.href = `/tools/${toolId}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13002E] via-[#240043] to-[#13002E] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#13002E]/90 backdrop-blur-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 border-b border-gray-800">
            {/* Logo */}
            <div className="flex-1">
              <Logo className="h-8 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
              <a href="#features" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Features
              </a>
              <a href="#pricing" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Pricing
              </a>
              <div className="relative">
                <button
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onMouseLeave={() => setIsToolsOpen(false)}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>Free Tools</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isToolsOpen && (
                  <div
                    onMouseEnter={() => setIsToolsOpen(true)}
                    onMouseLeave={() => setIsToolsOpen(false)}
                    className="absolute top-full left-0 w-64 py-2 mt-1 bg-[#13002E] border border-gray-800 rounded-lg shadow-xl"
                  >
                    {tools.map((tool) => (
                      <a
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        style={{ cursor: 'pointer' }}
                      >
                        {tool.icon}
                        <span>{tool.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/contact" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Contact
              </Link>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center justify-end flex-1 space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-gray-700">
                Log In
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
                Get Started Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#13002E] border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Pricing
              </a>
              <div className="space-y-1">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span>Free Tools</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isToolsOpen && (
                  <div className="pl-4 space-y-1">
                    {tools.map((tool) => (
                      <a
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        style={{ cursor: 'pointer' }}
                      >
                        {tool.icon}
                        <span>{tool.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Contact
              </Link>
              <div className="space-y-2 pt-2">
                <button className="w-full text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-gray-700">
                  Log In
                </button>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        {/* Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-white/3 to-transparent">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-white rounded-full ${
                  i % 3 === 0 ? 'animate-twinkle-1' :
                  i % 3 === 1 ? 'animate-twinkle-2' :
                  'animate-twinkle-3'
                }`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                }}
              />
            ))}
          </div>
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            Cold Email Infrastructure{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Setup in Minutes
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 mb-4">
            Get instant access to premium US-based Google Workspace accounts optimized for cold email,
            with automated warmup and maximum deliverability for your cold outreach campaigns.
          </p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Starting at just $2.50 per mailbox
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25">
            Start Sending → 
          </button>
          <p className="mt-4 text-sm text-gray-400">
            No credit card required • Setup in under 5 minutes
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-16">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-lg text-gray-300"><span className="font-semibold text-white">4.6/5</span> on Trustpilot</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-lg text-gray-300"><span className="font-semibold text-white">32000+</span> Cold Email Mailboxes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe2 className="w-5 h-5 text-green-400" />
              <span className="text-lg text-gray-300"><span className="font-semibold text-white">9000+</span> Cold Email Domains</span>
            </div>
          </div>

          {/* Compatible Platforms */}
          <div className="mt-16">
            <p className="text-indigo-400 font-medium tracking-wider mb-6">SEAMLESS INTEGRATION</p>
            <h2 className="text-2xl sm:text-4xl font-bold mb-8">
              One-Click Export to Your Favorite Cold Email Platform
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {['Reachinbox', 'Smartlead.ai', 'Instantly', 'QuickMail', 'Reply'].map((platform) => (
                <div
                  key={platform}
                  className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg rounded-lg px-6 py-3 hover:from-white/10 hover:to-white/20 transition-all cursor-pointer border border-white/10"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Free Tools Section */}
      <div className="relative py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-medium tracking-wider mb-6">FREE TOOLS</p>
            <h2 className="text-3xl sm:text-5xl font-bold mb-8">
              Powerful Tools for Better{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cold Email Results
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Access our suite of professional cold email tools designed to help you set up bulletproof infrastructure,
              maximize deliverability, and scale your outreach campaigns with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg p-6 border border-white/10 cursor-pointer hover:scale-[1.02] transition-all duration-300 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${
                    index % 3 === 0 ? 'from-blue-500 to-indigo-500' :
                    index % 3 === 1 ? 'from-indigo-500 to-purple-500' :
                    'from-purple-500 to-pink-500'
                  }`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tool.label}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {tool.id === 'calculator' && 'Calculate your total cold email infrastructure costs including ESP, sequencer, and infrastructure.'}
                    {tool.id === 'roi' && 'Measure and forecast the return on investment for your cold email campaigns.'}
                    {tool.id === 'domain' && 'Generate creative domain name variations for your cold email campaigns.'}
                    {tool.id === 'dmarc' && 'Create and validate DMARC records to protect your domain from email spoofing.'}
                    {tool.id === 'spf-generator' && 'Generate SPF records to authenticate your cold email sending sources.'}
                    {tool.id === 'spf-checker' && 'Validate your SPF records and identify potential issues.'}
                  </p>
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cold Email Pros
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of successful cold email professionals who trust COLDICP to power their outreach campaigns with premium infrastructure and deliverability tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Michael Anderson',
                role: 'Growth Strategy Lead',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'For a seamless email outbound, setting up infra is a crucial thing. Earlier I used to do it manually or hire VAs but was always problematic. COLDICP solved the issue within minutes for Gsuite mailboxes in 3 easy steps.',
                gradient: 'from-blue-500/10 to-indigo-500/10',
                borderGradient: 'from-blue-200/50 to-indigo-200/50'
              },
              {
                name: 'Thomas Blake',
                role: 'Automation Specialist',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'Today I would like to give a shout-out to COLDICP. It\'s a platform that will help you purchase a domain, set up DNS and emails on G-Workspace. I setup 5 emails in less than 4 minutes!',
                gradient: 'from-emerald-500/10 to-green-500/10',
                borderGradient: 'from-emerald-200/50 to-green-200/50'
              },
              {
                name: 'Aaron Mitchell',
                role: 'Startup Founder',
                image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'It\'s fair to say COLDICP\'s deliverability is pretty good. The automated email setup is awesome, and our deliverability has improved a lot. Highly recommend!',
                gradient: 'from-purple-500/10 to-pink-500/10',
                borderGradient: 'from-purple-200/50 to-pink-200/50'
              },
              {
                name: 'Christopher Rodriguez',
                role: 'Marketing Director',
                image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'COLDICP made setting up 750 Google Workspace mailboxes super easy. Our emails are getting delivered better than ever. Worth every penny!',
                gradient: 'from-orange-500/10 to-amber-500/10',
                borderGradient: 'from-orange-200/50 to-amber-200/50'
              },
              {
                name: 'Sarah Thompson',
                role: 'Growth Strategist',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'COLDICP saved us so much time. The automated email setup is awesome, and our deliverability has improved a lot. Highly recommend!',
                gradient: 'from-rose-500/10 to-pink-500/10',
                borderGradient: 'from-rose-200/50 to-pink-200/50'
              },
              {
                name: 'Emily Parker',
                role: 'Email Marketing Director',
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                testimonial: 'The infrastructure setup process was a game-changer for our agency. We went from spending days configuring email servers to having everything ready in minutes. The deliverability rates are exceptional!',
                gradient: 'from-cyan-500/10 to-blue-500/10',
                borderGradient: 'from-cyan-200/50 to-blue-200/50'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg p-6 border border-white/10 hover:scale-[1.02] transition-all duration-300 ${
                  index > 2 ? 'lg:col-span-3/2' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 group-hover:text-white transition-colors">
                    "{testimonial.testimonial}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about our cold email infrastructure services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is COLDICP.email?",
                answer: "COLDICP.email is a specialized platform that provides instant access to premium US-based Google Workspace accounts optimized for cold email campaigns. We automate the entire infrastructure setup process, including domain configuration, DNS records, and authentication setup."
              },
              {
                question: "Why choose COLDICP.email?",
                answer: "We offer a streamlined, automated setup process that saves you hours of manual configuration. Our platform provides instant access to premium Google Workspace accounts, handles all technical configurations, and ensures your infrastructure is properly set up for cold email campaigns from day one."
              },
              {
                question: "Which email providers do you currently support?",
                answer: "Currently, we specialize in Google Workspace accounts. Our platform is optimized to provide premium US-based Google Workspace mailboxes with all necessary configurations for cold email campaigns."
              },
              {
                question: "How does pricing work?",
                answer: "Our pricing is straightforward and transparent, starting at $2.50 per mailbox. We offer different plans based on the number of mailboxes you need, with discounts for larger volumes. All plans include full infrastructure setup and technical support."
              },
              {
                question: "What's your refund policy?",
                answer: "We don't offer refunds, but you can cancel your subscription at any time. To cancel, please inform us at least 4 days before your subscription period ends. Your service will remain active until the end of the current billing period."
              },
              {
                question: "What's included in the infrastructure setup?",
                answer: "Our setup includes premium US-based Google Workspace accounts, complete DNS configuration (SPF, DKIM, DMARC), and integration support with popular cold email platforms. We handle all technical aspects to ensure your infrastructure is properly configured for cold email campaigns."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg p-6 border border-white/10 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Still have questions? We're here to help!</p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25">
              Contact Support →
            </button>
          </div>
        </div>
      </div>

      {/* Meeting Booking Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Schedule a{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 mb-12">
              Book a call with our team to discuss your cold email infrastructure needs
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-1">
            <div className="h-[600px] rounded-lg overflow-hidden bg-white">
              <Cal
                namespace="30min"
                calLink="https://cal.com/coldicp/30min"
                style={{width:"100%",height:"100%",overflow:"scroll"}}
                config={{"layout":"month_view"}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact content here */}
        </div>
      </div>
    </div>
  );
}