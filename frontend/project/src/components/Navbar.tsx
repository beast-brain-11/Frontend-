import React, { useState, useEffect } from 'react';
import { Menu, X, Video, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-sm py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Video className="h-8 w-8 mr-2 text-violet-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
              AdCreatorAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-violet-300 transition-colors">
              Home
            </a>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-violet-300 transition-colors">
                Features <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2 px-3">
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-700 rounded-md">Video Templates</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-700 rounded-md">AI Voiceover</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-700 rounded-md">Editing Tools</a>
                </div>
              </div>
            </div>
            <a href="#" className="text-sm font-medium hover:text-violet-300 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium hover:text-violet-300 transition-colors">
              Examples
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-sm font-medium hover:text-violet-300 transition-colors">
              Log in
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 rounded-md transition-colors">
              Sign up
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-slate-800/90 backdrop-blur-sm rounded-lg">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-slate-700">
              Home
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-slate-700">
              Features
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-slate-700">
              Pricing
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-slate-700">
              Examples
            </a>
            <div className="border-t border-slate-700 my-2"></div>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-slate-700">
              Log in
            </a>
            <a href="#" className="block mx-4 mt-2 px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 rounded-md text-center">
              Sign up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;