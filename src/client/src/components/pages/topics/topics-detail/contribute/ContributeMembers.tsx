import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Topic_Contributors from '@/hooks/query-hooks/Topic/useQ_Topic_Contributors';
import { ITopic } from '@/interfaces/topic';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContributeMembers({ topic }: { topic: ITopic }) {
  const { data: contributors } = useQ_Topic_Contributors({
    id: topic.id,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 3;
  const t = useTranslations('topic');

  const displayedContributors = contributors?.data || [];
  const visibleContributors = isExpanded
    ? displayedContributors
    : displayedContributors.slice(0, initialCount);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <TextHeading className="text-xl/4 font-bold">{t('members')}</TextHeading>
          <TextDescription className="text-gray-600 dark:text-gray-300">
            {t('membersDescription')}
          </TextDescription>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visibleContributors.map(contributor => (
          <MemberContributeCard key={contributor.authorId} contributor={contributor} />
        ))}
        {displayedContributors.length > initialCount && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center cursor-pointer gap-2 w-full text-sm text-blue-600 hover:text-blue-700 transition-colors py-2 border-t border-gray-100 dark:border-gray-800 bg-transparent"
          >
            {isExpanded
              ? `Show less`
              : `View ${displayedContributors.length - initialCount} more contributors`}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
    </Card>
  );
}
