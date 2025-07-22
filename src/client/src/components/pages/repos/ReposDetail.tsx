'use client';
import NoData from '@/components/common/NoData/NoData';
import TitleHeader from '@/components/layout/TitleHeader';
import {
  AuthorInfo,
  QuickActions,
  RepositoryInfo,
  RepositoryStats,
  TopicInfo,
} from '@/components/pages/repos';
import useQ_Repos_GetDetail from '@/hooks/query-hooks/Repos/useQ_Repos_GetDetail';
import { useParams } from 'next/navigation';
import RepoAnalysisAndActivity from './RepoAnalysisAndActivity';
import CodeAnalysisImprovementChart from './code-analysis/CodeAnalysisImprovementChart';

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

  if (isLoading) return <div>Loading...</div>;
  if (!dataRepos) return <NoData />;
  if (isError) return <div>Error</div>;

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
          <RepoAnalysisAndActivity
            repos={dataRepos.data}
            pullRequests={pullRequests}
            commits={commits}
          />
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
          <QuickActions
            onOpenRepository={() => {
              if (dataRepos.data?.url) {
                window.open(dataRepos.data?.url, '_blank');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Mock Pull Requests data
const pullRequests = [
  {
    id: 'pr1',
    number: 23,
    title: 'Add new authentication system',
    description: 'Implementing JWT-based authentication with refresh tokens',
    status: 'open' as const,
    author: {
      name: 'Jane Smith',
      avatar: 'https://github.com/janesmith.png',
    },
    createdAt: '2024-12-10T10:30:00Z',
    branch: 'feature/auth-system',
    commits: 5,
    additions: 234,
    deletions: 45,
  },
  {
    id: 'pr2',
    number: 22,
    title: 'Fix responsive design issues',
    description: 'Resolved mobile layout problems and improved tablet view',
    status: 'merged' as const,
    author: {
      name: 'Mike Johnson',
      avatar: 'https://github.com/mikejohnson.png',
    },
    createdAt: '2024-12-08T14:20:00Z',
    mergedAt: '2024-12-09T09:15:00Z',
    branch: 'fix/responsive-design',
    commits: 3,
    additions: 156,
    deletions: 89,
  },
  {
    id: 'pr3',
    number: 21,
    title: 'Update dependencies to latest versions',
    description: 'Bump React to v18.3 and TypeScript to v5.6',
    status: 'closed' as const,
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/johndoe.png',
    },
    createdAt: '2024-12-05T16:45:00Z',
    closedAt: '2024-12-06T11:30:00Z',
    branch: 'chore/update-deps',
    commits: 2,
    additions: 67,
    deletions: 43,
  },
];

// Mock Commit History data
const commits = [
  {
    id: 'commit1',
    hash: 'a1b2c3d',
    message: 'feat: implement user profile management',
    description: 'Added user profile editing functionality with avatar upload',
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/johndoe.png',
    },
    date: '2024-12-15T08:30:00Z',
    additions: 125,
    deletions: 23,
  },
  {
    id: 'commit2',
    hash: 'e4f5g6h',
    message: 'fix: resolve memory leak in component',
    description: 'Fixed useEffect cleanup in UserList component',
    author: {
      name: 'Jane Smith',
      avatar: 'https://github.com/janesmith.png',
    },
    date: '2024-12-14T15:45:00Z',
    additions: 8,
    deletions: 12,
  },
  {
    id: 'commit3',
    hash: 'i7j8k9l',
    message: 'docs: update API documentation',
    description: 'Added comprehensive documentation for authentication endpoints',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://github.com/mikejohnson.png',
    },
    date: '2024-12-13T11:20:00Z',
    additions: 89,
    deletions: 5,
  },
  {
    id: 'commit4',
    hash: 'm1n2o3p',
    message: 'refactor: optimize database queries',
    description: 'Improved query performance by adding proper indexing',
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/johndoe.png',
    },
    date: '2024-12-12T09:10:00Z',
    additions: 45,
    deletions: 67,
  },
  {
    id: 'commit5',
    hash: 'q4r5s6t',
    message: 'style: update UI components styling',
    description: 'Applied new design system colors and spacing',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://github.com/sarahwilson.png',
    },
    date: '2024-12-11T13:55:00Z',
    additions: 156,
    deletions: 134,
  },
];
