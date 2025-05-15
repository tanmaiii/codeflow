'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/contants/object';
import { paths } from '@/data/path';
import useQ_Topic_GetAll from '@/hooks/query-hooks/Topic/useQ_Topic_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Topics_Table() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const t = useTranslations('course');
  const { localPath } = useH_LocalPath();
  const router = useRouter();

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
        cell: ({ row }) => {
          return (
            <Link href={localPath(paths.TOPICS_DETAIL(row.original.id))}>{row.original.title}</Link>
          );
        },
        size: 200,
      },
      {
        header: t('author'),
        accessorKey: 'author',
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Image
                src={
                  row.original.author?.avatar
                    ? utils_ApiImageToLocalImage(row.original.author?.avatar)
                    : apiConfig.avatar(row.original.author?.name)
                }
                alt={row.original.title}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <TextDescription className="text-color-1">
                  {row.original.author?.name}
                </TextDescription>
                <TextDescription className="text-xs text-color-2">
                  {row.original.author?.username}
                </TextDescription>
              </div>
            </div>
          );
        },
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
        toolbarCustom={() => (
          <Button
            onClick={() => router.push(`${paths.TOPIC_CREATE}`)}
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
              onClick={() => router.push(`${paths.TOPICS_DETAIL(row.original.id)}`)}
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
