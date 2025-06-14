import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GitCommit, Star, Target } from 'lucide-react';
import React from 'react';
import { MemberContribution, RoleConfig } from './types';

interface MemberCardProps {
  member: MemberContribution;
  roleConfig: RoleConfig;
  IconComponent: React.ComponentType<{ className?: string }>;
}

export default function MemberCard({
  member,
  roleConfig,
  IconComponent,
}: MemberCardProps) {
  return (
    <div key={member.id} className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-700/80 dark:to-zinc-700/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-zinc-600/20"></div>
      <div className="relative p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-14 h-14 ring-4 ring-white/50 shadow-lg">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                  {member.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 p-1 rounded-full ${roleConfig.color} shadow-md`}
              >
                <IconComponent className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h4>
                <Badge
                  className={`${roleConfig.color} text-white text-xs px-3 py-1 font-medium shadow-md border-0`}
                >
                  {member.role}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <GitCommit className="w-4 h-4" />
                  <span className="font-medium">{member.commits}</span> commits
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">{member.tasksCompleted}</span> tasks
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span className="font-medium">{member.score}</span>/10
                </div>
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-lg font-bold text-gray-800 dark:text-white">
              <span className="text-green-600">+{member.linesAdded.toLocaleString()}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-red-500">-{member.linesDeleted.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              lines of code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    }