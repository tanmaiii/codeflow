import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMemberContributors } from '@/interfaces/user';

export default function FeaturedStudents() {
  return (
    <Card className="min-h-[300px]">
      <CardHeader>
        <CardTitle>Top Contributors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockData.map((contributor, index) => (
          <MemberContributeCard
            number={index + 1}
            key={contributor.authorId}
            contributor={contributor}
          />
        ))}
      </CardContent>
    </Card>
  );
}

const mockData: IMemberContributors[] = [
  {
    authorId: '1',
    author: {
      id: '1',
      name: 'Nguyễn Văn A',
      username: 'nguyenvana',
      email: 'nguyenvana@example.com',
      role: 'student',
      avatar: '',
      bio: 'Full-stack developer passionate about React and Node.js',
    },
    commit: {
      total: 45,
      additions: 1234,
      deletions: 89,
    },
    pullRequest: {
      total: 12,
      additions: 567,
      deletions: 23,
      open: 3,
      closed: 7,
      merged: 2,
    },
    codeAnalysis: {
      total: 28,
      success: 25,
      failure: 3,
    },
  },
  {
    authorId: '2',
    author: {
      id: '2',
      name: 'Trần Thị B',
      username: 'tranthib',
      email: 'tranthib@example.com',
      role: 'student',
      avatar: '',
      bio: 'Frontend developer specializing in modern web technologies',
    },
    commit: {
      total: 38,
      additions: 987,
      deletions: 156,
    },
    pullRequest: {
      total: 8,
      additions: 432,
      deletions: 67,
      open: 1,
      closed: 5,
      merged: 2,
    },
    codeAnalysis: {
      total: 22,
      success: 20,
      failure: 2,
    },
  },
  {
    authorId: '3',
    author: {
      id: '3',
      name: 'Lê Văn C',
      username: 'levanc',
      email: 'levanc@example.com',
      role: 'student',
      avatar: '',
      bio: 'Backend developer with expertise in database design',
    },
    commit: {
      total: 52,
      additions: 1890,
      deletions: 234,
    },
    pullRequest: {
      total: 15,
      additions: 789,
      deletions: 123,
      open: 2,
      closed: 10,
      merged: 3,
    },
    codeAnalysis: {
      total: 35,
      success: 32,
      failure: 3,
    },
  },
  {
    authorId: '4',
    author: {
      id: '4',
      name: 'Phạm Thị D',
      username: 'phamthid',
      email: 'phamthid@example.com',
      role: 'student',
      avatar: '',
      bio: 'UI/UX designer and frontend developer',
    },
    commit: {
      total: 29,
      additions: 654,
      deletions: 98,
    },
    pullRequest: {
      total: 6,
      additions: 321,
      deletions: 45,
      open: 1,
      closed: 4,
      merged: 1,
    },
    codeAnalysis: {
      total: 18,
      success: 17,
      failure: 1,
    },
  },
  {
    authorId: '5',
    author: {
      id: '5',
      name: 'Hoàng Văn E',
      username: 'hoangvane',
      email: 'hoangvane@example.com',
      role: 'student',
      avatar: '',
      bio: 'DevOps engineer and full-stack developer',
    },
    commit: {
      total: 41,
      additions: 1456,
      deletions: 178,
    },
    pullRequest: {
      total: 11,
      additions: 678,
      deletions: 89,
      open: 2,
      closed: 6,
      merged: 3,
    },
    codeAnalysis: {
      total: 26,
      success: 24,
      failure: 2,
    },
  },
];
