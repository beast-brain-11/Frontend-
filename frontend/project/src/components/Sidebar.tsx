import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Plus, FolderOpen, Layout, CreditCard, HelpCircle, User, LogOut, X as XIcon } from 'lucide-react'; // Added XIcon
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  credits: number;
  userName: string;
  userAvatar?: string;
  isOpen: boolean; // Added isOpen
  onClose: () => void; // Added onClose
}

const Sidebar: React.FC<SidebarProps> = ({ credits, userName, userAvatar, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    onClose(); // Close sidebar on logout if open
    navigate('/');
  };

  const sidebarClasses = `
    fixed top-0 left-0 w-60 h-screen bg-[#242842] flex flex-col 
    border-r border-slate-700/50 z-50 
    transform transition-transform duration-300 ease-in-out
    md:translate-x-0 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:static md:h-auto md:z-auto md:transform-none md:border-r md:flex md:w-60
  `;
  // Note: md:static and md:h-auto are to ensure it fits within the flex layout on desktop
  // md:flex is to ensure it's visible on desktop.
  // The -translate-x-full and translate-x-0 are for mobile animation.
  // md:translate-x-0 ensures it's visible on desktop.
  // The `fixed` and `md:static` might need refinement. Let's try this first.
  // A simpler approach for desktop might be: `hidden md:flex md:fixed md:top-0 md:left-0 ...`
  // and for mobile: `fixed top-0 left-0 ... ${isOpen ? 'flex' : 'hidden'}`
  // Let's refine the classes for clarity:

  const refinedSidebarClasses = `
    bg-[#242842] flex flex-col border-r border-slate-700/50
    h-screen w-60 
    fixed md:sticky top-0 left-0 z-50 md:z-30 
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 
  `;
  // md:sticky will make it scroll with content if parent allows, or stay fixed if parent is viewport height.
  // `App.tsx` has `min-h-screen` on the main flex container, so `md:sticky` should work like a fixed sidebar.

  return (
    <div className={refinedSidebarClasses}>
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-violet-400" />
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300">
            AdCreatorAI
          </span>
        </Link>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white" aria-label="Close sidebar">
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto"> {/* Added overflow-y-auto for scrollable content */}
        <ul className="space-y-2">
          <li>
            <Link
              to="/new-project"
              onClick={onClose} // Close sidebar on navigation for mobile
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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

      {/* Footer section of sidebar */}
      <div className="p-4 mt-auto border-t border-slate-700/50"> {/* Added mt-auto to push to bottom */}
        <div className="mb-4 px-4 py-2 bg-slate-700/20 rounded-lg">
          <span className="text-sm text-slate-400">Credits Left</span>
          <div className="text-lg font-semibold text-[#7FFFD4]">{credits}</div>
        </div>

        <div className="space-y-2">
          <Link
            to="/account"
            onClick={onClose}
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
            onClick={handleLogout} // handleLogout already calls onClose
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
