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
import useQ_PullRequests_GetByReposId from '@/hooks/query-hooks/PullRequests/useQ_PullRequests_GetByReposId';
import { IRepos } from '@/interfaces/repos';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PullRequestItem from './PullRequestItem';

const filterItem = [
  { label: 'common.newest', value: 'DESC' },
  { label: 'common.oldest', value: 'ASC' },
];

export default function PullRequests({ repos }: { repos: IRepos }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('DESC');
  const t = useTranslations();

  const Q_PullRequests = useQ_PullRequests_GetByReposId({
    params: {
      page: page,
      limit: 5,
      order: sortBy,
    },
    reposId: repos.id,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Label>{Q_PullRequests.data?.pagination.totalItems} Pull Requests</Label>
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
        {Q_PullRequests.data?.data.map(pullRequest => (
          <PullRequestItem key={pullRequest.id} pullRequest={pullRequest} repos={repos} />
        ))}
      </div>
      <div className="flex justify-center mt-auto">
        {Q_PullRequests.data && (
          <MyPagination
            currentPage={page}
            totalPages={Q_PullRequests.data?.pagination?.totalPages || 0}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
