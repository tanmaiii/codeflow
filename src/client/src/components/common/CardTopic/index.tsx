import { Card, CardContent } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import { ITopic } from '@/interfaces/topic';
import { cn } from '@/lib/utils';
import { utils_CalculateProgress, utils_DateToDDMMYYYY } from '@/utils/date';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import MyBadge from '../MyBadge';
import CardTopic_More from './CardTopicMore';
interface CardTopicProps {
  topic: ITopic;
}

export default function CardTopic({ topic }: CardTopicProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(paths.TOPICS_DETAIL(topic.id));
  };

  return (
    <Card
      className="px-3 py-4 hover:border-white/30 rounded-md cursor-pointer bg-background-1 group/item"
    >
      <CardContent className="p-0 h-full flex flex-col gap-2 justify-between">
        <div className="flex flex-row justify-between items-center gap-2">
          <MyBadge
            className="w-fit"
            status={STATUS_TOPIC.find(item => item.value === topic.status)!}
          />
          <CardTopic_More topic={topic} />
        </div>
        <TextDescription lineClamp={1}>{topic.course?.title}</TextDescription>
        <TextHeading className="text-xl mb-auto" onClick={onClick}>
          {topic.title}
        </TextHeading>
        <TextDescription lineClamp={2}>{topic.description}</TextDescription>
        <div className={cn('h-2 bg-input/60 w-full relative right-0 bottom-0 rounded-md')}>
          <div
            className={cn('h-2 bg-zinc-300 w-full absolute left-0 bottom-0 rounded-md')}
            style={{
              width: `${utils_CalculateProgress(
                topic.course?.startDate ?? '',
                topic.course?.topicDeadline ?? '',
              )}%`,
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-end gap-1">
            <IconCalendar className="size-4 text-color-2" />
            <TextDescription lineClamp={2}>
              {utils_DateToDDMMYYYY(topic.course?.topicDeadline ?? '')}
            </TextDescription>
          </div>
          <div className="flex flex-row items-end gap-1">
            <IconUser className="size-4 text-color-2" />
            <TextDescription lineClamp={2}>{topic.members?.length}</TextDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
