import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockBestProjects } from './mockData';

export default function BestProjectsList() {
  const t = useTranslations('courseDashboard.lists.bestProjects');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBestProjects.map((project, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{project.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{project.studentsWorking} {t('students')}</span>
                    <span>{project.commits} {t('commits')}</span>
                    <span>{t('mentor')}: {project.mentor}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t('avgScore')}: {project.avgScore}/10
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{project.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.completionRate}% {t('completionRate')}
                  </div>
                </div>
                <div className="w-16">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
