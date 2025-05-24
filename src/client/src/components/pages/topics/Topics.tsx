'use client';
import CardTopic from '@/components/common/CardTopic';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import NoData from '@/components/common/NoData/NoData';
import { TopicListSkeleton } from '@/components/skeletons/topic';
import TextHeading from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Topic_GetAllByUserId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByUserId';
import { ITopic } from '@/interfaces/topic';
import { useUserStore } from '@/stores/user_store';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

const TABS = [
  { id: 'all', label: 'all' },
  { id: 'approved', label: 'approved' },
  { id: 'pending', label: 'pending' },
  { id: 'rejected', label: 'rejected' },
] as const;

export default function Topics() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const t = useTranslations('topic');
  const tab = searchParams.get('tab') || 'all';
  const { user } = useUserStore();

  const {
    data: Q_Topics,
    isLoading,
    isError,
  } = useQ_Topic_GetAllByUserId({
    params: {
      page: Number(page),
      limit: 12,
      userId: user?.id || '',
      status: tab !== 'all' ? tab : '',
    },
  });

  const handleTabChange = (tabId: string) => {
    route.push(`${paths.TOPICS}?page=1&tab=${tabId}`);
  };

  if (isError) return <>Error</>;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2">
          {TABS.map(({ id, label }) => (
            <div
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md ${
                tab === id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <TextHeading>{t(label)}</TextHeading>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-[600px]">
        {isLoading && <TopicListSkeleton />}
        {Q_Topics?.data?.length === 0 && <NoData />}
        <div className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-6 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6">
          {Q_Topics?.data &&
            Q_Topics?.data?.map((topic: ITopic) => {
              return <CardTopic key={topic.id} topic={topic} />;
            })}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={Number(page)}
          totalPages={Q_Topics?.pagination.totalPages ?? 1}
          onPageChange={(page: number) => {
            route.push(`${paths.TOPICS}?page=${page}&tab=${tab}`);
          }}
        />
      </div>
    </div>
  );
}
