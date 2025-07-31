import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MySelect from '../MySelect';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limit?: number;
}

export const MyPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onLimitChange,
  limit,
}: CustomPaginationProps) => {
  const getPages = () => {
    const pages = [];

    if (currentPage > 2) {
      if (totalPages > 3) {
        pages.push(1, '...');
      } else {
        pages.push(1);
      }
    }
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 1) {
      if (totalPages > 3) {
        pages.push('...', totalPages);
      } else {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 mt-4">
      {onLimitChange && (
        <MySelect
          defaultValue={limit ? limit.toString() : '10'}
          options={[
            {
              labelKey: '5',
              value: '5',
            },
            {
              labelKey: '10',
              value: '10',
            },
            {
              labelKey: '20',
              value: '20',
            },
            {
              labelKey: '30',
              value: '30',
            },
          ]}
          size="sm"
          className="w-20"
          name="sortBy"
          isTranslate={false}
          onChange={value => onLimitChange?.(Number(value))}
        />
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {pages.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === '...' ? (
                <span className="px-2">...</span>
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(Number(page))}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
