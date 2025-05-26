import TextHeading, { TextDescription } from '@/components/ui/text';
import { ROLE_TOPIC } from '@/constants/object';
import apiConfig from '@/lib/api';
import Image from 'next/image';

interface MemberAvatarProps {
  avatar?: string;
  name: string;
  role?: string;
  size?: number;
}

export default function MemberAvatar({ avatar, name, role, size = 38 }: MemberAvatarProps) {
  return (
    <div className="flex flex-row items-center gap-2 mb-1">
      <Image
        src={!avatar ? apiConfig.avatar(name) : avatar}
        alt={name}
        className="rounded-full"
        width={size}
        height={size}
      />
      <div className="flex flex-col gap-1">
        <TextHeading className="text-base/3 font-semibold">{name}</TextHeading>
        {role && (
          <TextDescription className="text-sm text-gray-500">
            {ROLE_TOPIC.find(item => item.value === role)?.label}
          </TextDescription>
        )}
      </div>
    </div>
  );
}
