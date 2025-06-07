import CardRepo from '@/components/common/CardRepo';
import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ITopic } from '@/interfaces/topic';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores/user_store';
import { utils_CalculateProgress } from '@/utils/date';
import { IconBrandGithub } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Topics_Repos_Create from './Topics_Repos_Create';
import useQ_Repos_GetAllByTopic from '@/hooks/query-hooks/Repos/useQ_Repos_GetAllByTopic';

const MAX_REPOS = 3;

interface Topics_AboutProps {
  topic: ITopic;
}

export default function Topics_About({ topic }: Topics_AboutProps) {
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
    <Card className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <div className="border-b pb-2 mb-2 flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <IconBrandGithub className="size-4" />
            <TextHeading>{t('repository')}</TextHeading>
          </div>
          {canAddRepo ? (
            <div>
              <Topics_Repos_Create topicId={topic.id} />
            </div>
          ) : null}
        </div>
        <div>
          {Q_Repos?.data?.length && Q_Repos?.data?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {Q_Repos.data.map(repos => (
                <CardRepo key={repos.id} repos={repos} />
              ))}
            </div>
          ) : (
            <TextDescription className="text-muted-foreground">
              {t('notRegistered')}
            </TextDescription>
          )}
        </div>
      </div>

      <div>
        <TextHeading className="border-b pb-2 mb-2">{t('progress')}</TextHeading>
        <div className="flex flex-row items-center gap-2">
          <div className={cn('h-3 bg-input/60 w-full relative right-0 bottom-0 rounded-md')}>
            <div
              className={cn('h-3 bg-primary/40 w-full absolute left-0 bottom-0 rounded-md')}
              style={{ width: `${progress}%` }}
            />
          </div>
          <TextDescription className="text-sm text-gray-500">{`${progress}%`}</TextDescription>
        </div>
      </div>

      <div>
        <TextHeading className="border-b pb-2 mb-2">
          {`${t('members')} (${topic.groupName ?? t('notRegistered')})`}
        </TextHeading>
        <div className="flex flex-col gap-2">
          {topic.members && topic.members?.length > 0 ? (
            topic.members?.map(member => (
              <div key={member.id}>
                <MemberAvatar
                  avatar={member?.user?.avatar}
                  name={member?.user?.name ?? ''}
                  role={member?.role}
                />
              </div>
            ))
          ) : (
            <TextDescription>{t('notRegistered')}</TextDescription>
          )}
        </div>
      </div>
    </Card>
  );
}
