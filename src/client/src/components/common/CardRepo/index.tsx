import TextHeading from '@/components/ui/text';
import { IRepo } from '@/interfaces/repos';
import { IconBrandGithub } from '@tabler/icons-react';
import CardRepo_More from './CardRepo_More';

export default function CardRepo({ repo }: { repo: IRepo }) {
  return (
    <div
      key={repo.id}
      className="group relative flex cursor-pointer items-center gap-2 p-2 rounded-md border border-input hover:bg-accent/50 transition-colors"
    >
      <div
        onClick={() => {
          window.open(repo.url, '_blank');
        }}
        className="flex flex-row items-center gap-2"
      >
        <div className="p-2 bg-color-2/10 rounded-full">
          <IconBrandGithub className="size-4 text-muted-foreground" />
        </div>
        <TextHeading lineClamp={2} className="break-all text-sm font-medium">
          {repo.name}
        </TextHeading>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <CardRepo_More className="bg-white rounded-full" repo={repo} />
      </div>
    </div>
  );
}
