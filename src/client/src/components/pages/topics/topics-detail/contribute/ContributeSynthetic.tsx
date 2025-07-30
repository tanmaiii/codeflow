import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { Award, CheckCircle, Code2, GitCommit, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MetricCard from './MetricCard';
import { mockMemberData } from './constants';

export default function ContributeSynthetic() {
  const totalCommits = mockMemberData.reduce((sum, member) => sum + member.commits, 0);
  const totalLinesAdded = mockMemberData.reduce((sum, member) => sum + member.linesAdded, 0);
  const totalTasks = mockMemberData.reduce((sum, member) => sum + member.tasksCompleted, 0);
  const averageScore =
    mockMemberData.reduce((sum, member) => sum + member.score, 0) / mockMemberData.length;
  const t = useTranslations('topic.contribute');

  return (
    <Card className="p-4 md:p-8">
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
    </Card>
  );
}
