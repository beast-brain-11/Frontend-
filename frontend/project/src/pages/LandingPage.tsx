import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Video, Play, CheckCircle, ArrowUpRight, Menu as MenuIcon, X as XIcon } from 'lucide-react'; // Added MenuIcon, XIcon
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleOpenAuthModal = (tab: 'signin' | 'signup') => {
    setIsMobileMenuOpen(false); // Close mobile menu if opening auth modal
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsAuthModalOpen(false);
    // TODO: Implement sign up modal or navigation
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-violet-950 text-slate-200"> {/* Added default text color */}
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-slate-900/50 backdrop-blur-md py-4 border-b border-slate-800/50"> {/* Added background and border for better visibility */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center"> {/* Made logo a Link */}
              <Video className="h-8 w-8 mr-2 text-violet-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
                AdCreatorAI
              </span>
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6"> {/* Reduced space-x-8 to space-x-6 */}
              <a href="#demo" className="text-slate-300 hover:text-violet-300 transition-colors">Demo</a>
              <a href="#why-choose-us" className="text-slate-300 hover:text-violet-300 transition-colors">Why Choose Us</a>
              <a href="#contact" className="text-slate-300 hover:text-violet-300 transition-colors">Contact Us</a>
              <button
                onClick={() => handleOpenAuthModal('signin')}
                className="text-slate-300 hover:text-violet-300 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleOpenAuthModal('signup')}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors" // Adjusted padding & color
              >
                Get Started
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Overlay/Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm shadow-xl border-t border-slate-800/50">
            <div className="flex flex-col items-center space-y-4 px-4 py-8">
              <a href="#demo" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-lg hover:text-violet-300 transition-colors w-full text-center">Demo</a>
              <a href="#why-choose-us" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-lg hover:text-violet-300 transition-colors w-full text-center">Why Choose Us</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-lg hover:text-violet-300 transition-colors w-full text-center">Contact Us</a>
              <button
                onClick={() => { handleOpenAuthModal('signin'); setIsMobileMenuOpen(false); }}
                className="block py-2 text-lg hover:text-violet-300 transition-colors w-full text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => { handleOpenAuthModal('signup'); setIsMobileMenuOpen(false); }}
                className="mt-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors w-full text-center text-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6A5ACD]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
              Create Professional Video Ads in Minutes with AI
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Transform your ideas into stunning video advertisements effortlessly. Our AI-powered platform helps you create engaging content that converts, saving you time and resources.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenAuthModal('signup')}
                className="px-8 py-4 bg-[#6A5ACD] hover:bg-[#5A4ABD] rounded-lg text-white font-medium transition-all duration-300 flex items-center group"
              >
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#demo"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-white font-medium transition-all duration-300 flex items-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-800 mb-8">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg" 
                alt="Platform Demo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                See How Easy It Is
              </h2>
              <p className="text-slate-300 mb-8">
                Watch our 60-second demo to see how AdCreatorAI transforms your ideas into professional video ads.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-[#6A5ACD] hover:bg-[#5A4ABD] rounded-lg text-white font-medium transition-colors"
              >
                Try It Now
                <ArrowUpRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose AdCreatorAI?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI-powered platform offers everything you need to create stunning video advertisements that convert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "AI-Powered Creation",
                description: "Our advanced AI understands your brand and creates tailored video content that resonates with your audience."
              },
              {
                title: "Lightning Fast",
                description: "Generate professional video ads in minutes, not days. Save time and resources without compromising quality."
              },
              {
                title: "Cost-Effective",
                description: "Reduce production costs by up to 80% compared to traditional video creation methods."
              },
              {
                title: "Brand Consistency",
                description: "Maintain your brand identity with customizable templates and style preferences."
              },
              {
                title: "Multiple Formats",
                description: "Create ads optimized for various platforms - social media, websites, TV, and more."
              },
              {
                title: "24/7 Support",
                description: "Get help whenever you need it with our round-the-clock customer support."
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-[#6A5ACD]/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-[#6A5ACD]" />
                  <h3 className="text-xl font-semibold text-white ml-3">{benefit.title}</h3>
                </div>
                <p className="text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-slate-300">
                Have questions? We're here to help you create amazing video ads.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#6A5ACD] hover:bg-[#5A4ABD] rounded-lg text-white font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Video className="h-6 w-6 mr-2 text-violet-400" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
                  AdCreatorAI
                </span>
              </div>
              <p className="text-slate-400 mb-4">
                Creating professional video ads has never been easier.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>© 2024 AdCreatorAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
