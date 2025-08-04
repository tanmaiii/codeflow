import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { ITopic, ITopicEvaluation } from '@/interfaces/topic';
import topicEvaluationService from '@/services/topic_evaluation.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconCalendarTime, IconMessageCircle } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import TopicsEvaluationCreate from './TopicsEvaluationCreate';
import TopicsEvaluationUpdate from './TopicsEvaluationUpdate';
import TopicsEvaluationView from './TopicsEvaluationView';
import useQ_Evaluation_GetAllByTopic from '@/hooks/query-hooks/Evaluation/useQ_Evaluation_GetAllByTopic';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { useDebounce } from '@/hooks/useDebounce';

// Nhận xét chủ đề
export default function TopicsEvaluation({ topic }: { topic: ITopic }) {
  const t = useTranslations('topic');
  const { user } = useUserStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedKeyword = useDebounce(search, 300);

  const columns = useMemo<ColumnDef<ITopicEvaluation>[]>(
    () => [
      {
        header: t('createdAt'),
        accessorKey: 'createdAt',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <IconCalendarTime className="w-4 h-4 text-gray-400" />
            <TextDescription>{utils_DateToDDMMYYYY(row.original.createdAt || '')}</TextDescription>
          </div>
        ),
        size: 50,
      },
      {
        header: t('author'),
        accessorKey: 'user.name',
        cell: ({ row }) => (
          <MemberAvatar
            size={28}
            id={row.original.user?.id}
            avatar={row.original.user?.avatar}
            name={row.original.user?.name || ''}
          />
        ),
      },
      {
        header: t('evaluations'),
        accessorKey: 'evaluation',
        cell: ({ row }) => (
          <div className="max-w-md">
            <TextDescription lineClamp={3} className="text-sm text-color-1 line-clamp-3">
              {row.original.evaluation}
            </TextDescription>
          </div>
        ),
      },
    ],
    [t],
  );

  const sortedEvaluations =
    topic.evaluations?.sort(
      (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime(),
    ) || [];

  const { data } = useQ_Evaluation_GetAllByTopic({
    topicId: topic.id,
    params: {
      page: page,
      limit: 10,
      search: debouncedKeyword,
    },
  });

  const canManageEvaluations = user?.role === ROLE.ADMIN || user?.role === ROLE.TEACHER;

  return (
    <div className="space-y-6">
      {/* Table view for all evaluations */}
      {sortedEvaluations.length > 0 && (
        <div className="relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50"></div> */}
          <div>
            <DataTable
              fieldFilter="evaluation"
              columns={columns}
              searchValue={search}
              onSearchChange={value => setSearch(value)}
              pagination={false}
              toolbarCustom={() => {
                if (canManageEvaluations) {
                  return <TopicsEvaluationCreate topic={topic} />;
                }
              }}
              data={data?.data || []}
              showIndexColumn={true}
              renderActions={({ row }) => {
                return (
                  <div className="flex justify-center">
                    <TopicsEvaluationView evaluation={row.original} />
                    {canManageEvaluations && (
                      <>
                        <TopicsEvaluationUpdate topic={topic} evaluation={row.original} />
                        <ActionDelete
                          deleteKey={row.original.id}
                          handleSubmit={async () => {
                            await topicEvaluationService.delete(topic.id);
                          }}
                        />
                      </>
                    )}
                  </div>
                );
              }}
            />
          </div>

          <MyPagination
            currentPage={Number(page)}
            totalPages={data?.pagination.totalPages ?? 1}
            onPageChange={(page: number) => setPage(page)}
          />
        </div>
      )}

      {/* Empty state */}
      {sortedEvaluations.length === 0 && (
        <div className="relative overflow-hidden rounded-xl">
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 inline-block">
              <IconMessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <TextHeading className="text-lg font-semibold mb-2">{t('noEvaluation')}</TextHeading>
            <TextDescription className="text-gray-500 dark:text-gray-400 mb-6">
              {t('noEvaluationDescription')}
            </TextDescription>

            {canManageEvaluations && <TopicsEvaluationCreate topic={topic} />}
          </div>
        </div>
      )}
    </div>
  );
}
