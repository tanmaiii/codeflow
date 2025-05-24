'use client';
import TitleHeader from '@/components/layout/TitleHeader';
import { TopicListSkeleton } from '@/components/skeletons/topic';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC } from '@/contants/object';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { getCurrentLocale } from '@/lib/utils';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconCircleCheck, IconPencil, IconSchool } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Topics_About from './Topics_About';
import { useUserStore } from '@/stores/user_store';
import { Button } from '@/components/ui/button';
import { paths } from '@/data/path';
import Link from 'next/link';
import Topics_Evaluation from './Topics_Evaluation';

export default function Topics_Detail() {
  const { id } = useParams();
  const t = useTranslations('topic');
  const { data: dataTopic, isLoading, isError } = useQ_Topic_GetDetail({ id: id as string });
  const locale = getCurrentLocale() || 'vi';
  const { user } = useUserStore();
  const router = useRouter();

  if (isLoading) return <TopicListSkeleton />;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <Card className="flex flex-col gap-4 p-4 lg:p-6 min-h-[90vh]">
          <div className="flex flex-row items-center justify-between gap-2">
            <TitleHeader title={`${dataTopic?.data?.title}`} onBack={true} />
            {user?.id ===
              dataTopic?.data?.members?.find(member => member.role === 'leader')?.userId && (
              <Button
                variant="none"
                size="sm"
                onClick={() => router.push(paths.TOPIC_UPDATE(id as string))}
              >
                <IconPencil className="size-6" />
              </Button>
            )}
          </div>

          {/* Course and Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
            <div className="flex flex-row items-center gap-3">
              <div className="p-2 bg-color-2/10 rounded-full">
                <IconSchool className="text-color-2 size-6" />
              </div>
              <div className="flex flex-col">
                <TextDescription className="text-sm text-gray-500">{t('course')}</TextDescription>
                <Link href={paths.COURSES_DETAIL(dataTopic?.data?.courseId ?? '')}>
                  <TextHeading className="text-lg">{dataTopic?.data?.course?.title}</TextHeading>
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="p-2 bg-color-2/10 rounded-full">
                <IconCircleCheck className="text-color-2 size-6" />
              </div>
              <div className="flex flex-col">
                <TextDescription className="text-sm text-gray-500">{t('status')}</TextDescription>
                <TextHeading className="text-lg">
                  {locale === 'vi'
                    ? STATUS_TOPIC.find(item => item.value === dataTopic?.data?.status)?.label
                    : STATUS_TOPIC.find(item => item.value === dataTopic?.data?.status)?.labelEn}
                </TextHeading>
              </div>
            </div>
          </div>

          {/* General Information Section */}
          <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
            <TextHeading className="text-lg font-semibold border-b pb-2">
              Thông tin chung
            </TextHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 col-span-2">
                <TextDescription className="text-sm text-gray-500">
                  {t('description')}
                </TextDescription>
                <TextHeading className="text-base">{dataTopic?.data?.description}</TextHeading>
              </div>

              <div className="flex flex-col gap-1">
                <TextDescription className="text-sm text-gray-500">{t('teacher')}</TextDescription>
                <TextHeading className="text-base">
                  {dataTopic?.data?.course?.author?.name}
                </TextHeading>
              </div>

              <div className="flex flex-col gap-1">
                <TextDescription className="text-sm text-gray-500">
                  {t('createdAt')}
                </TextDescription>
                <TextHeading className="text-base">
                  {utils_DateToDDMMYYYY(dataTopic?.data?.createdAt || '')}
                </TextHeading>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {dataTopic?.data && <Topics_Evaluation topic={dataTopic?.data} />}
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3">
        {dataTopic?.data && <Topics_About topic={dataTopic?.data} />}
      </div>
    </div>
  );
}
