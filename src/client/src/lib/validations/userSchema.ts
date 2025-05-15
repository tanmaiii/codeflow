import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function useUserSchema() {
  const t = useTranslations('validate');
  const tUser = useTranslations('users');
  return userSchema({ t, tUser });
}

const userSchema = ({
  t,
  tUser,
}: {
  t: ReturnType<typeof useTranslations>;
  tUser: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    name: z
      .string({ message: t('required', { field: tUser('name') }) })
      .min(1, { message: t('minLength', { field: tUser('name'), length: 1 }) })
      .max(255, {
        message: t('maxLength', { field: tUser('name'), length: 255 }),
      }),
    username: z
      .string({ message: t('required', { field: tUser('username') }) })
      .min(1, { message: t('minLength', { field: tUser('username'), length: 1 }) })
      .max(255, {
        message: t('maxLength', { field: tUser('username'), length: 255 }),
      }),
    email: z.string({ message: t('required', { field: tUser('email') }) }).email({
      message: t('email', { field: tUser('email') }),
    }),
    role: z.string({ message: t('required', { field: tUser('role') }) }),
    password: z.string().optional(),
  });

export type UserSchemaType = z.infer<ReturnType<typeof userSchema>>;
