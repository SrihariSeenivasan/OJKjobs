import { AlertCircle, Bell, Briefcase, Check, CheckCheck, Clock, Filter, Star, Trash2, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface NotificationItem {
  id: string;
  message: string;
  read?: boolean;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'application' | 'message' | 'interview' | 'system' | 'promotion';
  actionUrl?: string;
}

interface NotificationProps {
  type: 'jobseeker' | 'employer';
  notifications: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  notifications: initialNotifications,
  onNotificationClick 
}) => {
  const [localNotifications, setLocalNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample notifications for demonstration
  useEffect(() => {
    if (initialNotifications.length === 0) {
      const sampleNotifications: NotificationItem[] = type === 'employer' ? [
        {
          id: '1',
          message: 'New application received for Senior Developer position',
          read: false,
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          priority: 'high',
          category: 'application',
        },
        {
          id: '2',
          message: 'Interview scheduled with John Doe for tomorrow at 2 PM',
          read: false,
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          priority: 'high',
          category: 'interview',
        },
        {
          id: '3',
          message: 'Your job posting "React Developer" expires in 3 days',
          read: true,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          priority: 'medium',
          category: 'system',
        },
        {
          id: '4',
          message: 'New message from candidate Sarah Smith',
          read: false,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          priority: 'medium',
          category: 'message',
        },
        {
          id: '5',
          message: 'Upgrade to Premium to access advanced analytics',
          read: true,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          priority: 'low',
          category: 'promotion',
        }
      ] : [
        {
          id: '1',
          message: 'Your application for Senior Developer at TechCorp was viewed',
          read: false,
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          priority: 'medium',
          category: 'application',
        },
        {
          id: '2',
          message: 'Interview invitation from ABC Company - Please respond',
          read: false,
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          priority: 'high',
          category: 'interview',
        },
        {
          id: '3',
          message: 'New message from HR at XYZ Corp',
          read: true,
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          priority: 'medium',
          category: 'message',
        },
        {
          id: '4',
          message: 'Complete your profile to increase visibility by 60%',
          read: false,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          priority: 'low',
          category: 'system',
        }
      ];
      setLocalNotifications(sampleNotifications);
    }
  }, [initialNotifications, type]);

  const title = type === 'employer' ? 'Employer Notifications' : 'Job Seeker Notifications';
  const unreadCount = localNotifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLocalNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAsUnread = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLocalNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLocalNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id, { stopPropagation: () => {} } as React.MouseEvent);
    }
    onNotificationClick?.(notification);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'application': return <Briefcase className="w-4 h-4" />;
      case 'message': return <User className="w-4 h-4" />;
      case 'interview': return <Clock className="w-4 h-4" />;
      case 'system': return <AlertCircle className="w-4 h-4" />;
      case 'promotion': return <Star className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredNotifications = localNotifications
    .filter(notif => {
      if (filter === 'unread') return !notif.read;
      if (filter === 'read') return notif.read;
      return true;
    })
    .filter(notif => {
      if (categoryFilter === 'all') return true;
      return notif.category === categoryFilter;
    })
    .sort((a, b) => {
      // Sort by priority first (high to low), then by timestamp (newest first)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  const categories = ['all', ...Array.from(new Set(localNotifications.map(n => n.category)))];

  return (
    <div className={`bg-white rounded-lg shadow-lg border ${isExpanded ? 'w-96' : 'w-80'} max-h-96 overflow-hidden z-20`}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Filters - Show when expanded */}
      {isExpanded && (
        <div className="px-4 py-2 border-b bg-gray-25 space-y-2">
          <div className="flex space-x-2">
            {(['all', 'unread', 'read'] as Array<'all' | 'unread' | 'read'>).map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === filterType
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category as string)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  categoryFilter === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {localNotifications.length > 0 && (
        <div className="px-4 py-2 border-b bg-gray-25 flex justify-between text-xs">
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            disabled={unreadCount === 0}
          >
            Mark all read
          </button>
          <button
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="max-h-64 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="text-gray-500">
                        {getCategoryIcon(notification.category)}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        {notification.category}
                      </span>
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {notification.read ? (
                      <button
                        onClick={(e) => handleMarkAsUnread(notification.id, e)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Mark as unread"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCheck className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDelete(notification.id, e)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with stats */}
      {localNotifications.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500 text-center">
          {filteredNotifications.length} of {localNotifications.length} notifications
          {unreadCount > 0 && ` • ${unreadCount} unread`}
        </div>
      )}
    </div>
  );
};

export default Notification;