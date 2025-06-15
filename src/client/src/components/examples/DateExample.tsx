'use client';

import { useDateUtils } from '@/hooks/useDateUtils';
import { useLocale } from 'next-intl';

export default function DateExample() {
  const locale = useLocale();
  const dateUtils = useDateUtils();
  
  const now = new Date();
  const futureDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
  const pastDate = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Date Utils Example - {locale}</h2>
      
      <div className="space-y-2">
        <p><strong>Current Date (DD/MM/YYYY):</strong> {dateUtils.dateToDDMMYYYY(now)}</p>
        <p><strong>Current Date (DD Month):</strong> {dateUtils.dateToDDMonth(now)}</p>
        <p><strong>Time Ago (3 hours ago):</strong> {dateUtils.timeAgo(pastDate)}</p>
        <p><strong>Time Remaining (2 days):</strong> {dateUtils.timeRemaining(futureDate.toISOString())}</p>
        <p><strong>Progress (50%):</strong> {dateUtils.calculateProgress(pastDate.toISOString(), futureDate.toISOString())}%</p>
      </div>
    </div>
  );
} 