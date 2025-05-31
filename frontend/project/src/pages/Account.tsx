import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, CreditCard, Download, AlertTriangle, LogOut } from 'lucide-react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const tabs: TabProps[] = [
    { id: 'profile', label: 'Profile Details', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'data', label: 'Data & Privacy', icon: <Download className="h-5 w-5" /> }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Address
              </div>
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              readOnly
            />
            <button className="text-sm text-violet-400 mt-1 hover:text-violet-300">
              Change Email
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Phone Number
              </div>
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button className="text-sm text-violet-400 mt-1 hover:text-violet-300">
              Verify Phone
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-violet-500/20 flex items-center justify-center">
            <User className="h-12 w-12 text-violet-400" />
          </div>
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors">
            Change Picture
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#3A3F64] rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Available Credits</div>
            <div className="text-2xl font-semibold text-[#7FFFD4]">25</div>
          </div>
          <div className="bg-[#3A3F64] rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Projects Created</div>
            <div className="text-2xl font-semibold text-white">12</div>
          </div>
          <div className="bg-[#3A3F64] rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Member Since</div>
            <div className="text-2xl font-semibold text-white">Mar 2024</div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors">
          Update Profile
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Password Management</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
            <input
              type="password"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors">
            Change Password
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Two-Factor Authentication (2FA)</h3>
        <div className="bg-[#3A3F64] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-white font-medium mb-1">2FA Status</div>
              <div className="text-sm text-slate-400">
                Add an extra layer of security to your account
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={is2FAEnabled}
                onChange={() => setIs2FAEnabled(!is2FAEnabled)}
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
          </div>
          {is2FAEnabled ? (
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                View Recovery Codes
              </button>
              <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                Manage Authenticator App
              </button>
              <button className="w-full px-4 py-2 bg-red-900/50 hover:bg-red-900/70 rounded-lg text-red-400 transition-colors flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Disable 2FA
              </button>
            </div>
          ) : (
            <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors">
              Enable 2FA
            </button>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Active Sessions</h3>
        <div className="bg-[#3A3F64] rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div>
                <div className="text-white font-medium">Current Session</div>
                <div className="text-sm text-slate-400">MacBook Pro • San Francisco, US</div>
              </div>
              <div className="text-sm text-emerald-400">Active Now</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Other Sessions</div>
                <div className="text-sm text-slate-400">iPhone 13 • New York, US</div>
              </div>
              <button className="text-sm text-red-400 hover:text-red-300 flex items-center">
                <LogOut className="h-4 w-4 mr-1" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Current Plan & Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#3A3F64] rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Available Credits</div>
            <div className="text-3xl font-semibold text-[#7FFFD4] mb-4">25</div>
            <button className="w-full px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors">
              Add More Credits
            </button>
          </div>
          <div className="bg-[#3A3F64] rounded-lg p-6">
            <div className="text-sm text-slate-400 mb-2">Current Plan</div>
            <div className="text-xl font-semibold text-white mb-4">Pro Tier</div>
            <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Payment Methods</h3>
        <div className="bg-[#3A3F64] rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <div className="text-white">•••• 1234</div>
                  <div className="text-sm text-slate-400">Expires 12/25</div>
                </div>
              </div>
              <button className="text-sm text-violet-400 hover:text-violet-300">Edit</button>
            </div>
            <button className="w-full px-4 py-4 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
              Add New Payment Method
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 mb-6"> {/* Responsive header for this section */}
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <button className="text-sm text-violet-400 hover:text-violet-300">View All Transactions</button> {/* Slightly more descriptive button */}
        </div>
        <div className="bg-[#3A3F64] rounded-lg overflow-x-auto"> {/* Added overflow-x-auto */}
          <table className="w-full min-w-[500px] sm:min-w-full"> {/* Added min-width for scroll, responsive min-width */}
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Description</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="py-4 px-6 text-slate-300">Mar 15, 2024</td>
                <td className="py-4 px-6 text-slate-300">Credit Purchase - 50 Credits</td>
                <td className="py-4 px-6 text-right text-slate-300">$25.00</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-slate-300">Mar 10, 2024</td>
                <td className="py-4 px-6 text-slate-300">Credit Purchase - 150 Credits</td>
                <td className="py-4 px-6 text-right text-slate-300">$60.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#3A3F64] rounded-lg">
            <div>
              <div className="text-white font-medium">Video Generation Updates</div>
              <div className="text-sm text-slate-400">Get notified when your video is ready</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#3A3F64] rounded-lg">
            <div>
              <div className="text-white font-medium">Platform Updates</div>
              <div className="text-sm text-slate-400">Stay informed about new features</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#3A3F64] rounded-lg">
            <div>
              <div className="text-white font-medium">Billing Activity</div>
              <div className="text-sm text-slate-400">Receive payment confirmations</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-white mb-6">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="bg-[#3A3F64] rounded-lg p-6">
            <h4 className="text-white font-medium mb-2">Export Your Data</h4>
            <p className="text-slate-400 mb-4">
              Download a copy of your personal data, including your projects and account information
            </p>
            <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Request Data Export
            </button>
          </div>
          <div className="bg-[#3A3F64] rounded-lg p-6">
            <h4 className="text-white font-medium mb-2">Delete Account</h4>
            <p className="text-slate-400 mb-4">
              Permanently delete your account and all associated data
            </p>
            <button className="px-6 py-2 bg-red-900/50 hover:bg-red-900/70 rounded-lg text-red-400 transition-colors flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'billing':
        return renderBillingTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'data':
        return renderDataTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C2E] text-slate-200 p-4 md:p-8"> {/* Responsive padding and default text color */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Account Settings</h1> {/* Responsive title */}
      
      <div className="flex space-x-1 sm:space-x-2 mb-8 border-b border-slate-700/50 overflow-x-auto pb-px"> {/* Scrollable tabs, pb-px for border visibility */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${ /* flex-shrink-0, responsive padding, whitespace-nowrap */
              activeTab === tab.id
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.icon}
            <span className="ml-2 hidden sm:inline">{tab.label}</span> {/* Hide label on xs screens */}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Account;
