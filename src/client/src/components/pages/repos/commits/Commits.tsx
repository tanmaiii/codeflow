import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useQ_Commit_GetByReposId from '@/hooks/query-hooks/Commit/useQ_Commit_GetByReposId';
import { IRepos } from '@/interfaces/repos';
import { IconGitCommit } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CommitItem from './CommitItem';

const filterItem = [
  { label: 'common.newest', value: 'DESC' },
  { label: 'common.oldest', value: 'ASC' },
];

export default function Commits({ repos }: { repos: IRepos }) {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('DESC');

  const Q_Commit = useQ_Commit_GetByReposId({
    params: {
      page: page,
      limit: 5,
      order: sortBy,
    },
    reposId: repos.id,
  });

  if (Q_Commit.data?.data.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-100">
        <IconGitCommit className="size-12 text-gray-500" />
        <h4 className="text-2xl font-bold">Welcome to commits!</h4>
        <p className="text-gray-500">
          Commits is a process of analyzing the code to find potential issues and improve the code
          quality.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Label>{Q_Commit.data?.pagination.totalItems} Commits</Label>
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
      <div className="flex flex-col gap-4">
        {Q_Commit.data?.data.map(commit => (
          <CommitItem key={commit.id} commit={commit} repos={repos} />
        ))}
      </div>
      <div className="flex justify-center mt-auto">
        {Q_Commit.data && (
          <MyPagination
            currentPage={page}
            totalPages={Q_Commit.data?.pagination?.totalPages || 0}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
