import * as React from 'react';
import { cn } from '@/lib/utils';
import { MyTooltip } from '../MyTooltip';
import Image from 'next/image';
interface AvatarProps {
  url: string;
  name: string;
  alt: string;
}

interface AvatarGroupProps extends React.ComponentProps<'div'> {
  avatars: AvatarProps[];
  max?: number;
}

const AvatarGroup = ({ avatars, max, className, ...props }: AvatarGroupProps) => {
  const totalAvatars = avatars.length;
  const displayedAvatars = max ? avatars.slice(0, max).reverse() : avatars.reverse();
  const remainingAvatars = max && totalAvatars > max ? totalAvatars - max : 0;

  return (
    <div className={cn('flex', className)} {...props}>
      {displayedAvatars.reverse().map((avatar, index) => {
        return (
          <MyTooltip key={index} content={avatar.name}>
            <div key={index} className="-ml-2 hover:z-10 relative">
              <div className="h-7 w-7 rounded-full overflow-hidden ring-2 ring-background">
                <Image 
                  src={avatar.url} 
                  alt={avatar.alt} 
                  width={32}
                  height={32}
                  className="object-cover h-full w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'bg-muted-foreground text-white flex items-center justify-center h-full w-full';
                      fallback.textContent = avatar.name.charAt(0);
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          </MyTooltip>
        );
      })}
      {remainingAvatars > 0 && (
        <div className="h-8 w-8 rounded-full overflow-hidden -ml-2 hover:z-10 relative ring-2 ring-background flex items-center justify-center bg-muted-foreground text-white">
          <span className="text-xs font-medium">+{remainingAvatars}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
