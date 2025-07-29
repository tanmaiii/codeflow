import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useQ_Repos_GetContributors from '@/hooks/query-hooks/Repos/useQ_Repos_Contributors';
import { IRepos } from '@/interfaces/repos';
import { IconChartBar, IconChartDots3 } from '@tabler/icons-react';
import ChartAdditions from './ChartAdditions';
import ChartAnalysis from './ChartAnalysis';
import ChartCodeChanges from './ChartCodeChanges';
import ChartContribution from './ChartContribution';
import ChartMemberRadar from './ChartMemberRadar';
import CodeAnalysisImprovementChart from './CodeAnalysisImprovementChart';
import { useTranslations } from 'next-intl';

export default function ReposContributeChart({ repos }: { repos: IRepos }) {
  const { data: contributors } = useQ_Repos_GetContributors({
    id: repos.id,
  });
  const t = useTranslations('repos');

  return (
    <Card>
      <Tabs defaultValue="code-analysis" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code-analysis" className="flex items-center gap-2">
              <IconChartDots3 className="size-4" />
              Code Analysis
            </TabsTrigger>
            <TabsTrigger value="contribute" className="flex items-center gap-2">
              <IconChartBar />
              {t('contribute')}
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="min-h-[300px]">
          <TabsContent value="code-analysis" className="space-y-4">
            <CodeAnalysisImprovementChart repos={repos} />
          </TabsContent>

          <TabsContent value="contribute" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCodeChanges contributors={contributors?.data ?? []} />
              <ChartAdditions contributors={contributors?.data ?? []} />
            </div>
            <ChartContribution contributors={contributors?.data ?? []} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartMemberRadar contributors={contributors?.data ?? []} />
              <ChartAnalysis contributors={contributors?.data ?? []} />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
