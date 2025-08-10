import { useTranslations } from 'next-intl';
import { z } from 'zod';

export function useChangePasswordSchema() {
  const t = useTranslations('validate');
  return changePasswordSchema(t);
}

const changePasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(6, t('short', { field: t('password') }))
        .max(255),
      newPassword: z
        .string()
        .min(6, t('short', { field: t('password') }))
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, t('passwordStrength'))
        .max(255),
      confirmPassword: z.string(),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('passwordNotMatch'),
      path: ['confirmPassword'],
    });

export type changePasswordSchemaType = z.infer<ReturnType<typeof changePasswordSchema>>;
