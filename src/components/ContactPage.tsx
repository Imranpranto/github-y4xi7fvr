import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

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
            Get in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 mb-12">
            Have questions about our services? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#13002E] to-[#13002E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <a href="mailto:support@coldicp.com" className="text-gray-400 hover:text-white transition-colors">
                        support@coldicp.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-3">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Office</h3>
                      <p className="text-gray-400">
                        123 Business Street<br />
                        Suite 100<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg p-3">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
                    <p className="text-gray-400 mb-4">
                      Get instant help from our support team through live chat.
                    </p>
                    <button className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all">
                      <span>Start Chat</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}