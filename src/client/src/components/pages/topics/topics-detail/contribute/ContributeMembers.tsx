import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Topic_Contributors from '@/hooks/query-hooks/Topic/useQ_Topic_Contributors';
import { ITopic } from '@/interfaces/topic';
import { Users } from 'lucide-react';

export default function ContributeMembers({ topic }: { topic: ITopic }) {
  const { data: contributors } = useQ_Topic_Contributors({
    id: topic.id,
  });

  return (
    <Card className="relative p-0 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-xl">
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <TextHeading className="text-xl font-bold">Thành viên dự án</TextHeading>
            <TextDescription className="text-gray-600 dark:text-gray-300">
              Chi tiết đóng góp của từng thành viên
            </TextDescription>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {contributors?.data.map(contributor => (
            <MemberContributeCard key={contributor.authorId} contributor={contributor} />
          ))}
        </div>
      </div>
    </Card>
  );
}
