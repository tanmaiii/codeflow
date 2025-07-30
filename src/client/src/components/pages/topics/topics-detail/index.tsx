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
import {
  IconCalendar,
  IconCircleCheck,
  IconFileText,
  IconPencil,
  IconSchool,
  IconStar,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import React from 'react';
import TopicsAbout from './TopicsAbout';
import ContributeMembers from './contribute/ContributeMembers';
import ContributeSynthetic from './contribute/ContributeSynthetic';
import TopicsEvaluation from './evaluation/TopicsEvaluation';
import ContributionChart from './contribute/ContributionChart';

const InfoCard = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="group relative rounded-lg border bg-gray-50 dark:bg-zinc-800">
    <div className="relative p-4 rounded-lg transition-all duration-300">
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
  if (isError) return notFound();

  const isLeader =
    user?.id === dataTopic?.data?.members?.find(member => member.role === 'leader')?.userId;

  return (
    <div className="min-h-screen p-2 md:p-6">
      <div className="mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-8 space-y-8">
            {/* Header Section */}
            <Card className="p-4 md:p-6">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <TitleHeader title={dataTopic?.data?.title || ''} onBack={true} />
                  </div>
                  {isLeader && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(paths.TOPIC_UPDATE(id as string))}
                      className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    >
                      <IconPencil className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Course and Status Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-4">
                  <InfoCard
                    icon={IconSchool}
                    label={t('course')}
                    value={dataTopic?.data?.course?.title || ''}
                    href={paths.COURSES_DETAIL(dataTopic?.data?.courseId ?? '')}
                  />
                  <InfoCard
                    icon={IconCircleCheck}
                    label={t('status')}
                    value={tAll(
                      STATUS_TOPIC.find(item => item.value === dataTopic?.data?.status)!.labelKey,
                    )}
                  />
                </div>

                {/* Description */}
                {dataTopic?.data?.description && (
                  <InfoCard
                    icon={IconFileText}
                    label={t('description')}
                    value={dataTopic?.data?.description || ''}
                  />
                )}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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

            <Card className="relative p-4 md:p-8">
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

            <ContributeSynthetic />

            {dataTopic?.data && <ContributionChart topic={dataTopic.data} />}

            {dataTopic?.data && <ContributeMembers topic={dataTopic.data} />}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-4">
            <div className="sticky top-24">
              {dataTopic?.data && <TopicsAbout topic={dataTopic?.data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
