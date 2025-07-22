import MemberAvatar from '@/components/ui/member-avatar';
import { GitCommit, Star, Target } from 'lucide-react';
import { MemberContribution } from './types';

interface MemberCardProps {
  member: MemberContribution;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 justify-between">
        <MemberAvatar
          name={member.name || ''}
          avatar={member.avatar}
          size={30}
          id={member.id}
          description={'tanmaiii'}
          className="cursor-pointer"
        />

        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            <span className="text-green-600">+{member.linesAdded.toLocaleString()}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-red-500">-{member.linesDeleted.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <GitCommit className="w-4 h-4" />
          <span>{member.commits} commits</span>
        </div>

        <div className="flex items-center gap-1">
          <Target className="w-4 h-4" />
          <span>{member.tasksCompleted} tasks</span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{member.score}/10</span>
        </div>
      </div>
    </div>
  );
}
