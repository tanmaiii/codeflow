import React from 'react';
import CardRepo from '@/components/common/CardRepo';
import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ITopic } from '@/interfaces/topic';

import { useUserStore } from '@/stores/user_store';
import { utils_CalculateProgress } from '@/utils/date';
import { IconBrandGithub, IconUsers, IconChartBar, IconCode, IconGitBranch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import TopicsReposCreate from './TopicsReposCreate';
import useQ_Repos_GetAllByTopic from '@/hooks/query-hooks/Repos/useQ_Repos_GetAllByTopic';
import { Badge } from '@/components/ui/badge';

const MAX_REPOS = 3;

interface Topics_AboutProps {
  topic: ITopic;
}

const SectionCard = ({ 
  icon: Icon, 
  title, 
  children, 
  action,
  gradient = "from-blue-500 to-purple-600"
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  gradient?: string;
}) => (
  <div className="group relative overflow-hidden rounded-xl mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg"></div>
    <div className="relative p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <TextHeading className="text-lg font-semibold">{title}</TextHeading>
        </div>
        {action}
      </div>
      {children}
    </div>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="relative">
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="absolute bottom-[calc(100%+6px)] left-1/2 transform -translate-x-1/2" style={{ left: `${progress}%` }}>
      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 border-0">
        {progress}%
      </Badge>
    </div>
  </div>
);

const EmptyState = ({ icon: Icon, message }: {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
}) => (
  <div className="flex flex-col items-center justify-center py-8 px-4">
    <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <TextDescription className="text-center text-gray-500 dark:text-gray-400">
      {message}
    </TextDescription>
  </div>
);

export default function TopicsAbout({ topic }: Topics_AboutProps) {
  const t = useTranslations('topic');
  const { user } = useUserStore();
  const { data: Q_Repos } = useQ_Repos_GetAllByTopic({
    params: {
      page: 1,
      limit: 10,
    },
    topicId: topic.id,
  });

  const isMember = topic.members?.some(member => member.userId === user?.id);
  const canAddRepo = isMember && Q_Repos?.pagination && Q_Repos.pagination.totalItems < MAX_REPOS;
  const progress = utils_CalculateProgress(
    topic?.course?.startDate ?? '',
    topic?.course?.topicDeadline ?? '',
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-10"></div>
        <Card className="relative p-0 border-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 backdrop-blur-sm shadow-xl">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                <IconCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <TextHeading className="text-xl font-bold">Thông tin dự án</TextHeading>
                <TextDescription className="text-sm text-gray-600 dark:text-gray-300">
                  Chi tiết và tiến độ thực hiện
                </TextDescription>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Repository Section */}
      <SectionCard
        icon={IconBrandGithub}
        title={t('repository')}
        gradient="from-gray-800 to-gray-900"
        action={canAddRepo ? (
          <div className="relative">
            <TopicsReposCreate topicId={topic.id} />
          </div>
        ) : null}
      >
        {Q_Repos?.data?.length && Q_Repos?.data?.length > 0 ? (
          <div className="space-y-3">
            {Q_Repos.data.map(repos => (
              <div key={repos.id} className="transform transition-all duration-200 hover:scale-[1.02]">
                <CardRepo repos={repos} />
              </div>
            ))}
            
            {/* Repository Stats */}
            <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <IconGitBranch className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {Q_Repos.data.length} / {MAX_REPOS} repositories
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {MAX_REPOS - Q_Repos.data.length} còn lại
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            icon={IconBrandGithub}
            message={t('notRegistered')}
          />
        )}
      </SectionCard>

      {/* Progress Section */}
      <SectionCard
        icon={IconChartBar}
        title={t('progress')}
        gradient="from-blue-500 to-cyan-500"
      >
        <div className="space-y-4">
          <ProgressBar progress={progress} />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-300">
                Hoàn thành
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {100 - Math.round(progress)}%
              </div>
              <div className="text-xs text-purple-500 dark:text-purple-300">
                Còn lại
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Members Section */}
      <SectionCard
        icon={IconUsers}
        title={`${t('members')} (${topic.groupName ?? t('notRegistered')})`}
        gradient="from-emerald-500 to-green-600"
      >
        {topic.members && topic.members?.length > 0 ? (
          <div className="space-y-3">
            {topic.members?.map(member => (
              <div 
                key={member.id} 
                className="group p-3 rounded-lg bg-gradient-to-r from-white/50 to-white/20 dark:from-gray-700/50 dark:to-gray-700/20 border border-white/20 dark:border-gray-600/20 transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.02]"
              >
                <MemberAvatar
                  avatar={member?.user?.avatar}
                  name={member?.user?.name ?? ''}
                  role={member?.role}
                />
              </div>
            ))}
            
            {/* Member Stats */}
            <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-600/30">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <IconUsers className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-300">
                    Tổng cộng {topic.members.length} thành viên
                  </span>
                </div>
                <Badge className="bg-emerald-500 text-white text-xs border-0">
                  {topic.members.filter(m => m.role === 'leader').length} leader
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            icon={IconUsers}
            message={t('notRegistered')}
          />
        )}
      </SectionCard>
    </div>
  );
}
