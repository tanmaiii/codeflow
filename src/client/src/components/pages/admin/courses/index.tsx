'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import MySelect from '@/components/common/MySelect';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ENUM_TYPE_COURSE } from '@/constants/enum';
import { STATUS_COURSE, TYPE_COURSE } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { util_remove_html_tags, util_get_course_status } from '@/utils/common';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function Courses() {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const [search, setSearch] = useState('');
  const tAdmin = useTranslations('admin');
  const t = useTranslations();
  const tCourse = useTranslations('course');
  const tCommon = useTranslations('common');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [type, setType] = useState('all');

  const Q_Courses = useQ_Course_GetAll({
    params: {
      page: Number(page),
      limit: 12,
      sortBy: 'createdAt',
      order: 'DESC',
      search: search,
      ...(type !== 'all' ? { type } : {}),
    },
  });

  const typeCourseStatus = [
    { label: tCommon('all'), value: 'all' },
    { label: tCourse('type.major'), value: ENUM_TYPE_COURSE.MAJOR },
    { label: tCourse('type.foundation'), value: ENUM_TYPE_COURSE.FOUNDATION },
    { label: tCourse('type.thesis'), value: ENUM_TYPE_COURSE.THESIS },
    { label: tCourse('type.elective'), value: ENUM_TYPE_COURSE.ELECTIVE },
  ];

  const columns = useMemo<ColumnDef<ICourse>[]>(
    () => [
      {
        header: tCourse('title'),
        accessorKey: 'title',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <Link href={localPath(paths.COURSES_DETAIL(row.original.id))}>
                <TextHeading lineClamp={2} className="text-sm font-medium text-color-1">
                  {row.original.title}
                </TextHeading>
              </Link>
              {row.original.deletedAt && (
                <span className="text-xs text-red-500 font-semibold">
                  {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
                </span>
              )}
            </div>
          );
        },
        size: 200,
      },
      {
        header: tCourse('description'),
        accessorKey: 'description',
        cell: ({ row }) => {
          return (
            <TextDescription lineClamp={3} className="text-color-1">
              {util_remove_html_tags(row.original.description)}
            </TextDescription>
          );
        },
        size: 200,
      },
      {
        header: tCourse('author'),
        accessorKey: 'author',
        cell: ({ row }) => (
          <MemberAvatar
            name={row.original.author?.name || ''}
            avatar={row.original.author?.avatar}
            size={30}
            description={row.original.author?.username}
          />
        ),
      },
      {
        header: tCourse('typeCourse'),
        accessorKey: 'type',
        cell: ({ row }) => (
          <MyBadge status={TYPE_COURSE.find(item => item.value === row.original.type)!} />
        ),
      },
      {
        header: tCourse('status'),
        accessorKey: 'status',
        cell: ({ row }) => {
          const statusType = util_get_course_status(
            row.original.startDate,
            row.original.endDate,
            row.original.regStartDate,
            row.original.regEndDate,
          );

          return <MyBadge status={STATUS_COURSE.find(item => item.value === statusType)!} />;
        },
      },
    ],
    [localPath, t, tCommon, tCourse],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: ICourse[]) => {
      await Promise.all(selectedRowsData.map(item => courseService.destroy(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await courseService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<ICourse> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <Button
          onClick={() => router.push(`${paths.COURSE_CREATE}`)}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          <IconPlus className="w-4 h-4" />
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
      <TitleHeader title={tAdmin('courses.title')} description={tAdmin('courses.description')} />
      <DataTable
        isLoading={Q_Courses.isLoading}
        enableLocalSearch={false}
        showIndexColumn={true}
        columns={columns}
        data={Q_Courses.data?.data || []}
        fieldFilter="title"
        onSearchChange={value => {
          setSearch(value);
        }}
        searchValue={search}
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderHeader={() => {
          return (
            <>
              <MySelect
                options={[
                  ...(typeCourseStatus.map(option => {
                    return {
                      labelKey: option.label,
                      value: option.value.toString(),
                    };
                  }) ?? []),
                ]}
                size="sm"
                defaultValue={type}
                name="selectedDays"
                className="min-w-[120px] bg-background-1"
                isTranslate={false}
                onChange={value => setType(value)}
              />
            </>
          );
        }}
        renderActions={({ row }) => (
          <div className="flex">
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
                  await courseService.delete(row.original.id);
                } else {
                  await courseService.destroy(row.original.id);
                }
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
