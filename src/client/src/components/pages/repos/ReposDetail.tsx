'use client';
import NoPage from '@/components/common/NoPage/NoPage';
import TitleHeader from '@/components/layout/TitleHeader';
import { AuthorInfo, RepositoryInfo, RepositoryStats, TopicInfo } from '@/components/pages/repos';
import useQ_Repos_GetDetail from '@/hooks/query-hooks/Repos/useQ_Repos_GetDetail';
import { useParams } from 'next/navigation';
import CodeAnalysisImprovementChart from './code-analysis/CodeAnalysisImprovementChart';
import RepoAnalysisAndActivity from './ReposAnalysisAndActivity';
import ReposContribute from './ReposContribute';
import ReposDetailSkeleton from '@/components/skeletons/repos/ReposDetailSkeleton';

export default function ReposDetail() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: dataRepos,
    isLoading,
    isError,
  } = useQ_Repos_GetDetail({
    id: id,
  });

  if (isLoading) return <ReposDetailSkeleton />;
  if (!dataRepos) return <NoPage />;
  if (isError) return <NoPage />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <TitleHeader className="mb-2" title={'Repository'} onBack={true} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Repository Info */}

          <RepositoryInfo
            name={dataRepos.data?.name}
            description={dataRepos.data?.topic.title}
            language={dataRepos.data?.language}
            framework={dataRepos.data?.framework}
            createdAt={dataRepos.data?.createdAt || undefined}
            onOpenRepository={() => {
              if (dataRepos.data?.url) {
                window.open(dataRepos.data?.url, '_blank');
              }
            }}
          />

          {/* Topic Info */}
          {dataRepos.data?.topic && (
            <TopicInfo
              title={dataRepos.data?.topic.title}
              description={dataRepos.data?.topic.description}
              status={dataRepos.data?.topic.status}
            />
          )}

          <CodeAnalysisImprovementChart repos={dataRepos?.data ?? []} />

          {/* Pull Requests & Commits */}
          <RepoAnalysisAndActivity repos={dataRepos.data} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Info */}
          {dataRepos.data?.author && (
            <AuthorInfo
              email={dataRepos.data?.author.email}
              name={dataRepos.data?.author.name}
              avatar={dataRepos.data?.author.avatar ?? ''}
              bio={dataRepos.data?.author.bio}
            />
          )}

          {/* Repository Stats */}
          <RepositoryStats repoName={dataRepos.data?.name ?? ''} />

          {/* Quick Actions */}
          <ReposContribute />
        </div>
      </div>
    </div>
  );
}
