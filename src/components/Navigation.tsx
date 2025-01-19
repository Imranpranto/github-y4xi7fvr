import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Calculator, Shield, CheckCircle, AlertTriangle, UserPlus } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Calculator size={20} />, label: 'Cost Calculator', id: 'calculator', path: '/tools/calculator' },
  { icon: <Calculator size={20} />, label: 'ROI Calculator', id: 'roi', path: '/tools/roi' },
  { icon: <Shield size={20} />, label: 'DMARC Generator', id: 'dmarc', path: '/tools/dmarc' },
  { icon: <Mail size={20} />, label: 'SPF Generator', id: 'spf-generator', path: '/tools/spf-generator' },
  { icon: <CheckCircle size={20} />, label: 'SPF Checker', id: 'spf-checker', path: '/tools/spf-checker' },
  { icon: <UserPlus size={20} />, label: 'Domain Generator', id: 'domain', path: '/tools/domain' },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveSection(activeItem.id);
    }
  }, [location]);
  return (
    <nav className="bg-white shadow-lg rounded-lg p-4 sticky top-4 min-h-[calc(100vh-5rem)]">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}