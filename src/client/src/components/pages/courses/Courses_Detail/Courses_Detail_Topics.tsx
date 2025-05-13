import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { ColumnDef, Table } from '@tanstack/react-table';
import Courses_Detail_Topics_Update from './Courses_Detail_Topics_Update';
import { createSelectColumn, createActionColumn } from '@/components/common/data-table/columns';
import { Button } from '@/components/ui/button';
import Courses_Detail_Topics_Create from './Courses_Detail_Topics_Create';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import { useMemo } from 'react';
import topicService from '@/services/topic.service';
function Courses_Detail_Topics({ courseId }: { courseId: string }) {
  const data = useQ_Topic_GetAllByCourseId({
    params: {
      page: 1,
      limit: 10000,
      sortBy: 'created_at',
      order: 'DESC',
      courseId: courseId,
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      createSelectColumn<ITopic>(),
      {
        id: 'stt',
        header: () => <div className="text-center">STT</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
        size: 10,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        accessorKey: 'title',
        size: 100,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        accessorKey: 'description',
        size: 200,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        accessorKey: 'status',
        size: 100,
      },
      createActionColumn<ITopic>(({ row }) => {
        return (
          <div className="flex justify-center">
            <Courses_Detail_Topics_Update topic={row.original} />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => {
                await topicService.delete(row.original.id);
              }}
            />
          </div>
        );
      }),
    ],
    [data.data?.data],
  );

  const handleDelete = (selectedRowsData: ITopic[]) => {
    console.log('Xóa các mục được chọn', selectedRowsData);
  };

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);

    return (
      <div className="flex items-center space-x-2">
        <Courses_Detail_Topics_Create courseId={courseId} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedRowsData)}>
            Xóa ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center space-x-2"></div>
      <DataTable
        columns={columns}
        data={data.data?.data || []}
        fieldFilter="title"
        pagination={false}
        toolbarCustom={customToolbar}
      />
    </div>
  );
}

export default Courses_Detail_Topics;
