import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#1A1C2E]">
      <Sidebar credits={25} userName="John Doe" />
      <div className="flex-1 ml-60">
        {/* Global Header with Notification Center */}
        <div className="bg-[#242842] border-b border-slate-700/50 p-4 flex justify-end">
          <NotificationCenter />
        </div>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
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