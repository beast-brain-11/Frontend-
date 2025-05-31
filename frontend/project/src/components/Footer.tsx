import React from 'react';
import { Video, Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Video className="h-6 w-6 mr-2 text-violet-400" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
                AdCreatorAI
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Revolutionizing video ad creation with artificial intelligence. Create stunning ads in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Templates</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Examples</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-violet-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 AdCreatorAI. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <Mail className="h-4 w-4 mr-2" />
            <span>contact@adcreatorai.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;