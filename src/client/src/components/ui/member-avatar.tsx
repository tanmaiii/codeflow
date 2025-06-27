import { TextDescription } from '@/components/ui/text';
import { ROLE_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import MyImage from '../common/MyImage';

interface MemberAvatarProps {
  avatar?: string;
  name: string;
  role?: string;
  description?: string;
  size?: number;
  className?: string;
  id?: string;
}

export default function MemberAvatar({
  avatar,
  name,
  role,
  description,
  size = 34,
  className,
  id,
}: MemberAvatarProps) {
  const router = useRouter();
  const t = useTranslations();
  return (
    <div
      onClick={() => {
        if (id) {
          router.push(paths.USER_DETAIL(id));
        }
      }}
      className={cn('flex flex-row cursor-pointer items-center gap-2', className)}
    >
      <MyImage
        src={!avatar ? apiConfig.avatar(name) : avatar}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full`}
        defaultSrc={apiConfig.avatar(name)}
      />
      <div className="flex flex-col">
        <TextDescription className="text-color-1">{name}</TextDescription>
        {description && (
          <TextDescription className="text-xs text-color-2">{description}</TextDescription>
        )}
        {role && (
          <TextDescription className="text-xs text-color-2">
            {(() => {
              const roleObj = ROLE_TOPIC.find(item => item.value === role);
              return roleObj?.labelKey ? t(roleObj.labelKey) : role;
            })()}
          </TextDescription>
        )}
      </div>
    </div>
  );
}
