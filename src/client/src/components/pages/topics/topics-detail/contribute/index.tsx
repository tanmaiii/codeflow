import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { Award, CheckCircle, Code2, GitCommit, TrendingUp, Users } from 'lucide-react';
import ContributionChart from './ContributionChart';
import MemberCard from './MemberCard';
import MetricCard from './MetricCard';
import { getRoleConfig, mockMemberData } from './constants';
import { useTranslations } from 'next-intl';

export default function TopicsContribute() {
  // Tính toán các metrics tổng hợp
  const totalCommits = mockMemberData.reduce((sum, member) => sum + member.commits, 0);
  const totalLinesAdded = mockMemberData.reduce((sum, member) => sum + member.linesAdded, 0);
  const totalTasks = mockMemberData.reduce((sum, member) => sum + member.tasksCompleted, 0);
  const averageScore = mockMemberData.reduce((sum, member) => sum + member.score, 0) / mockMemberData.length;
  const t = useTranslations('topic.contribute');

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-10"></div>
        <Card className="relative p-0 border-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-zinc-800/90 dark:to-zinc-800/50 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <TextHeading className="text-2xl font-bold">{t('title')}</TextHeading>
                <TextDescription className="text-zinc-600 dark:text-zinc-300">
                  {t('description')}
                </TextDescription>
              </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={GitCommit}
                title="Tổng Commits"
                value={totalCommits}
                subtitle="commits trong dự án"
                gradient="bg-gradient-to-r from-blue-500 to-blue-600"
                textColor="text-blue-700 dark:text-blue-400"
              />
              <MetricCard
                icon={Code2}
                title="Dòng Code"
                value={totalLinesAdded.toLocaleString()}
                subtitle="dòng code được thêm"
                gradient="bg-gradient-to-r from-green-500 to-green-600"
                textColor="text-green-700 dark:text-green-400"
              />
              <MetricCard
                icon={CheckCircle}
                title="Tasks Hoàn thành"
                value={totalTasks}
                subtitle="nhiệm vụ đã xong"
                gradient="bg-gradient-to-r from-purple-500 to-purple-600"
                textColor="text-purple-700 dark:text-purple-400"
              />
              <MetricCard
                icon={Award}
                title="Điểm TB"
                value={averageScore.toFixed(1)}
                subtitle="điểm đánh giá trung bình"
                gradient="bg-gradient-to-r from-amber-500 to-orange-600"
                textColor="text-amber-700 dark:text-amber-400"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-900/50"></div>
        <Card className="relative p-0 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-slate-600 to-zinc-700 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <TextHeading className="text-xl font-bold">Biểu đồ thống kê</TextHeading>
                <TextDescription className="text-gray-600 dark:text-gray-300">
                  Phân tích chi tiết về đóng góp và hiệu suất
                </TextDescription>
              </div>
            </div>
            <ContributionChart />
          </div>
        </Card>
      </div>

      {/* Members Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-zinc-950/20 dark:to-zinc-950/20"></div>
        <Card className="relative p-0 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <TextHeading className="text-xl font-bold">Thành viên dự án</TextHeading>
                <TextDescription className="text-gray-600 dark:text-gray-300">
                  Chi tiết đóng góp của từng thành viên
                </TextDescription>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {mockMemberData.map(member => {
                const roleConfig = getRoleConfig(member.role);
                const IconComponent = roleConfig.icon;
                
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    roleConfig={roleConfig}
                    IconComponent={IconComponent}
                  />
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 