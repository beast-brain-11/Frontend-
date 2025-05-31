import React, { useState } from 'react';
import { Bell, VideoIcon, DollarSign, Lightbulb, AlertCircle, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'video' | 'billing' | 'template' | 'alert';
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'video',
      message: 'Your ad "Summer Promo" has finished generating!',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      read: false,
      link: '/my-projects'
    },
    {
      id: '2',
      type: 'template',
      message: 'New "Food & Beverage" example added',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      link: '/templates'
    },
    {
      id: '3',
      type: 'alert',
      message: 'Your credits are low (15 remaining)',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      link: '/billing'
    },
    {
      id: '4',
      type: 'billing',
      message: 'Payment of $20 for 100 credits successful',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'video':
        return <VideoIcon className="h-5 w-5 text-violet-400" />;
      case 'billing':
        return <DollarSign className="h-5 w-5 text-emerald-400" />;
      case 'template':
        return <Lightbulb className="h-5 w-5 text-amber-400" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#7FFFD4] rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-[#242842] rounded-xl shadow-lg border border-slate-700/50 z-50">
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear all
                  </button>
                </div>
              </div>
              {unreadCount > 0 && (
                <div className="text-sm text-slate-400">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-700/50">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-700/20 transition-colors ${
                        notification.read ? '' : 'bg-violet-500/5'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="text-sm text-white">
                            {notification.message}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-violet-400 rounded-full mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  No notifications
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;