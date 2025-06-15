'use client';

import { useDateUtils } from '@/hooks/useDateUtils';
import { useLocale, useTranslations } from 'next-intl';

export default function KhmerExample() {
  const locale = useLocale();
  const dateUtils = useDateUtils();
  const t = useTranslations();
  
  const now = new Date();
  const futureDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
  const pastDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

  if (locale !== 'cp') {
    return (
      <div className="p-4">
        <p>This component is only for Khmer locale (cp). Current locale: {locale}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        ការសាកល្បង ភាសាខ្មែរ - {locale.toUpperCase()}
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">ការបង្ហាញកាលបរិច្ឆេទ</h3>
          <div className="space-y-2 text-sm">
            <p><strong>កាលបរិច្ឆេទបច្ចុប្បន្ន (DD/MM/YYYY):</strong> {dateUtils.dateToDDMMYYYY(now)}</p>
            <p><strong>កាលបរិច្ឆេទបច្ចុប្បន្ន (DD ខែ):</strong> {dateUtils.dateToDDMonth(now)}</p>
            <p><strong>ពេលវេលាកន្លងមក (២ម៉ោងមុន):</strong> {dateUtils.timeAgo(pastDate)}</p>
            <p><strong>ពេលវេលានៅសល់ (៥ថ្ងៃ):</strong> {dateUtils.timeRemaining(futureDate.toISOString())}</p>
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">ការបកប្រែ</h3>
          <div className="space-y-2 text-sm">
            <p><strong>{t('common.name')}:</strong> ឈ្មោះ</p>
            <p><strong>{t('common.create')}:</strong> បង្កើត</p>
            <p><strong>{t('common.save')}:</strong> រក្សាទុក</p>
            <p><strong>{t('auth.welcome')}:</strong> សូមស្វាគមន៍មកកាន់ CodeFlow 👋🏻</p>
            <p><strong>{t('date.justNow')}:</strong> ឥឡូវនេះ</p>
          </div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">ព័ត៌មានបន្ថែម</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Locale:</strong> {locale}</p>
            <p><strong>ភាសា:</strong> ភាសាខ្មែរ (Khmer)</p>
            <p><strong>កូដភាសា:</strong> cp (Cambodia/Phnom Penh)</p>
            <p><strong>ស្ថានភាព:</strong> ដំណើរការបានល្អ ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
} 