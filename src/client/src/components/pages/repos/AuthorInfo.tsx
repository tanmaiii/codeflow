import MyImage from '@/components/common/MyImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TextHeading from '@/components/ui/text';
import apiConfig from '@/lib/api';
import { IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface AuthorInfoProps {
  email: string;
  name: string;
  avatar: string;
  bio?: string;
}

export default function AuthorInfo({ email, name, avatar, bio }: AuthorInfoProps) {
  const t = useTranslations('repos');
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <IconUser className="size-4" />
          {t('author')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <MyImage
            src={avatar}
            alt="logo"
            width={60}
            height={60}
            className="w-16 h-16 object-cover rounded-full"
            defaultSrc={apiConfig.avatar(name ?? 'c')}
          />
          <div>
            <TextHeading className="font-semibold">{name || email}</TextHeading>
            <p className="text-sm text-muted-foreground">{email}</p>
            {bio && <p className="text-xs text-muted-foreground mt-1">{bio}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
