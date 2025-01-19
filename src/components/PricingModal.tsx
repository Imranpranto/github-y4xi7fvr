import React from 'react';
import { X } from 'lucide-react';
import PricingSection from './PricingSection';
import { useEffect, useRef } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div ref={modalRef} className="relative w-full max-w-7xl bg-[#13002E] rounded-2xl shadow-xl overflow-hidden text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="max-h-[90vh] overflow-y-auto [&_*]:text-white [&_p]:text-gray-300 [&_button]:text-white">
            <PricingSection />
          </div>
        </div>
      </div>
    </div>
  );
}