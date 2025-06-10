'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import { DataTable } from '@/components/common/DataTable/data-table';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Tag_GetAllPagi from '@/hooks/query-hooks/Tag/useQ_Tag_GetAllPagi';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ITag } from '@/interfaces/tags';
import tagService from '@/services/tag.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';
import TagsCreate from './TagsCreate';
import TagsUpdate from './TagsUpdate';

export default function Tags() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const search = searchParams?.get('search') || '';
  const t = useTranslations('tag');
  const tCommon = useTranslations('common');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();

  const Q_Tags = useQ_Tag_GetAllPagi({
    params: {
      page: Number(page),
      limit: 12,
      search: search,
    },
  });

  const columns = useMemo<ColumnDef<ITag>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <Link href={localPath(paths.TAG(row.original.id))}>{row.original.name}</Link>
              {row.original.deletedAt && (
                <TextDescription className="text-xs text-red-500 font-semibold">
                  {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
                </TextDescription>
              )}
            </div>
          );
        },
        size: 100,
      },
      {
        header: t('description'),
        accessorKey: 'description',
        cell: ({ row }) => {
          return (
            <TextDescription className="text-color-1">{row.original.description}</TextDescription>
          );
        },
        size: 200,
      },
      {
        header: tCommon('createdAt'),
        accessorKey: 'createdAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.createdAt!),
        size: 100,
      },
      {
        header: tCommon('updatedAt'),
        accessorKey: 'updatedAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.updatedAt!),
        size: 100,
      },
    ],
    [localPath, t, tCommon],
  );

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await tagService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<ITag> }) => {
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <TagsCreate />
        {selectedRowsCount > 0 && (
          <Button variant="destructive" size="sm" onClick={() => {}}>
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title="Tags" description="Manage your posts" />
      <DataTable
        isLoading={Q_Tags.isLoading}  
        showIndexColumn={true}
        columns={columns}
        data={Q_Tags.data?.data || []}
        onSearchChange={value => {
          router.push(`/admin/${paths.TAGS}?page=1&search=${value}`);
        }}
        enableLocalSearch={false}
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex">
            <TagsUpdate tag={row.original} />
            {row.original.deletedAt && (
              <ActionIcon
                actionType="restore"
                onClick={() => mutationRestore.mutate(row.original.id)}
                disabled={mutationRestore.isPending}
                title={tCommon('restore')}
              />
            )}
            <ActionDelete
              deleteKey={row.original.name}
              destroy={!!row.original.deletedAt}
              handleSubmit={async () => {
                if (!row.original.deletedAt) {
                  await tagService.delete(row.original.id);
                } else {
                  await tagService.destroy(row.original.id);
                }
              }}
            />
          </div>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={Q_Tags.data?.pagination.currentPage || 1}
          totalPages={Q_Tags.data?.pagination.totalPages || 1}
          onPageChange={page => router.push(`/admin/${paths.TAGS}?page=${page}&search=${search}`)}
        />
      </div>
    </div>
  );
}
