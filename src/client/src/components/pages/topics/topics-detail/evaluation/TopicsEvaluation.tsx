import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { ITopic, ITopicEvaluation } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconCalendarTime, IconMessageCircle } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import TopicsEvaluationCreate from './TopicsEvaluationCreate';
import TopicsEvaluationUpdate from './TopicsEvaluationUpdate';
import TopicsEvaluationView from './TopicsEvaluationView';

// Nhận xét chủ đề
export default function TopicsEvaluation({ topic }: { topic: ITopic }) {
  const t = useTranslations('topic');
  const { user } = useUserStore();

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
              size={32}
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
            <TextDescription className="text-sm line-clamp-3">
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
              pagination={true}
              toolbarCustom={() => {
                if (canManageEvaluations) {
                  return <TopicsEvaluationCreate topic={topic} />;
                }
              }}
              data={sortedEvaluations}
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
                            await topicService.deleteEvaluation(topic.id, row.original.id);
                          }}
                        />
                      </>
                    )}
                  </div>
                );
              }}
            />
          </div>
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
