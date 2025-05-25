'use client';
import socketService from '@/services/socket.service';
import React, { useEffect, useState } from 'react';
import { Notification } from '@/interfaces/notification';
import { useUserStore } from '@/stores/user_store';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    // Kết nối socket khi component mount
    socketService.connect(user.id);

    // Đăng ký handler cho thông báo mới
    const unsubscribe = socketService.onNotification((notification: unknown) => {
      setNotifications(prev => [notification as Notification, ...prev]);
      if ((notification as Notification).isRead === false) {
        setUnreadCount(prev => prev + 1);
      }
    });

    // Cleanup khi component unmount
    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [user]);

  const handleNotificationClick = (notification: Notification) => {
    // Đánh dấu thông báo đã đọc
    if (!notification.isRead) {
      setUnreadCount(prev => prev - 1);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }

    // Chuyển hướng đến link của thông báo
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  const notificationContent = (
    <ScrollArea className="w-[300px] h-[400px]">
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              notification.isRead ? 'hover:bg-accent' : 'bg-accent'
            }`}
          >
            <div className="space-y-1">
              <p className="font-semibold">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(notification?.createdAt ?? '').toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>  
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Thông báo</h4>
        </div>
        {notificationContent}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter; 