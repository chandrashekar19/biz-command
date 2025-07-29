import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Bell, Check, X, AlertCircle, Info, CheckCircle, Users } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  category: 'system' | 'user' | 'security' | 'update';
}

export default function Notifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New User Registration',
      message: 'John Doe has registered as a new user and is pending approval.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      category: 'user'
    },
    {
      id: '2',
      title: 'System Update Complete',
      message: 'The system has been successfully updated to version 2.1.0.',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      category: 'system'
    },
    {
      id: '3',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      category: 'security'
    },
    {
      id: '4',
      title: 'Database Backup Failed',
      message: 'The scheduled database backup failed. Please check the system logs.',
      type: 'error',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      category: 'system'
    },
    {
      id: '5',
      title: 'New Feature Available',
      message: 'Advanced analytics dashboard is now available in the Analytics section.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      category: 'update'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'error':
        return <X className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-info" />;
    }
  };

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'security':
        return 'destructive';
      case 'user':
        return 'secondary';
      case 'system':
        return 'outline';
      default:
        return 'default';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-8 h-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest activities and alerts.</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            All your notifications in one place.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-border">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-muted/20 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            <Badge variant={getBadgeVariant(notification.category)} className="text-xs">
                              {notification.category}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(notification.timestamp, 'MMM dd, yyyy • h:mm a')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}