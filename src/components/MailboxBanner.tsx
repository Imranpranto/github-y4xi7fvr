import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MailboxBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-1 my-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="relative rounded-md bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-lg p-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Premium Google Workspace Mailboxes
              </h3>
              <p className="text-white/80">
                Starting at just <span className="font-bold">$2.50</span> per mailbox
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Get Mailbox</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}