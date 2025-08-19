import { Button } from '@/components/ui/button';
import { IconPrinter } from '@tabler/icons-react';
import * as XLSX from 'xlsx';

interface DataExportColumn {
  key: string;
  label: string;
}

interface DataExportProps<TData> {
  values?: TData[];
  columns: DataExportColumn[];
  fileName?: string;
}

export default function DataExport<TData extends Record<string, unknown>>({
  values = [],
  columns,
  fileName = 'export.xlsx',
}: DataExportProps<TData>) {
  const handleExport = () => {
    if (!values || values.length === 0 || !columns || columns.length === 0) return;

    const headers = columns.map(col => col.label);
    const aoa: unknown[][] = [headers];

    for (const item of values) {
      const dataRow = columns.map(col => {
        const value = (item as Record<string, unknown>)[col.key];
        if (value == null) return '';
        if (value instanceof Date) return value;
        if (typeof value === 'object') return JSON.stringify(value);
        return value as unknown;
      });
      aoa.push(dataRow);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(aoa);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <Button
      variant="default"
      className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white flex items-center gap-2"
      size="sm"
      onClick={handleExport}
    >
      <IconPrinter className="w-4 h-4" />
      Export
    </Button>
  );
}
