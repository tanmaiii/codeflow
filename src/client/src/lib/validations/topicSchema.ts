import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function useTopicSchema() {
  const t = useTranslations('validate');
  const tTopic = useTranslations('topic');
  return topicSchema({ t, tTopic });
}

const topicSchema = ({
  t,
  tTopic,
}: {
  t: ReturnType<typeof useTranslations>;
  tTopic: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    title: z
      .string({ message: t('required', { field: tTopic('title') }) })
      .min(1, { message: t('minLength', { field: tTopic('title'), length: 1 }) })
      .max(255, {
        message: t('maxLength', { field: tTopic('title'), length: 255 }),
      }),
    description: z
      .string({ message: t('required', { field: tTopic('description') }) })
      .min(1, {
        message: t('minLength', { field: tTopic('description'), length: 1 }),
      })
      .max(10000, {
        message: t('maxLength', { field: tTopic('description'), length: 10000 }),
      }),
    status: z.string({ message: t('required', { field: tTopic('status') }) }).optional(),
  });

export type TopicSchemaType = z.infer<ReturnType<typeof topicSchema>>;
