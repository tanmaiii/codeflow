import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
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
      id: 'actions',
      cell: ({}) => {
        return (
          <div className="flex justify-center">
            <Button variant="outline">Xem</Button>
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
