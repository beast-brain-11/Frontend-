import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Plus, FolderOpen, Layout, CreditCard, HelpCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  credits: number;
  userName: string;
  userAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ credits, userName, userAvatar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 w-60 h-screen bg-[#242842] flex flex-col border-r border-slate-700/50 z-50">
      <div className="p-6 border-b border-slate-700/50">
        <Link to="/\" className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-violet-400" />
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
            AdCreatorAI
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/new-project"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                isActive('/new-project')
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-700/30'
              } transition-colors`}
            >
              <Plus className="h-5 w-5" />
              <span>New Ad</span>
            </Link>
          </li>
          <li>
            <Link
              to="/my-projects"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                isActive('/my-projects')
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-700/30'
              } transition-colors`}
            >
              <FolderOpen className="h-5 w-5" />
              <span>My Projects</span>
            </Link>
          </li>
          <li>
            <Link
              to="/templates"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                isActive('/templates')
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-700/30'
              } transition-colors`}
            >
              <Layout className="h-5 w-5" />
              <span>Examples & Templates</span>
            </Link>
          </li>
          <li>
            <Link
              to="/billing"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                isActive('/billing')
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-700/30'
              } transition-colors`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Billing</span>
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                isActive('/support')
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-700/30'
              } transition-colors`}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="mb-4 px-4 py-2 bg-slate-700/20 rounded-lg">
          <span className="text-sm text-slate-400">Credits Left</span>
          <div className="text-lg font-semibold text-[#7FFFD4]">{credits}</div>
        </div>

        <div className="space-y-2">
          <Link
            to="/account"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex-shrink-0">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-violet-400" />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-slate-200">{userName}</div>
              <div className="text-xs text-slate-400">View Profile</div>
            </div>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/30 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;