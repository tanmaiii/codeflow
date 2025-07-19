import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

interface QuickActionsProps {
  onOpenRepository: () => void;
}

export default function QuickActions({ onOpenRepository }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onOpenRepository}
          >
            <IconBrandGithub className="size-4 mr-2" />
            Open Repository
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onOpenRepository}
          >
            <IconExternalLink className="size-4 mr-2" />
            External Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 