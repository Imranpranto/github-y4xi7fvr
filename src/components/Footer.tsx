import React from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#13002E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo className="h-8 w-auto brightness-200" />
            <p className="text-gray-400 text-sm">
              Premium email infrastructure solutions for businesses. Get instant access to US-based Google Workspace & Microsoft 365 accounts.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '#services' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight size={16} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Free Tools</h3>
            <ul className="space-y-3">
              {[
                { label: 'Cost Calculator', href: '/tools/calculator' },
                { label: 'ROI Calculator', href: '/tools/roi' },
                { label: 'Domain Generator', href: '/tools/domain' },
                { label: 'DMARC Generator', href: '/tools/dmarc' },
                { label: 'SPF Generator', href: '/tools/spf-generator' },
                { label: 'SPF Checker', href: '/tools/spf-checker' },
              ].map((tool) => (
                <li key={tool.label}>
                  <Link
                    to={tool.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight size={16} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@coldicp.com" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail size={16} className="mr-2" />
                  support@coldicp.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Phone size={16} className="mr-2" />
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">
                  123 Business Street
                  <br />
                  Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} COLDICP. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}