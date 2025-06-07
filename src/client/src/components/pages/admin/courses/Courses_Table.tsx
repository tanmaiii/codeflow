'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { STATUS_COURSE } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Courses_Table() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const t = useTranslations('course');
  const { localPath } = useH_LocalPath();
  const router = useRouter();

  const Q_Courses = useQ_Course_GetAll({
    params: {
      page: Number(page),
      limit: 10,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  const columns = useMemo<ColumnDef<ICourse>[]>(
    () => [
      {
        header: t('title'),
        accessorKey: 'title',
        cell: ({ row }) => {
          return (
            <Link href={localPath(paths.COURSES_DETAIL(row.original.id))}>
              {row.original.title}
            </Link>
          );
        },
        size: 200,
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
        header: t('startDate'),
        accessorKey: 'startDate',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.startDate!),
      },
      {
        header: t('endDate'),
        accessorKey: 'endDate',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.endDate!),
      },
      {
        header: t('topicDeadline'),
        accessorKey: 'topicDeadline',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.topicDeadline!),
      },
      {
        header: t('status'),
        accessorKey: 'status',
        cell: ({ row }) => {
          const startDate = new Date(row.original.startDate);
          const endDate = new Date(row.original.endDate);
          const statusType =
            startDate > new Date() ? 'not_started' : endDate < new Date() ? 'finished' : 'started';
          return <MyBadge status={STATUS_COURSE.find(item => item.value === statusType)!} />;
        },
      },
      // {
      //   header: t('hidden'),
      //   accessorKey: 'hidden',
      //   cell: ({ row }) => {
      //     const statusType = row.original.status ? 'hidden' : 'visible';
      //     return <MyBadge status={STATUS_HIDDEN.find(item => item.value === statusType)!} />;
      //   },
      // },
    ],
    [localPath, t],
  );

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title="Courses" description="Manage your courses" />
      <DataTable
        showIndexColumn={true}
        columns={columns}
        data={Q_Courses.data?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={() => (
          <Button
            onClick={() => router.push(`${paths.COURSE_CREATE}`)}
            variant="outline"
            size="sm"
            className="w-fit"
          >
            {t('create')}
          </Button>
        )}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            <ActionIcon
              actionType={'view'}
              onClick={() => router.push(`${paths.COURSES_DETAIL(row.original.id)}`)}
              type="button"
            />
            <ActionIcon
              actionType={'update'}
              onClick={() => router.push(`${paths.COURSE_UPDATE(row.original.id)}`)}
              type="button"
            />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => {
                await courseService.delete(row.original.id);
              }}
            />
          </div>
        )}
      />
      <MyPagination
        currentPage={Q_Courses.data?.pagination.currentPage || 1}
        totalPages={Q_Courses.data?.pagination.totalPages || 1}
        onPageChange={page => router.push(`/admin/${paths.COURSES}?page=${page}`)}
      />
    </div>
  );
}
