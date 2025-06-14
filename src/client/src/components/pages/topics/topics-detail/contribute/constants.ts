import { Code2, Star, Target, Trophy, Users } from 'lucide-react';
import { MemberContribution, RoleConfig } from './types';

// Dữ liệu mẫu về đóng góp thành viên
export const mockMemberData: MemberContribution[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    commits: 45,
    linesAdded: 2340,
    linesDeleted: 892,
    tasksCompleted: 12,
    score: 9.2,
    role: 'Leader',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    commits: 38,
    linesAdded: 1890,
    linesDeleted: 567,
    tasksCompleted: 10,
    score: 8.7,
    role: 'Developer',
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    commits: 32,
    linesAdded: 1567,
    linesDeleted: 423,
    tasksCompleted: 8,
    score: 8.1,
    role: 'Designer',
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    commits: 28,
    linesAdded: 1234,
    linesDeleted: 345,
    tasksCompleted: 9,
    score: 7.8,
    role: 'Developer',
  },
  {
    id: '5',
    name: 'Vũ Thị Hương',
    commits: 25,
    linesAdded: 987,
    linesDeleted: 234,
    tasksCompleted: 7,
    score: 7.5,
    role: 'Tester',
  },
];

export const getRoleConfig = (role: string): RoleConfig => {
  switch (role) {
    case 'Leader':
      return {
        color: 'bg-gradient-to-r from-red-500 to-red-600',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        textColor: 'text-red-700 dark:text-red-400',
        icon: Trophy,
      };
    case 'Developer':
      return {
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        textColor: 'text-blue-700 dark:text-blue-400',
        icon: Code2,
      };
    case 'Designer':
      return {
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        textColor: 'text-purple-700 dark:text-purple-400',
        icon: Star,
      };
    case 'Tester':
      return {
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        textColor: 'text-green-700 dark:text-green-400',
        icon: Target,
      };
    default:
      return {
        color: 'bg-gradient-to-r from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-950/20',
        textColor: 'text-gray-700 dark:text-gray-400',
        icon: Users,
      };
  }
}; 