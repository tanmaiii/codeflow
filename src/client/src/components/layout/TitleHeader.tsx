import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import TextHeading from '../ui/text';
import { useRouter } from 'next/navigation';
interface TitleHeaderProps {
  title: string;
  description?: string;
  onBack?: boolean;
}

function TitleHeader({ title, description, onBack }: TitleHeaderProps) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      router.back();
    }
  };

  return (
    <div className="flex items-center gap-2 pb-4">
      {onBack && (
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      )}
      <div className="flex flex-col gap-0">
        <TextHeading className="text-2xl">{title}</TextHeading>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

export default TitleHeader;
