'use client';
import TitleHeader from '@/components/layout/TitleHeader';
import { TopicListSkeleton } from '@/components/skeletons/topic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconCalendar, IconCircleCheck, IconFileText, IconPencil, IconSchool, IconStar, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import TopicsAbout from './TopicsAbout';
import TopicsContribute from './contribute';
import TopicsEvaluation from './evaluation/TopicsEvaluation';

const InfoCard = ({ icon: Icon, label, value, href }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="group relative rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-zinc-800/90 dark:to-zinc-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-zinc-700/20"></div>
    <div className="relative p-4 rounded-xl transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <TextDescription className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            {label}
          </TextDescription>
          {href ? (
            <Link href={href} className="group-hover:text-blue-600 transition-colors">
              <TextHeading className="text-sm font-semibold">{value}</TextHeading>
            </Link>
          ) : (
            <TextHeading className="text-sm font-semibold">{value}</TextHeading>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function Topics_Detail() {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations('topic');
  const tAll = useTranslations();
  const { data: dataTopic, isLoading, isError } = useQ_Topic_GetDetail({ id: id as string });
  const { user } = useUserStore();
  const router = useRouter();

  if (isLoading) return <TopicListSkeleton />;
  if (isError) return <div>Error</div>;

  const isLeader = user?.id === dataTopic?.data?.members?.find(member => member.role === 'leader')?.userId;

  return (
    <div className="min-h-screen p-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-8 space-y-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-00 via-purple-600 to-pink-600 opacity-10"></div>
              <Card className="relative p-0 border-0 bg-gradient-to-br from-white/200 to-white/100 dark:from-zinc-900/90 dark:to-zinc-900/50 backdrop-blur-sm shadow-2xl">
                <div className="p-4 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <TitleHeader title={dataTopic?.data?.title || ''} onBack={true} />
                    </div>
                    {isLeader && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(paths.TOPIC_UPDATE(id as string))}
                        className="ml-4 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                      >
                        <IconPencil className="w-4 h-4 mr-2" />
                      </Button>
                    )}
                  </div>

                  {/* Course and Status Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <InfoCard
                      icon={IconSchool}
                      label={t('course')}
                      value={dataTopic?.data?.course?.title || ''}
                      href={paths.COURSES_DETAIL(dataTopic?.data?.courseId ?? '')}
                    />
                    <InfoCard
                      icon={IconCircleCheck }
                      label={t('status')}
                      // value={dataTopic?.data?.status || ''}
                      value={tAll(STATUS_TOPIC.find(item => item.value === dataTopic?.data?.status)!.labelKey)}
                    />
                  </div>

                  {/* Description */}
                  {dataTopic?.data?.description && (
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br dark:from-indigo-500/5 dark:to-purple-500/5"></div>
                      <div className="relative p-4 border border-white/20 dark:border-zinc-700/20 rounded-xl bg-background-1">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
                            <IconFileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <TextDescription className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                              {t('description')}
                            </TextDescription>
                            <TextHeading className="text-sm leading-relaxed">
                              {dataTopic?.data?.description}
                            </TextHeading>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={IconUser}
                      label={t('teacher')}
                      value={dataTopic?.data?.course?.author?.name || ''}
                    />
                    <InfoCard
                      icon={IconCalendar}
                      label={t('createdAt')}
                      value={utils_DateToDDMMYYYY(dataTopic?.data?.createdAt || '')}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Evaluation Section */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div> */}
              <Card className="relative p-4 md:p-8 border-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-zinc-900/90 dark:to-zinc-900/50 backdrop-blur-sm shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg">
                      <IconStar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <TextHeading className="text-xl font-bold">{t('evaluation')}</TextHeading>
                      <TextDescription className="text-sm text-zinc-600 dark:text-zinc-300">
                        {t('evaluationDescription')}
                      </TextDescription>
                    </div>
                  </div>
                  
                  {dataTopic?.data && <TopicsEvaluation topic={dataTopic?.data} />}
              </Card>
            </div>

            {/* Contribution Section */}
            <TopicsContribute />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-4">
            <div className="sticky top-8">
              {dataTopic?.data && <TopicsAbout topic={dataTopic?.data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
