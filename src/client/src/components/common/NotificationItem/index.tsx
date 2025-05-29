import TextHeading from '@/components/ui/text';
import { INotification } from '@/interfaces/notification';
import notificationService from '@/services/notification.service';
import { utils_TimeAgo } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import NotificationItem_More from './NotificationItem_More';
import { cn } from '@/lib/utils';
import { util_get_locale_label } from '@/utils/common';
import { NOTIFICATION_TYPE } from '@/constants/object';
interface NotificationItemProps {
  item?: INotification;
  className?: string;
}

export default function NotificationItem({ item, className }: NotificationItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutationRead = useMutation({
    mutationFn: () => {
      return notificationService.read(item?.id || '', true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'user'],
        exact: false,
      });
    },
  });

  const handleNotificationClick = () => {
    if (item?.link) {
      router.push(item.link);
    }
    mutationRead.mutate();
  };

  return (
    <div
      className={cn(
        'border bg-gradient-to-r py-4 px-3 rounded-lg cursor-pointer transition-colors flex items-start gap-2 ',
        !item?.isRead ? 'border-l-4 border-green-500 from-green-50 to-blue-50 dark:from-green-500/10 dark:to-green-500/10' : '',
        className,
      )}
    >
      <div className="flex-1 flex flex-row gap-2" onClick={handleNotificationClick}>
        <div className="p-2 bg-color-2/10 rounded-full w-10 h-10 flex items-center justify-center">
          🏫
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between gap-2">
            <TextHeading lineClamp={1}>
              {util_get_locale_label(NOTIFICATION_TYPE, item?.type || '')}
            </TextHeading>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {utils_TimeAgo(item?.createdAt || '')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3">{item?.message}</p>
        </div>
      </div>
      <div className="flex items-center my-auto gap-2 ml-auto">
        {item && <NotificationItem_More item={item} />}
      </div>
    </div>
  );
}
