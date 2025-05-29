'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import ActionStatus from '@/components/common/Action/ActionStatus';
import { DataTable } from '@/components/common/data-table/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { STATUS_HIDDEN } from '@/constants/object';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IPost } from '@/interfaces/post';
import postService from '@/services/post.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Posts_Table() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const t = useTranslations('post');
  const tCommon = useTranslations('common');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();

  const Q_Posts = useQ_Post_GetAll({
    params: {
      page: Number(page),
      limit: 10,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  const columns = useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        header: t('title'),
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Image
              src={
                row.original.thumbnail
                  ? utils_ApiImageToLocalImage(row.original.thumbnail)
                  : IMAGES.DEFAULT_POST
              }
              alt={row.original.title}
              width={100}
              height={100}
              className="rounded-sm"
            />
            <Link className="hover:underline" href={localPath(paths.POST_DETAIL(row.original.id))}>
              {row.original.title}
            </Link>
          </div>
        ),
        size: 400,
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
        header: t('comments'),
        accessorKey: 'commentCount',
        cell: ({ row }) => (
          <TextDescription className="text-color-1">{row.original.commentCount}</TextDescription>
        ),
      },
      {
        header: t('likes'),
        accessorKey: 'likeCount',
        cell: ({ row }) => (
          <TextDescription className="text-color-1">{row.original.likeCount}</TextDescription>
        ),
      },
      {
        header: tCommon('createdAt'),
        accessorKey: 'createdAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.createdAt!),
      },
      {
        header: tCommon('updatedAt'),
        accessorKey: 'updatedAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.updatedAt!),
      },
      {
        header: tCommon('deletedAt'),
        accessorKey: 'deletedAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.deletedAt!),
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
    [localPath, t],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IPost[]) => {
      await Promise.all(selectedRowsData.map(item => postService.destroy(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<IPost> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <Button
          onClick={() => router.push(`/admin/${paths.POST_CREATE}`)}
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
      <TitleHeader title="Posts" description="Manage your posts" />
      <DataTable
        showIndexColumn={true}
        columns={columns}
        data={Q_Posts.data?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            <ActionStatus
              handleSubmit={async () =>
                await postService.updateStatus(row.original.id, !row.original.status)
              }
            />
            <ActionIcon
              actionType={'update'}
              onClick={() => router.push(`/admin/${paths.POST_UPDATE(row.original.id)}`)}
              type="button"
            />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => await postService.destroy(row.original.id)}
            />
          </div>
        )}
      />
      <MyPagination
        currentPage={Q_Posts.data?.pagination.currentPage || 1}
        totalPages={Q_Posts.data?.pagination.totalPages || 1}
        onPageChange={page => router.push(`/admin/${paths.POSTS}?page=${page}`)}
      />
    </div>
  );
}
