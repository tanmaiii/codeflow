import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ITopic } from '@/interfaces/topic';
import { cn } from '@/lib/utils';
import { utils_CalculateProgress } from '@/utils/date';
import { IconBrandGithub } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Topics_About({ topic }: { topic: ITopic }) {
  const t = useTranslations('topic');
  return (
    <Card className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <div className=" border-b pb-2 mb-2 flex flex-row items-center gap-2">
          <IconBrandGithub className="size-4" />
          <TextHeading className="">{t('repository')}</TextHeading>
        </div>
        <Link
          href={'https://www.github.com/Codeflow-TVU'}
          className="hover:underline"
          target="_blank"
        >
          https://www.github.com/Codeflow-TVU
        </Link>
      </div>
      <div>
        <TextHeading className="border-b pb-2 mb-2">{t('progress')}</TextHeading>
        <div className="flex flex-row items-center gap-2">
          <div className={cn('h-3 bg-input/60 w-full relative right-0 bottom-0 rounded-md')}>
            <div
              className={cn('h-3 bg-primary/40 w-full absolute left-0 bottom-0 rounded-md')}
              style={{
                width: `${utils_CalculateProgress(
                  topic?.course?.startDate ?? '',
                  topic?.course?.topicDeadline ?? '',
                )}%`,
              }}
            />
          </div>
          <TextDescription className="text-sm text-gray-500">
            {`${utils_CalculateProgress(
              topic?.course?.startDate ?? '',
              topic?.course?.topicDeadline ?? '',
            )}%`}
          </TextDescription>
        </div>
      </div>
      <div>
        <TextHeading className="border-b pb-2 mb-2">{`${t('members')} (${
          topic.groupName ?? t('notRegistered')
        })`}</TextHeading>
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
