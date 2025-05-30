import ActionModal from '@/components/common/Action/ActionModal';
import AvatarGroup from '@/components/common/AvatarGroup';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import { IconPlus } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

interface Courses_Topics_ChoiceTopicProps {
  onSelect: (topic: ITopic) => void;
  courseId: string;
}

export default function Courses_Topics_ChoiceTopic({
  onSelect,
  courseId,
}: Courses_Topics_ChoiceTopicProps) {
  const tCommon = useTranslations('common');
  const [page, setPage] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: 10,
      courseId: courseId,
      isCustom: false,
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        accessorKey: 'title',
        cell: ({ row }) => (
          <Link href={`${paths.TOPICS_DETAIL(row.original.id)}`}>{row.original.title}</Link>
        ),
        size: 100,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        accessorKey: 'description',
        size: 200,
        cell: ({ row }) => (
          <TextDescription className="line-clamp-3">{row.original.description}</TextDescription>
        ),
      },
      {
        accessorKey: 'group',
        header: 'Group',
        size: 100,
        cell: ({ row }) => {
          return (
            <AvatarGroup
              avatars={
                row.original.members?.map(member => ({
                  url: member.user?.avatar
                    ? member.user?.avatar
                    : apiConfig.avatar(member.user?.name ?? 'c'),
                  name: member.user?.name ?? 'c',
                  alt: member.user?.name ?? 'c',
                })) ?? []
              }
              max={3}
            />
          );
        },
      },
      {
        accessorKey: 'isCustom',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Is Custom" />,
        size: 100,
        cell: ({ row }) => {
          const isCustom = row.original.isCustom;
          const statusType = isCustom ? 'custom' : 'suggest';
          return <MyBadge status={STATUS_TOPIC_CUSTOM.find(item => item.value === statusType)!} />;
        },
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        accessorKey: 'status',
        size: 100,
        cell: ({ row }) => {
          const status = row.original.status;
          return <MyBadge status={STATUS_TOPIC.find(item => item.value === status)!} />;
        },
      },
    ],
    [page, topicsData],
  );

  return (
    <ActionModal
      title="Choice topics"
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          {tCommon('select')}
        </>
      }
      actionType={'default'}
      className="min-w-[80vw]"
    >
      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={topicsData?.data || []}
          fieldFilter="title"
          pagination={false}
          showIndexColumn={true}
          renderActions={({ row }) => {
            if (row.original.members && row.original.members.length > 0) {
              return null;
            }
            return (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  onSelect(row.original);
                  closeRef.current?.click();
                }}
              >
                {tCommon('select')}
              </Button>
            );
          }}
        />

        <MyPagination
          currentPage={topicsData?.pagination?.currentPage ?? 1}
          totalPages={topicsData?.pagination?.totalPages ?? 1}
          onPageChange={value => setPage(value)}
        />

        <div className="hidden">
          <DialogClose ref={closeRef} />
        </div>
      </div>
    </ActionModal>
  );
}
