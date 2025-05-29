import { TextDescription } from '@/components/ui/text';
import { ROLE_TOPIC } from '@/constants/object';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MemberAvatarProps {
  avatar?: string;
  name: string;
  role?: string;
  description?: string;
  size?: number;
  className?: string;
}

export default function MemberAvatar({
  avatar,
  name,
  role,
  description,
  size = 34,
  className,
}: MemberAvatarProps) {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <Image
        src={!avatar ? apiConfig.avatar(name) : avatar}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full`}
      />
      <div className="flex flex-col">
        <TextDescription className="text-color-1">{name}</TextDescription>
        {description && (
          <TextDescription className="text-xs text-color-2">{description}</TextDescription>
        )}
        {role && (
          <TextDescription className="text-xs text-color-2">
            {ROLE_TOPIC.find(item => item.value === role)?.label}
          </TextDescription>
        )}
      </div>
    </div>
  );
}
