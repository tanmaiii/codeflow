import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/contants/object';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';

import ActionIcon from '@/components/common/Action/ActionIcon';
import AvatarGroup from '@/components/common/AvatarGroup';
import MyBadge from '@/components/common/MyBadge';
import { useRouter } from 'next/navigation';
import Courses_Detail_Topics_Create from './Courses_Detail_Topics_Create';
import Courses_Detail_Topics_Update from './Courses_Detail_Topics_Update';
import { paths } from '@/data/path';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
function Courses_Detail_Topics_Table({ courseId }: { courseId: string }) {
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: 2,
      courseId,
    },
  });

  const mutation = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics', 'course', courseId] });
    },
    onError: () => {
      toast.error(t('deleteError'));
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        accessorKey: 'title',
        size: 100,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        accessorKey: 'description',
        size: 200,
      },
      {
        accessorKey: 'teacher',
        header: 'Teacher',
        size: 100,
        cell: ({ row }) => {
          const teacher = row.original.teacher;
          if (!teacher) return null;

          return (
            <div className="flex items-center gap-2">
              <AvatarGroup
                avatars={[
                  {
                    url: apiConfig.avatar(teacher.name ?? 'c'),
                    name: teacher.name ?? 'c',
                    alt: teacher.name ?? 'c',
                  },
                ]}
              />
              <TextDescription className="text-color-1">{teacher.name}</TextDescription>
            </div>
          );
        },
      },
      {
        accessorKey: 'group',
        header: 'Group',
        size: 100,
        cell: ({ row }) => {
          const authorName = row.original.author?.name ?? 'c';
          return (
            <AvatarGroup
              avatars={[
                {
                  url: 'http://localhost:3001/api/avatar',
                  name: authorName,
                  alt: authorName,
                },
                {
                  url: apiConfig.avatar('s'),
                  name: authorName,
                  alt: authorName,
                },
                {
                  url: apiConfig.avatar('12321'),
                  name: authorName,
                  alt: authorName,
                },
              ]}
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

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div className="flex items-center space-x-2">
        <Courses_Detail_Topics_Create courseId={courseId} />
        {selectedRowsCount > 0 && (
          <Button variant="destructive" size="sm" onClick={() => mutation.mutate(selectedRowsData)}>
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="h-full">
      <DataTable
        className="min-h-[600px]"
        columns={columns}
        data={topicsData?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        showIndexColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            <ActionIcon
              actionType={'view'}
              onClick={() => router.push(`${paths.TOPICS_DETAIL(row.original.id)}`)}
              type="button"
            />
            <Courses_Detail_Topics_Update topic={row.original} />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => {
                await topicService.delete(row.original.id);
              }}
            />
          </div>
        )}
      />
      <MyPagination
        currentPage={topicsData?.pagination?.currentPage ?? 1}
        totalPages={topicsData?.pagination?.totalPages ?? 1}
        onPageChange={value => setPage(value)}
      />
    </div>
  );
}

export default Courses_Detail_Topics_Table;
