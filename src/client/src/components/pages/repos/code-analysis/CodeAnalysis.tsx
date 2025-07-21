import useQ_CodeAnalysis_GetByReposId from '@/hooks/query-hooks/CodeAnalysis/useQ_CodeAnalysis_GetByReposId';
import { IRepos } from '@/interfaces/repos';
import CodeAnalysisItem from './CodeAnalysisItem';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { useState } from 'react';

export default function CodeAnalysis({ repos }: { repos: IRepos }) {
  const [page, setPage] = useState(1);

  const Q_CodeAnalysis = useQ_CodeAnalysis_GetByReposId({
    params: {
      page: page,
      limit: 4,
    },
    reposId: repos.id,
  });

  return (
    <div className="flex flex-col gap-4">
      {Q_CodeAnalysis.data?.data?.map(pr => (
        <CodeAnalysisItem key={pr.id} data={pr} repos={repos} />
      ))}
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
