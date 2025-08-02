import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { ITopic, ITopicMember } from '@/interfaces/topic';
import { IconUsers } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { getRoleConfig } from './contribute/constants';

export default function TopicMember({ topic }: { topic: ITopic }) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 3;

  const displayedContributors = (topic?.members || []).sort((a, b) => {
    // Leader luôn ở đầu
    if (a.role === 'leader' && b.role !== 'leader') return -1;
    if (a.role !== 'leader' && b.role === 'leader') return 1;

    // Giữ thứ tự ban đầu cho các role khác
    return 0;
  });

  const visibleContributors = isExpanded
    ? displayedContributors
    : displayedContributors.slice(0, initialCount);

  return (
    <Card className="p-3 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-slate-600 to-zinc-700 shadow-sm">
            <IconUsers className="w-6 h-6 text-white" />
          </div>
          <TextHeading className="text-lg/4 font-bold">{t('topic.members')}</TextHeading>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {visibleContributors.map(contributor => (
          <Member key={contributor.id} contributor={contributor} />
        ))}
        {displayedContributors.length > initialCount && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center cursor-pointer gap-2 w-full text-sm text-blue-600 hover:text-blue-700 transition-colors py-2 border-t border-gray-100 dark:border-gray-800 bg-transparent"
          >
            {isExpanded ? t('common.showLess') : t('common.showMore')}
          </button>
        )}
      </div>
    </Card>
  );
}

const Member = ({ contributor }: { contributor: ITopicMember | undefined }) => {
  const roleConfig = getRoleConfig(contributor?.role || '');
  const IconComponent = roleConfig.icon;

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-all flex items-center justify-between duration-200">
      <MemberAvatar
        name={contributor?.user?.name ?? ''}
        avatar={contributor?.user?.avatar}
        id={contributor?.user?.id}
        size={44}
        description={contributor?.user?.email}
        className="cursor-pointer"
      />

      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${roleConfig.bgColor} ${roleConfig.textColor}`}
      >
        <IconComponent className="w-3.5 h-3.5" />
        <span className="capitalize">{contributor?.role || 'Member'}</span>
      </div>
    </div>
  );
};
