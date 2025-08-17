'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import ActionStatus from '@/components/common/Action/ActionStatus';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import MemberAvatar from '@/components/ui/member-avatar';
import { STATUS_HIDDEN } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Comments_GetAll from '@/hooks/query-hooks/Comments/useQ_Comments_GetAll';
import { ICommentSimple } from '@/interfaces/comment';
import commentService from '@/services/comment.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Comments() {
  const tCommon = useTranslations('common');
  const t = useTranslations('comment');
  const router = useRouter();
  const params = useSearchParams();
  const page = params?.get('page') || 1;
  const queryClient = useQueryClient();
  const search = params?.get('search') || '';
  const tAdmin = useTranslations('admin');
  const { data: Q_Comments, isLoading  } = useQ_Comments_GetAll({
    params: {
      page: Number(page),
      limit: 12,
      search: search,
    },
  });

  const columns = useMemo<ColumnDef<ICommentSimple>[]>(
    () => [
      {
        header: 'Content',
        accessorKey: 'content',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              {row.original.content}
              {row.original.deletedAt && (
                <span className="text-xs text-red-500 font-semibold">
                  {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
                </span>
              )}
            </div>
          );
        },
      },
      {
        header: 'Author',
        accessorKey: 'author',
        cell: ({ row }) => {
          return (
            <MemberAvatar
              name={row.original.author?.name || ''}
              avatar={row.original.author?.avatar}
            />
          );
        },
      },
      {
        header: t('status'),
        accessorKey: 'status',
        cell: ({ row }) => {
          const statusType = !row.original.status ? 'hidden' : 'visible';
          return <MyBadge status={STATUS_HIDDEN.find(item => item.value === statusType)!} />;
        },
      },
    ],
    [t, tCommon],
  );

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await commentService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));   
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
    },
  });

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title={tAdmin('comments.title')} description={tAdmin('comments.description')} />
      <DataTable
        isLoading={isLoading}
        showSelectionColumn={true}
        showIndexColumn={true}
        columns={columns}
        onSearchChange={value => {
          router.push(`/admin/${paths.COMMENTS}?page=1&search=${value}`);
        }}
        data={Q_Comments?.data || []}
        pagination={false}
        renderActions={({ row }) => (
          <div className="flex">
            <ActionStatus
              handleSubmit={async () =>
                await commentService.updateStatus(row.original.id, !row.original.status)
              }
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
              deleteKey={row.original.content}
              destroy={!!row.original.deletedAt}
              handleSubmit={async () => {
                if (!row.original.deletedAt) {
                  await commentService.delete(row.original.id);
                } else {
                  await commentService.destroy(row.original.id);
                }
              }}
            />
          </div>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={Q_Comments?.pagination.currentPage || 1}
          totalPages={Q_Comments?.pagination.totalPages || 1}
          onPageChange={page => router.push(`/admin/comments?page=${page}`)}
        />
      </div>
    </div>
  );
}
