import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useQ_Repos_GetContributors from '@/hooks/query-hooks/Repos/useQ_Repos_Contributors';
import { IRepos, IReposContributors } from '@/interfaces/repos';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ReposContribute({ repos }: { repos: IRepos }) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: contributors } = useQ_Repos_GetContributors({
    id: repos.id,
  });

  const displayedContributors = contributors?.data || mockData;
  const initialCount = 3;
  const visibleContributors = isExpanded
    ? displayedContributors
    : displayedContributors.slice(0, initialCount);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t('repos.contribute')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleContributors.map(contributor => (
          <MemberContributeCard key={contributor.authorId} contributor={contributor} />
        ))}

        {displayedContributors.length > initialCount && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full text-sm text-blue-600 hover:text-blue-700 transition-colors py-2 border-t border-gray-100 dark:border-gray-800 bg-transparent"
          >
            {isExpanded
              ? `Show less`
              : `View ${displayedContributors.length - initialCount} more contributors`}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

const mockData: IReposContributors[] = [
  {
    authorId: 'bcceb2d0-0356-488e-ab2d-a6592da1dac0',
    author: {
      id: 'bcceb2d0-0356-488e-ab2d-a6592da1dac0',
      email: 'dinhtanmaivn@gmail.com',
      username: 'dtanmai',
      uid: '2FpTogUQvFTgudok9Kpu0a7Z1G02',
      name: 'Nguyễn Văn An',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/160510597?v=4',
      bio: '',
      createdAt: new Date('2025-07-13T04:53:42.000Z'),
      updatedAt: new Date('2025-07-28T13:28:29.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 6,
      additions: 72,
      deletions: 20,
    },
    pullRequest: {
      total: 2,
      additions: 52,
      deletions: 0,
    },
    codeAnalysis: {
      total: 6,
      success: 3,
      failure: 3,
    },
  },
  {
    authorId: '2529834f-d1fc-4a6c-a921-5450f9bba880',
    author: {
      id: '2529834f-d1fc-4a6c-a921-5450f9bba880',
      email: 'tanmai833@gmail.com',
      username: 'tanmaiii',
      uid: 'rzJ5LW0uQeRUhQ0lxeNDlP9HVTz2',
      name: 'Đinh Tấn Mãi',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/90459047?v=4',
      bio: '',
      createdAt: new Date('2025-06-27T14:16:08.000Z'),
      updatedAt: new Date('2025-07-29T13:33:58.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 11,
      additions: 3,
      deletions: 3,
    },
    pullRequest: {
      total: 1,
      additions: 2,
      deletions: 2,
    },
    codeAnalysis: {
      total: 5,
      success: 5,
      failure: 0,
    },
  },
  {
    authorId: '3a4b5c6d-7e8f-9012-3456-789abcdef012',
    author: {
      id: '3a4b5c6d-7e8f-9012-3456-789abcdef012',
      email: 'hoangminh@gmail.com',
      username: 'hoangminh',
      uid: 'abc123def456ghi789jkl012mno345',
      name: 'Trần Hoàng Minh',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/123456789?v=4',
      bio: 'Frontend Developer',
      createdAt: new Date('2025-05-15T08:30:15.000Z'),
      updatedAt: new Date('2025-07-30T10:15:30.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 15,
      additions: 120,
      deletions: 45,
    },
    pullRequest: {
      total: 4,
      additions: 80,
      deletions: 15,
    },
    codeAnalysis: {
      total: 8,
      success: 6,
      failure: 2,
    },
  },
  {
    authorId: '4b5c6d7e-8f90-1234-5678-9abcdef01234',
    author: {
      id: '4b5c6d7e-8f90-1234-5678-9abcdef01234',
      email: 'lethihoa@gmail.com',
      username: 'lethihoa',
      uid: 'def456ghi789jkl012mno345pqr678',
      name: 'Lê Thị Hoa',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/234567890?v=4',
      bio: 'Backend Developer',
      createdAt: new Date('2025-04-20T14:45:22.000Z'),
      updatedAt: new Date('2025-07-29T16:20:45.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 22,
      additions: 180,
      deletions: 60,
    },
    pullRequest: {
      total: 6,
      additions: 140,
      deletions: 25,
    },
    codeAnalysis: {
      total: 12,
      success: 10,
      failure: 2,
    },
  },
  {
    authorId: '5c6d7e8f-9012-3456-789a-bcdef0123456',
    author: {
      id: '5c6d7e8f-9012-3456-789a-bcdef0123456',
      email: 'phamduclong@gmail.com',
      username: 'phamduclong',
      uid: 'ghi789jkl012mno345pqr678stu901',
      name: 'Phạm Đức Long',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/345678901?v=4',
      bio: 'Full Stack Developer',
      createdAt: new Date('2025-03-10T09:15:30.000Z'),
      updatedAt: new Date('2025-07-28T11:30:15.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 18,
      additions: 95,
      deletions: 35,
    },
    pullRequest: {
      total: 3,
      additions: 65,
      deletions: 10,
    },
    codeAnalysis: {
      total: 9,
      success: 7,
      failure: 2,
    },
  },
  {
    authorId: '6d7e8f90-1234-5678-9abc-def012345678',
    author: {
      id: '6d7e8f90-1234-5678-9abc-def012345678',
      email: 'vuthilan@gmail.com',
      username: 'vuthilan',
      uid: 'jkl012mno345pqr678stu901vwx234',
      name: 'Vũ Thị Lan',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/456789012?v=4',
      bio: 'UI/UX Designer & Developer',
      createdAt: new Date('2025-02-28T13:20:45.000Z'),
      updatedAt: new Date('2025-07-30T15:45:20.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 8,
      additions: 45,
      deletions: 12,
    },
    pullRequest: {
      total: 2,
      additions: 30,
      deletions: 5,
    },
    codeAnalysis: {
      total: 4,
      success: 4,
      failure: 0,
    },
  },
  {
    authorId: '7e8f9012-3456-789a-bcde-f01234567890',
    author: {
      id: '7e8f9012-3456-789a-bcde-f01234567890',
      email: 'nguyenquanghuy@gmail.com',
      username: 'nguyenquanghuy',
      uid: 'mno345pqr678stu901vwx234yzab567',
      name: 'Nguyễn Quang Huy',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/567890123?v=4',
      bio: 'DevOps Engineer',
      createdAt: new Date('2025-01-15T07:30:10.000Z'),
      updatedAt: new Date('2025-07-29T09:15:35.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 25,
      additions: 200,
      deletions: 80,
    },
    pullRequest: {
      total: 7,
      additions: 160,
      deletions: 40,
    },
    codeAnalysis: {
      total: 15,
      success: 12,
      failure: 3,
    },
  },
  {
    authorId: '8f901234-5678-9abc-def0-123456789012',
    author: {
      id: '8f901234-5678-9abc-def0-123456789012',
      email: 'doanvannam@gmail.com',
      username: 'doanvannam',
      uid: 'pqr678stu901vwx234yzab567cdef890',
      name: 'Đoàn Văn Nam',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/678901234?v=4',
      bio: 'Mobile Developer',
      createdAt: new Date('2024-12-20T16:45:25.000Z'),
      updatedAt: new Date('2025-07-28T18:30:50.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 12,
      additions: 85,
      deletions: 25,
    },
    pullRequest: {
      total: 3,
      additions: 55,
      deletions: 8,
    },
    codeAnalysis: {
      total: 7,
      success: 5,
      failure: 2,
    },
  },
  {
    authorId: '90123456-789a-bcde-f012-3456789abcde',
    author: {
      id: '90123456-789a-bcde-f012-3456789abcde',
      email: 'buithimai@gmail.com',
      username: 'buithimai',
      uid: 'stu901vwx234yzab567cdef890ghij123',
      name: 'Bùi Thị Mai',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/789012345?v=4',
      bio: 'QA Engineer',
      createdAt: new Date('2024-11-10T12:15:40.000Z'),
      updatedAt: new Date('2025-07-30T14:20:25.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 9,
      additions: 40,
      deletions: 15,
    },
    pullRequest: {
      total: 2,
      additions: 25,
      deletions: 3,
    },
    codeAnalysis: {
      total: 10,
      success: 8,
      failure: 2,
    },
  },
  {
    authorId: '0123456a-bcde-f012-3456-789abcdef012',
    author: {
      id: '0123456a-bcde-f012-3456-789abcdef012',
      email: 'lyvantuan@gmail.com',
      username: 'lyvantuan',
      uid: 'vwx234yzab567cdef890ghij123klmn456',
      name: 'Lý Văn Tuấn',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/890123456?v=4',
      bio: 'Data Scientist',
      createdAt: new Date('2024-10-05T10:30:55.000Z'),
      updatedAt: new Date('2025-07-29T12:45:10.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 20,
      additions: 150,
      deletions: 50,
    },
    pullRequest: {
      total: 5,
      additions: 110,
      deletions: 20,
    },
    codeAnalysis: {
      total: 11,
      success: 9,
      failure: 2,
    },
  },
  {
    authorId: '123456ab-cdef-0123-4567-89abcdef0123',
    author: {
      id: '123456ab-cdef-0123-4567-89abcdef0123',
      email: 'tranthithuy@gmail.com',
      username: 'tranthithuy',
      uid: 'yzab567cdef890ghij123klmn456opqr789',
      name: 'Trần Thị Thúy',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/901234567?v=4',
      bio: 'Product Manager',
      createdAt: new Date('2024-09-18T15:20:30.000Z'),
      updatedAt: new Date('2025-07-30T17:10:45.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 5,
      additions: 25,
      deletions: 8,
    },
    pullRequest: {
      total: 1,
      additions: 15,
      deletions: 2,
    },
    codeAnalysis: {
      total: 3,
      success: 3,
      failure: 0,
    },
  },
  {
    authorId: '23456abc-def0-1234-5678-9abcdef01234',
    author: {
      id: '23456abc-def0-1234-5678-9abcdef01234',
      email: 'hoangvanduc@gmail.com',
      username: 'hoangvanduc',
      uid: 'cdef890ghij123klmn456opqr789stuv012',
      name: 'Hoàng Văn Đức',
      role: 'user',
      status: 'active',
      avatar: 'https://avatars.githubusercontent.com/u/012345678?v=4',
      bio: 'Security Engineer',
      createdAt: new Date('2024-08-25T11:40:20.000Z'),
      updatedAt: new Date('2025-07-28T13:55:35.000Z'),
      deletedAt: null,
    },
    commit: {
      total: 16,
      additions: 110,
      deletions: 40,
    },
    pullRequest: {
      total: 4,
      additions: 75,
      deletions: 18,
    },
    codeAnalysis: {
      total: 8,
      success: 6,
      failure: 2,
    },
  },
];
