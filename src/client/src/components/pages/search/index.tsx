'use client';

import TextHeading from '@/components/ui/text';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import LoadMoreMixed from './LoadMoreMixed';
import SearchFilters from './SearchFilters';

export default function Search() {
  const { data: tags } = useQ_Tag_GetAll();
  
  const {
    filters,
    debouncedKeyword,
    isSearching,
    apiParams,
    isAllTypesSelected,
    hasActiveFilters,
    toggleType,
    toggleAllTypes,
    resetFilters,
  } = useSearchFilter();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-12 gap-4 py-10 max-w-5xl w-full min-h-[90vh] mx-auto">
        
        {/* Main Content */}
        <div className="col-span-8 h-full flex flex-col">
          <div className="mb-6">
            <TextHeading className="text-2xl font-bold">
              {filters.keyword ? (
                <>
                  Kết quả tìm kiếm &ldquo;{filters.keyword}&rdquo;
                  {isSearching && (
                    <span className="text-sm text-primary ml-2 animate-pulse">
                      (Đang tìm kiếm...)
                    </span>
                  )}
                </>
              ) : (
                'Khám phá nội dung'
              )}
            </TextHeading>
            
            {hasActiveFilters && (
              <div className="mt-2 text-sm text-gray-600">
                Đang áp dụng {
                  [
                    filters.types.length < 3 && `${filters.types.length} loại nội dung`,
                  ].filter(Boolean).join(', ')
                } bộ lọc
              </div>
            )}
            
            {/* Show what's actually being searched */}
            {debouncedKeyword && debouncedKeyword !== filters.keyword && (
              <div className="mt-1 text-xs text-gray-500">
                Hiển thị kết quả cho: &ldquo;{debouncedKeyword}&rdquo;
              </div>
            )}
          </div>

          <LoadMoreMixed params={apiParams} />
        </div>

        {/* Sidebar Filters */}
        <div className="col-span-4">
          <div className="sticky top-20">
            <SearchFilters
              filters={filters}
              tags={tags?.data || []}
              hasActiveFilters={hasActiveFilters}
              isAllTypesSelected={isAllTypesSelected}
              onToggleType={toggleType}
              onToggleAllTypes={toggleAllTypes}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
