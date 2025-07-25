import MyImage from '@/components/common/MyImage';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_GitHub_GetUserInfo from '@/hooks/query-hooks/Github/useQ_GitHub_GetUserInfo';
import { IUser } from '@/interfaces/user';
import apiConfig from '@/lib/api';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconMail, IconUsersGroup } from '@tabler/icons-react';
import { ExternalLink, Pen, Star } from 'lucide-react';
import Link from 'next/link';

export default function UserDetail({ user }: { user: IUser }) {
  const { data: GitHubUser } = useQ_GitHub_GetUserInfo({
    username: user?.username ?? '',
    options: {
      enabled: !!user?.uid,
    },
  });

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <TextHeading className="text-2xl font-bold">Profile</TextHeading>
          <Button variant="outline" size="icon">
            <Pen size={16} />
          </Button>
        </div>
        <div className="flex items-center gap-2 bg-background-1 rounded-xl w-full">
          <div className="flex items-center gap-2 w-[120px] h-[120px] justify-center">
            <MyImage  
              src={user?.avatar ?? apiConfig.avatar(user?.name)}
              alt={user?.avatar ?? ''}
              className="object-cover w-full h-full circle rounded-xl"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <TextHeading className="text-lg font-bold">{user?.name}</TextHeading>
          <div className="flex flex-row gap-1">
            <TextDescription>{'@' + user?.username}</TextDescription>
            <TextDescription className="text-gray-500">
              {'Tham gia ' + utils_DateToDDMMYYYY(user?.createdAt ?? new Date())}
            </TextDescription>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mt-2">
          <IconMail className="text-color-2" size={16} />
          <TextDescription>{user?.email}</TextDescription>
        </div>
        {GitHubUser && (
          <>
            <div className="flex flex-row items-center gap-2 mt-2">
              <IconUsersGroup className="text-color-2" size={16} />
              <TextDescription className="text-color-1 font-bold">
                {GitHubUser?.followers}
              </TextDescription>
              <TextDescription>followers</TextDescription>
              <div className="w-1 h-1 bg-color-2 rounded-full"></div>
              <TextDescription className="text-color-1 font-bold">
                {GitHubUser?.following}
              </TextDescription>
              <TextDescription>following</TextDescription>
            </div>
            <div className="flex flex-row gap-2 mt-2">
              <div className="flex flex-row gap-1 items-center">
                <Star className="text-color-2" size={16} />
                <TextDescription className="text-color-1 font-bold">
                  {GitHubUser?.public_repos}
                </TextDescription>
                <TextDescription>repositories</TextDescription>
              </div>
            </div>
            <Button variant="outline" size="icon" className="w-full mt-4">
              <Link
                href={`https://github.com/${GitHubUser?.login}`}
                target="_blank"
                className="flex flex-row gap-2 items-center"
              >
                <ExternalLink /> Go to GitHub
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
