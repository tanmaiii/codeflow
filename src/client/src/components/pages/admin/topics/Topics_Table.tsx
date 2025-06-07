'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import AvatarGroup from '@/components/common/AvatarGroup';
import { DataTable } from '@/components/common/DataTable/data-table';
import { DataTableColumnHeader } from '@/components/common/DataTable/data-table-column-header';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Topic_GetAll from '@/hooks/query-hooks/Topic/useQ_Topic_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Topics_Table() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();

  const Q_Topics = useQ_Topic_GetAll({
    params: {
      page: Number(page),
      limit: 10,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: t('title'),
        accessorKey: 'title',
        cell: ({ row }) => (
          <Link href={localPath(paths.TOPICS_DETAIL(row.original.id))}>{row.original.title}</Link>
        ),
        size: 200,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Course" />,
        accessorKey: 'course',
        cell: ({ row }) => (
          <TextDescription className="text-color-1">{row.original.course?.title}</TextDescription>
        ),
        size: 200,
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
        header: t('author'),
        accessorKey: 'author',
        cell: ({ row }) => (
          <MemberAvatar
            name={row.original.author?.name || ''}
            avatar={row.original.author?.avatar}
            description={row.original.author?.username}
          />
        ),
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
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        size: 100,
        cell: ({ row }) => {
          const status = row.original.status;
          return <MyBadge status={STATUS_TOPIC.find(item => item.value === status)!} />;
        },
      },
    ],
    [localPath, t],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <Button
          onClick={() => router.push(`/admin/${paths.TOPIC_CREATE}`)}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          {tCommon('create')}
        </Button>
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title="Topics" description="Manage your topics" />
      <DataTable
        showIndexColumn={true}
        columns={columns}
        data={Q_Topics.data?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            <ActionIcon
              actionType={'view'}
              onClick={() => router.push(`${paths.TOPICS_DETAIL(row.original.id)}`)}
              type="button"
            />
            <ActionIcon
              actionType={'update'}
              onClick={() => router.push(`/admin/${paths.TOPIC_UPDATE(row.original.id)}`)}
              type="button"
            />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => {
                await topicService.delete(row.original.id);
              }}
            />
          </div>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={Q_Topics.data?.pagination.currentPage || 1}
          totalPages={Q_Topics.data?.pagination.totalPages || 1}
          onPageChange={page => router.push(`/admin/${paths.TOPICS}?page=${page}`)}
        />
      </div>
    </div>
  );
}
