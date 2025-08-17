'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Repos_GetAll from '@/hooks/query-hooks/Repos/useQ_Repos_GetAll';
import { IRepos } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';
import Repos_Update from './ReposUpdate';
  
export default function Repos() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const search = searchParams?.get('search') || '';
  const t = useTranslations('repos');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const queryClient = useQueryClient();

  const Q_Repos = useQ_Repos_GetAll({
    params: {
      page: Number(page),
      limit: 12,
      sortBy: 'createdAt',
      order: 'DESC',
      search: search,
    },
  });

  const columns = useMemo<ColumnDef<IRepos>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0">
            <Link
              href={row.original.url}
              className="text-color-1 text-base hover:underline"
              target="_blank"
            >
              {row.original.name}
            </Link>
            <TextDescription lineClamp={1} className="text-color-2 text-sm">
              {row.original.topic?.title ?? ''}
            </TextDescription>
          </div>
        ),
        size: 200,
      },
      {
        header: t('author'),
        accessorKey: 'author',
        cell: ({ row }) => {
          if (!row.original.author) return null;
          return (
            <MemberAvatar
              name={row.original.author?.name || ''}
              avatar={row.original.author?.avatar}
              description={row.original.author?.username}
            />
          );
        },
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
      {
        header: tCommon('deletedAt'),
        accessorKey: 'deletedAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.deletedAt!),
        size: 100,
      },
    ],
    [t, tCommon],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IRepos[]) => {
      await Promise.all(
        selectedRowsData.map(item => {
          return reposService.destroy(item.id);
        }),
      );
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['repos'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<IRepos> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
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
      <TitleHeader title="Repositories" description="Manage your repositories" />
      <DataTable
        isLoading={Q_Repos.isLoading}
        enableLocalSearch={false}
        showIndexColumn={true}
        columns={columns}
        onSearchChange={value => {
          router.push(`/admin/${paths.REPOS}?page=1&search=${value}`);
        }}
        data={Q_Repos.data?.data || []}
        fieldFilter="name"
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            {!row.original.deletedAt && <Repos_Update repos={row.original} />}
            <ActionDelete
              deleteKey={row.original.name}
              handleSubmit={async () => {
                await reposService.destroy(row.original.id);
              }}
            />
          </div>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={Q_Repos.data?.pagination.currentPage || 1}
          totalPages={Q_Repos.data?.pagination.totalPages || 1}
          onPageChange={page => router.push(`/admin/${paths.REPOS}?page=${page}&search=${search}`)}
        />
      </div>
    </div>
  );
}
