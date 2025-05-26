  import ActionDelete from '@/components/common/Action/ActionDelete';
  import { DataTable } from '@/components/common/data-table/data-table';
  import MemberAvatar from '@/components/ui/member-avatar';
  import TextHeading, { TextDescription } from '@/components/ui/text';
  import { ITopic, ITopicEvaluation } from '@/interfaces/topic';
  import topicService from '@/services/topic.service';
  import { utils_DateToDDMMYYYY } from '@/utils/date';
  import { ColumnDef } from '@tanstack/react-table';
  import { useTranslations } from 'next-intl';
  import { useMemo } from 'react';
  import Topics_Evaluation_Create from './Topics_Evaluation_Create';
  import Topics_Evaluation_Update from './Topics_Evaluation_Update';
  import { useUserStore } from '@/stores/user_store';
  import { ROLE } from '@/constants/enum';
  export default function Topics_Evaluation({ topic }: { topic: ITopic }) {
    const t = useTranslations('topic');
    const { user } = useUserStore();

    const columns = useMemo<ColumnDef<ITopicEvaluation>[]>(
      () => [
        {
          header: t('createdAt'),
          accessorKey: 'createdAt',
          cell: ({ row }) => (
            <TextDescription>{utils_DateToDDMMYYYY(row.original.createdAt || '')}</TextDescription>
          ),
          size: 50,
        },
        {
          header: t('author'),
          accessorKey: 'user.name',
          cell: ({ row }) => (
            <MemberAvatar
              size={30}
              avatar={row.original.user?.avatar}
              name={row.original.user?.name || ''}
            />
          ),
          size: 50,
        },
        {
          header: t('evaluations'),
          accessorKey: 'evaluation',
        },
      ],
      [topic],
    );

    return (
      <div>
        <TextHeading className="mb-4">{t('evaluations')}</TextHeading>
        <DataTable
          fieldFilter="evaluation"
          columns={columns}
          pagination={true}
          toolbarCustom={() => {
            if (user?.role === ROLE.ADMIN || user?.role === ROLE.TEACHER) {
              return <Topics_Evaluation_Create topic={topic} />;
            }
          }}
          data={
            topic.evaluations?.sort(
              (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime(),
            ) || []
          }
          showIndexColumn={true}
          renderActions={({ row }) => {
            if (user?.role === ROLE.ADMIN || user?.role === ROLE.TEACHER) {
              return (
                <>
                  <Topics_Evaluation_Update topic={topic} evaluation={row.original} />
                  <ActionDelete
                    deleteKey={row.original.id}
                    handleSubmit={async () => {
                      await topicService.deleteEvaluation(topic.id, row.original.id);
                    }}
                  />
                </>
              );
            }
          }}
        />
      </div>
    );
  }
