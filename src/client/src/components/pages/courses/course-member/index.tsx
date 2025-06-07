'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { ROLE_USER } from '@/constants/object';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import { IUser } from '@/interfaces/user';
import userService from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function Courses_Member() {
  const tCommon = useTranslations('common');
  const tCourse = useTranslations('course');
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const [page, setPage] = useState(1);
  const { data } = useQ_Course_GetMembers({
    id: id,
    params: { page: Number(page), limit: 10 },
  });

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <MemberAvatar
            avatar={row.original.avatar ?? ''}
            id={row.original.id}
            name={row.original.name}
          />
        ),
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: ({ row }) => {
          if (row.original.uid) {
            return (
              <Link
                className="hover:underline"
                href={`https://github.com/${row.original.username}`}
                target="_blank"
              >
                <TextDescription className="text-color-1">{row.original.username}</TextDescription>
              </Link>
            );
          }
          return row.original.username;
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
        cell: ({ row }) => {
          return (
            <MyBadge
              status={ROLE_USER.find(item => item.value === (row.original.role ?? 'user'))!}
            />
          );
        },
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
    <Card className="p-2 lg:p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TitleHeader title={tCourse('member')} description={tCourse('memberDescription')} onBack />
      <div className="min-h-[60vh]">
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
              {/* <Users_Update user={row.original} /> */}
              <ActionDelete
                deleteKey={row.original.name}
                handleSubmit={async () => {
                  await userService.delete(row.original.id);
                }}
              />
            </>
          )}
        />
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={data?.pagination.currentPage || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={page => setPage(page)}
        />
      </div>
    </Card>
  );
}
