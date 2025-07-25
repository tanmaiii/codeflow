import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import useQ_CodeAnalysis_GetByReposId from '@/hooks/query-hooks/CodeAnalysis/useQ_CodeAnalysis_GetByReposId';
import { IRepos } from '@/interfaces/repos';
import { SelectGroup, SelectValue } from '@radix-ui/react-select';
import { IconCode } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CodeAnalysisItem from './CodeAnalysisItem';

const filterItem = [
  { label: 'common.newest', value: 'DESC' },
  { label: 'common.oldest', value: 'ASC' },
];

export default function CodeAnalysis({ repos }: { repos: IRepos }) {
  const [page, setPage] = useState(1);
  const t = useTranslations();
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('DESC');

  const Q_CodeAnalysis = useQ_CodeAnalysis_GetByReposId({
    params: {
      page: page,
      limit: 4,
      order: sortBy,
    },
    reposId: repos.id,
  });

  if (Q_CodeAnalysis.data?.data.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-100">
        <IconCode className="size-12 text-gray-500" />
        <h4 className="text-2xl font-bold">Welcome to code analysis!</h4>
        <p className="text-gray-500">
          Code analysis is a process of analyzing the code to find potential issues and improve the
          code quality.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Label>{Q_CodeAnalysis.data?.pagination.totalItems} Code Analysis</Label>
        <Select defaultValue={sortBy} onValueChange={value => setSortBy(value as 'ASC' | 'DESC')}>
          <SelectTrigger className={`w-35 h-8 !rounded-sm bg-background-1`}>
            <SelectValue placeholder={`${t('common.select')}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterItem.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 min-h-[300px]">
        {Q_CodeAnalysis.data?.data?.map(pr => (
          <CodeAnalysisItem key={pr.id} data={pr} repos={repos} />
        ))}
      </div>
      <div className="flex justify-center mt-auto">
        {Q_CodeAnalysis.data && (
          <MyPagination
            currentPage={page}
            totalPages={Q_CodeAnalysis.data?.pagination?.totalPages || 0}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
