import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/new-project');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-violet-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <Video className="h-8 w-8 mr-2 text-violet-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
              AdCreatorAI
            </span>
          </Link>
        </div>

        <div className="bg-[#242842] rounded-xl shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                isLogin ? 'text-white' : 'text-slate-400'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                !isLogin ? 'text-white' : 'text-slate-400'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;