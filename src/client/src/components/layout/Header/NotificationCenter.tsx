'use client';

import { Bell } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import NotificationItem from '@/components/common/NotificationItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { paths } from '@/data/path';
import useQ_Notification_GetAllByUser from '@/hooks/query-hooks/Notification/useQ_Notification_GetAllByUser';
import { INotification } from '@/interfaces/notification';
import socketService from '@/services/socket.service';
import { useUserStore } from '@/stores/user_store';
import { util_format_notification_count } from '@/utils/common';

const NOTIFICATION_LIMIT = 10;
const UNREAD_LIMIT = 100000;
const DISPLAY_LIMIT = 4;

const NotificationCenter: React.FC = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('notification');

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const { data: notificationsData } = useQ_Notification_GetAllByUser({
    params: { page: 1, limit: NOTIFICATION_LIMIT },
  });

  const { data: unreadNotificationsData } = useQ_Notification_GetAllByUser({
    params: { page: 1, limit: UNREAD_LIMIT, isRead: false },
  });

  useEffect(() => {
    if (!notificationsData) return;
    setNotifications(notificationsData.data);
  }, [notificationsData]);

  useEffect(() => {
    if (!unreadNotificationsData) return;
    setUnreadCount(unreadNotificationsData.data.length);
  }, [unreadNotificationsData]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!user) return;

    socketService.connect(user.id);
    const unsubscribe = socketService.onNotification((notification: unknown) => {
      const newNotification = notification as INotification;
      setNotifications(prev => [newNotification, ...prev]);
      if (!newNotification.isRead) {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [user]);

  const handleSeeAll = () => router.push(paths.NOTIFICATION);

  const renderNotificationContent = () => (
    <ScrollArea className="min-h-[300px] rounded-md border">
      <div className="space-y-2 p-2">
        {notifications.slice(0, DISPLAY_LIMIT).map(notification => (
          <NotificationItem 
            key={notification.id} 
            item={notification} 
            className="p-2" 
          />
        ))}
        {notifications.length > DISPLAY_LIMIT && (
          <div className="flex justify-center mt-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleSeeAll}
            >
              {t('seeAll')}
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );

  const renderUnreadBadge = () => (
    unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
        {util_format_notification_count(unreadCount)}
      </span>
    )
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setUnreadCount(0)} className="relative">
          <Bell className="h-5 w-5" />
          {renderUnreadBadge()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-0 bg-background shadow-md rounded-sm" align="end">
        <div className="flex items-center justify-between py-2 px-4 border-b">
          <h4 className="font-medium">{t('notification')}</h4>
          <Button variant="text" className="p-2" onClick={handleSeeAll}>
            {t('seeAll')}
          </Button>
        </div>
        <div>{renderNotificationContent()}</div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
