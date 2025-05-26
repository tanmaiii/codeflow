'use client';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import Notification_All from './Notification_All';
import Notification_NotRead from './Notification_NotRead';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import notificationService from '@/services/notification.service';
import { toast } from 'sonner';

export default function Notification() {
  const t = useTranslations('notification');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();

  const mutationReadAll = useMutation({
    mutationFn: () => notificationService.readAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'user'] });
      toast.success(tCommon('updateSuccess'));
    },
  });

  return (
    <div className="flex flex-col gap-4 pt-4 justify-center items-center mx-auto bg-background-2">
      <Card className="w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-8 min-h-[80vh]">
        <TitleHeader
          title={t('notification')}
          onBack
          className="pb-0"
          rightContent={
            <Button variant="text" onClick={() => mutationReadAll.mutate()}>
              {t('markAllAsRead')}
            </Button>
          }
        />
        <div className="flex flex-col gap-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">{t('all')}</TabsTrigger>
              <TabsTrigger value="unread">{t('unread')}</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="flex flex-col gap-2">
              <Notification_All />
            </TabsContent>
            <TabsContent value="unread" className="flex flex-col gap-2">
              <Notification_NotRead />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
