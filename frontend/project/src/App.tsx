import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu as MenuIcon } from 'lucide-react'; // Import Menu icon
import Sidebar from './components/Sidebar';
import NotificationCenter from './components/NotificationCenter';
import LandingPage from './pages/LandingPage';
import AdDesigner from './pages/AdDesigner';
import MyProjects from './pages/MyProjects';
import Templates from './pages/Templates';
import Billing from './pages/Billing';
import Support from './pages/Support';
import Account from './pages/Account';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Get user for Sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Use dummy user from AuthContext or default if null
  const displayName = user?.name || "User";
  const credits = 25; // Placeholder, ideally from user context or API

  return (
    <div className="flex min-h-screen bg-[#1A1C2E]">
      {/* Pass isOpen and toggle function to Sidebar */}
      <Sidebar 
        credits={credits} 
        userName={displayName} 
        isOpen={isMobileSidebarOpen} 
        onClose={toggleMobileSidebar} 
      />
      
      {/* Main content area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isMobileSidebarOpen ? 'md:ml-60' : 'md:ml-60'}`}>
        {/* Global Header */}
        <div className="bg-[#242842] border-b border-slate-700/50 p-4 flex items-center justify-between md:justify-end">
          {/* Hamburger Menu Button - visible on mobile */}
          <button 
            onClick={toggleMobileSidebar} 
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <NotificationCenter />
        </div>
        {children}
      </div>
      {/* Optional: Overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden" 
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<LandingPage />} /> {/* TODO: Create separate SignUpPage component */}

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/new-project" element={<AdDesigner />} />
                  <Route path="/my-projects" element={<MyProjects />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<Navigate to="/new-project" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
