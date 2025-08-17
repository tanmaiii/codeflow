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
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Topics() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();
  const search = searchParams?.get('search') || '';

  const Q_Topics = useQ_Topic_GetAll({
    params: {
      page: Number(page),
      limit: 12,
      sortBy: 'createdAt',
      order: 'DESC',
      search: search,
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: t('title'),
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <Link className="text-base" href={localPath(paths.TOPICS_DETAIL(row.original.id))}>
              <TextDescription lineClamp={2} className='text-color-1'>{row.original.title}</TextDescription>
            </Link>
            {row.original.deletedAt && (
              <span className="text-xs text-red-500 font-semibold">
                {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
              </span>
            )}
          </div>
        ),
        size: 200,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Course" />,
        accessorKey: 'course',
        cell: ({ row }) => (
          <TextDescription lineClamp={1} className="text-color-1">{row.original.course?.title}</TextDescription>
        ),
        size: 200,
      },
      {
        accessorKey: 'group',
        header: 'Group',
        size: 100,
        cell: ({ row }) => (
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
        ),
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
    [localPath, t, tCommon],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.destroy(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await topicService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
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
      <TitleHeader title={tAdmin('topics.title')} description={tAdmin('topics.description')} />
      <DataTable
        isLoading={Q_Topics.isLoading}
        showIndexColumn={true}
        columns={columns}
        data={Q_Topics.data?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        onSearchChange={value => {
          router.push(`/admin/${paths.TOPICS}?page=1&search=${value}`);
        }}
        enableLocalSearch={false}
        renderActions={({ row }) => (
          <div className="flex">
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
            {row.original.deletedAt && (
              <ActionIcon
                actionType="restore"
                onClick={() => mutationRestore.mutate(row.original.id)}
                disabled={mutationRestore.isPending}
                title={tCommon('restore')}
              />
            )}
            <ActionDelete
              deleteKey={row.original.title}
              destroy={!!row.original.deletedAt}
              handleSubmit={async () => {
                if (!row.original.deletedAt) {
                  await topicService.delete(row.original.id);
                } else {
                  await topicService.destroy(row.original.id);
                }
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
