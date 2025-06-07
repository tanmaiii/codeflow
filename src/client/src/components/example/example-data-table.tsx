'use client';

import { ColumnDef, Table } from '@tanstack/react-table';
import { createSelectColumn, createActionColumn } from '../common/DataTable/columns';
import { DataTable } from '../common/DataTable/data-table';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu mẫu
interface ExampleData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// Dữ liệu mẫu
const data: ExampleData[] = [
  {
    id: '1',
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Tran Thi B',
    email: 'tranthib@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'Le Van C',
    email: 'levanc@example.com',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Pham Thi D',
    email: 'phamthid@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Hoang Van E',
    email: 'hoangvane@example.com',
    role: 'Admin',
    status: 'Inactive',
  },
  {
    id: '6',
    name: 'Nguyen Van F',
    email: 'nguyenvanf@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Nguyen Van G',
    email: 'nguyenvang@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '8',
    name: 'Nguyen Van H',
    email: 'nguyenvanh@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '9',
    name: 'Nguyen Van I',
    email: 'nguyenvani@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '10',
    name: 'Nguyen Van J',
    email: 'nguyenvanj@example.com',
    role: 'User',
    status: 'Active',
  },
];

export function ExampleDataTable() {
  const [selectedData, setSelectedData] = useState<ExampleData[]>([]);

  // Định nghĩa columns
  const columns: ColumnDef<ExampleData>[] = [
    // Thêm cột checkbox select
    createSelectColumn<ExampleData>(),
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'name',
      header: 'Họ tên',
      size: 200,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'role',
      header: 'Vai trò',
      size: 200,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div
          className={`font-medium ${
            row.original.status === 'Active' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {row.original.status}
        </div>
      ),
      size: 200,
    },
    createActionColumn<ExampleData>(({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.log('Các mục được chọn', row.original);
        }}
      >
        Xem chi tiết
      </Button>
    )),
  ];

  // Custom toolbar để hiển thị action buttons khi có rows được chọn
  const customToolbar = ({ table }: { table: Table<ExampleData> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);

    return table.getFilteredSelectedRowModel().rows.length > 0 ? (
      <div className="flex items-center space-x-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => console.log('Xóa các mục được chọn', selectedRowsData)}
        >
          Xóa ({table.getFilteredSelectedRowModel().rows.length})
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Các mục được chọn', selectedRowsData);
            setSelectedData(selectedRowsData);
          }}
        >
          Xem chi tiết
        </Button>
      </div>
    ) : null;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ví dụ DataTable với chức năng Select</h2>
        <p className="text-gray-600 mb-4">
          Ví dụ này minh họa cách sử dụng DataTable với chức năng select và hiện thị tùy chọn khi có
          dòng được chọn.
        </p>
        {selectedData.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h3 className="font-semibold mb-2">Các dòng đã chọn:</h3>
            <pre className="bg-white p-2 rounded text-sm overflow-auto max-h-32">
              {JSON.stringify(selectedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data}
        fieldFilter="name"
        pagination={true}
        toolbarCustom={customToolbar}
      />
    </div>
  );
}
