import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import Courses_Detail_Topics_Update from './Courses_Detail_Topics_Update';

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
  status: z.enum(['pending', 'completed']),
});

export type TopicType = z.infer<typeof TopicSchema>;

function Courses_Detail_Topics() {
  const columns: ColumnDef<TopicType>[] = [
    {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      accessorKey: 'title',
      size: 200,
    },
    {
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      accessorKey: 'status',
      size: 100,
    },
    {
      header: () => <div className="text-center">Actions</div>,
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <Courses_Detail_Topics_Update topic={row.original} />
            <ActionDelete deleteKey={row.original.title} handleSubmit={() => {}} />
          </div>
        );
      },
      size: 50,
    },
  ];
  const data: TopicType[] = [
    {
      id: '1',
      title: 'Tổng quan về hệ thống quản lý học tập',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Xây dựng hệ thống quản lý học tập',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Hệ thống học máy bằng các mô hình học máy nâng cao',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Hệ thống Theo Dõi Dự Án Phần Mềm Làm Việc Nhóm Của Sinh Viên Qua GitHub Action',
      status: 'pending',
    },
  ];

  return <DataTable columns={columns} data={data} />;
}

export default Courses_Detail_Topics;
