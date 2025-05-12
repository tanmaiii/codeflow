import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import Courses_Detail_Topics_Update from './Courses_Detail_Topics_Update';
import { Checkbox } from '@/components/ui/checkbox';

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Title is required' }),
  status: z.enum(['pending', 'completed']),
});

export type TopicType = z.infer<typeof TopicSchema>;

function Courses_Detail_Topics() {
  const columns: ColumnDef<TopicType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 10,
    },
    {
      id: 'stt',
      header: () => <div className="text-center">STT</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
      size: 10,
    },
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

  return <DataTable columns={columns} data={data} search={true} />;
}

export default Courses_Detail_Topics;
