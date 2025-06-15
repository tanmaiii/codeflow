import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconActivity } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface RecentActivityProps {
  variant: 'student' | 'teacher';
}

export default function RecentActivity({ variant }: RecentActivityProps) {
  const t = useTranslations('dashboard');
  const activityColor = variant === 'teacher' ? 'text-indigo-600' : 'text-blue-600';
  const bgColor = variant === 'teacher' ? 'bg-indigo-50 dark:bg-indigo-950/20' : 'bg-blue-50 dark:bg-blue-950/20';
  const dotColor = variant === 'teacher' ? 'bg-indigo-600' : 'bg-blue-600';

  const welcomeMessage = variant === 'teacher' 
    ? t('welcomeTeacher')
    : t('welcomeStudent');
    
  const actionMessage = variant === 'teacher'
    ? t('startTeacherAction')
    : t('startStudentAction');

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <IconActivity className={`w-5 h-5 mr-2 ${activityColor}`} />
          {t('recentActivity')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`flex items-center space-x-4 p-4 rounded-lg ${bgColor}`}>
            <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
            <div className="flex-1">
              <p className="font-medium">{welcomeMessage}</p>
              <p className="text-sm text-muted-foreground">
                {actionMessage}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{t('today')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 