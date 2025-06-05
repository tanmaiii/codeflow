'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableInstance,
  Row,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTableViewOptions } from './data-table-view-options';
import { DataTablePagination } from './data-table-pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fieldFilter?: string;
  pagination?: boolean;
  toolbarCustom?: ((props: { table: TableInstance<TData> }) => React.ReactNode) | React.ReactNode;
  renderActions?: (props: { row: Row<TData> }) => React.ReactNode;
  showIndexColumn?: boolean;
  showSelectionColumn?: boolean;
  onPageChange?: (page: number) => void;
  appendToUrl?: boolean;
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  enableLocalSearch?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fieldFilter = 'title',
  pagination = true,
  toolbarCustom,
  renderActions,
  showIndexColumn = false,
  showSelectionColumn = false,
  onPageChange,
  appendToUrl = false,
  className,
  searchValue: externalSearchValue,
  onSearchChange,
  enableLocalSearch = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [localSearchValue, setLocalSearchValue] = React.useState('');
  const tTable = useTranslations('table');

  const searchValue = externalSearchValue !== undefined ? externalSearchValue : localSearchValue;

  const handleSearchChange = (value: string) => {
    if (externalSearchValue !== undefined) {
      onSearchChange?.(value);
    } else {
      setLocalSearchValue(value);
      if (enableLocalSearch) {
        table.getColumn(fieldFilter)?.setFilterValue(value);
      }
    }
    onSearchChange?.(value);
  };

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: showSelectionColumn,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <Input
            placeholder={`Search ${fieldFilter}`}
            value={searchValue}
            onChange={event => handleSearchChange(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px] rounded-md"
          />
          {/* {fieldFilter && <DataTableToolbar fieldFilter={fieldFilter} table={table} />} */}
          {toolbarCustom &&
            (typeof toolbarCustom === 'function' ? toolbarCustom({ table }) : toolbarCustom)}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {showSelectionColumn && (
                  <TableHead className="w-[30px]">
                    <Checkbox
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                      }
                      onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                      aria-label="Select all"
                      className="translate-y-[2px]"
                    />
                  </TableHead>
                )}
                {showIndexColumn && <TableHead className="w-[30px] text-center">STT</TableHead>}
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
                {renderActions && <TableHead className="text-center w-[100px]">Actions</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {showSelectionColumn && (
                    <TableCell className="w-[30px]">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                      />
                    </TableCell>
                  )}
                  {showIndexColumn && (
                    <TableCell className="text-center w-[30px]">
                      {pagination
                        ? table.getState().pagination.pageIndex *
                            table.getState().pagination.pageSize +
                          rowIndex +
                          1
                        : rowIndex + 1}
                    </TableCell>
                  )}
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell className="p-2 text-center w-[100px] ">
                      {renderActions({ row })}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    (showSelectionColumn ? 1 : 0) +
                    (showIndexColumn ? 1 : 0) +
                    (renderActions ? columns.length + 1 : columns.length)
                  }
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <DataTablePagination table={table} onPageChange={onPageChange} appendToUrl={appendToUrl} />
      )}
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>
            {tTable('selectedRows', {
              length: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </span>
        </div>
      )}
    </div>
  );
}
