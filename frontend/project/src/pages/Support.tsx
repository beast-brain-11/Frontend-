import React, { useState } from 'react';
import { MessageSquare, Mail, ChevronDown, Search, ExternalLink } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const Support: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app this would come from an API
  const faqs: FAQ[] = [
    {
      question: 'How do credits work?',
      answer: 'Credits are used to generate video ads. Each video generation costs a specific number of credits depending on its length and complexity. You can purchase credit packages from the billing page.'
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support all major video formats including MP4, MOV, and AVI. Videos can be exported in various dimensions optimized for different social media platforms.'
    },
    {
      question: 'How can I improve my ad\'s quality?',
      answer: 'To improve your ad quality, provide detailed descriptions in your prompts, use high-quality assets, and take advantage of our AI agent\'s suggestions. You can also refer to our templates for inspiration.'
    }
  ];

  const toggleFAQ = (question: string) => {
    setSelectedFAQ(selectedFAQ === question ? null : question);
  };

  return (
    <div className="min-h-screen bg-[#1A1C2E] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
        <p className="text-slate-400">We're here to help you get the most out of our platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Live Chat Option */}
        <div className="bg-[#242842] rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-violet-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">Live Chat Support</h2>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                <span className="text-sm text-slate-400">Agents Online</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 mb-6">
            Get immediate assistance from our support team. Available Monday to Friday, 9 AM - 6 PM UTC.
          </p>
          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Start Chat
          </button>
        </div>

        {/* Email Support Option */}
        <div className="bg-[#242842] rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-violet-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">Email Support</h2>
              <div className="text-sm text-slate-400 mt-1">Response within 24 hours</div>
            </div>
          </div>
          <p className="text-slate-400 mb-6">
            Send us a detailed message and we'll get back to you with a solution within one business day.
          </p>
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
            <Mail className="h-5 w-5 mr-2" />
            Contact via Email
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#242842] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#1A1C2E] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="border-b border-slate-700/50 last:border-0 pb-4 last:pb-0"
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleFAQ(faq.question)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    selectedFAQ === faq.question ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {selectedFAQ === faq.question && (
                <div className="mt-4 text-slate-400 pl-4 border-l-2 border-violet-500">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="#"
          className="flex items-center justify-between p-4 bg-[#242842] rounded-lg hover:bg-slate-700/80 transition-colors group"
        >
          <span className="text-white">User Guides</span>
          <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
        </a>
        <a
          href="#"
          className="flex items-center justify-between p-4 bg-[#242842] rounded-lg hover:bg-slate-700/80 transition-colors group"
        >
          <span className="text-white">Video Tutorials</span>
          <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
        </a>
        <a
          href="#"
          className="flex items-center justify-between p-4 bg-[#242842] rounded-lg hover:bg-slate-700/80 transition-colors group"
        >
          <span className="text-white">Community Forum</span>
          <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default Support;