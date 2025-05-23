'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/contants/object';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import ActionIcon from '@/components/common/Action/ActionIcon';
import AvatarGroup from '@/components/common/AvatarGroup';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { paths } from '@/data/path';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Courses_Topics_Table() {
  const { id } = useParams();
  const { data: course } = useQ_Course_GetDetail({ id: id as string });
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: 2,
      courseId: id as string,
    },
  });

  const mutation = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics', 'course', id as string] });
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

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div className="flex items-center space-x-2">
        {/* <Courses_Detail_Topics_Create courseId={id as string} /> */}
        {selectedRowsCount > 0 && (
          <Button variant="destructive" size="sm" onClick={() => mutation.mutate(selectedRowsData)}>
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TitleHeader title={course?.data?.title ?? ''} onBack={true} description={t('topic')} />
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
            {/* <Courses_Detail_Topics_Update topic={row.original} /> */}
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
    </Card>
  );
}
