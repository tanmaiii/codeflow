'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { toast } from 'sonner';

import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { ROLE_USER } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_User_GetAll from '@/hooks/query-hooks/User/useQ_User_GetAll';
import { IUser } from '@/interfaces/user';
import apiConfig from '@/lib/api';
import userService from '@/services/user.service';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import Users_Create from './Users_Create';
import Users_Update from './Users_Update';

const PAGE_SIZE = 10;

export default function Users_Table() {
  const router = useRouter();
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data } = useQ_User_GetAll({
    params: {
      page,
      limit: PAGE_SIZE,
    },
  });

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.avatar ? utils_ApiImageToLocalImage(row.original.avatar) : apiConfig.avatar(row.original.name)}
              alt={row.original.name ?? ''}
              width={32}
              height={32}
              className="rounded-full"
            />
            <TextDescription className="text-color-1">{row.original.name}</TextDescription>
          </div>
        ),
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: ({ row }) => {
          if (!row.original.uid) return row.original.username;
          
          return (
            <Link
              className="hover:underline"
              href={`https://github.com/${row.original.username}`}
              target="_blank"
            >
              <TextDescription className="text-color-1">{row.original.username}</TextDescription>
            </Link>
          );
        },
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => (
          <TextDescription className="text-color-1">{row.original.email}</TextDescription>
        ),
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => (
          <MyBadge
            status={ROLE_USER.find(item => item.value === (row.original.role ?? 'user'))!}
          />
        ),
      },
    ],
    [],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IUser[]) => {
      await Promise.all(selectedRowsData.map(item => userService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<IUser> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div>
        <Users_Create />
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title="Users" description="Manage your users" />
      <DataTable
        fieldFilter="name"
        showIndexColumn={true}
        showSelectionColumn={true}
        pagination={false}
        columns={columns}
        data={data?.data || []}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <>
            <Users_Update user={row.original} />
            <ActionDelete
              deleteKey={row.original.name}
              handleSubmit={async () => {
                await userService.delete(row.original.id);
              }}
            />
          </>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={data?.pagination.currentPage || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={page => router.push(`/admin/${paths.USERS}?page=${page}`)}
        />
      </div>
    </div>
  );
}
