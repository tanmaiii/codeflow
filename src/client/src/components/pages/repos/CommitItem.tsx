import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TextHeading from '@/components/ui/text';
import { IconGitCommit } from '@tabler/icons-react';

interface CommitItemProps {
  id: string;
  hash: string;
  message: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  additions: number;
  deletions: number;
}

export default function CommitItem({
  hash,
  message,
  description,
  author,
  date,
  additions,
  deletions,
}: CommitItemProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <IconGitCommit className="size-4 text-muted-foreground mt-1" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <TextHeading className="font-semibold">{message}</TextHeading>
            <Badge variant="outline" className="font-mono text-xs">
              {hash}
            </Badge>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Avatar className="size-5">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{author.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-600">+{additions}</span>
          <span className="text-red-600">-{deletions}</span>
        </div>

        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
} 