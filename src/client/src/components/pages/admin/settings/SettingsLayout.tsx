import TextHeading, { TextDescription } from '@/components/ui/text';
import { ReactNode } from 'react';

interface SettingsLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function SettingsLayout({
  children,
  title = 'Cài đặt hệ thống',
  description = 'Quản lý và cấu hình các thiết lập của hệ thống',
}: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-background-2 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <TextHeading className="text-3xl font-bold mb-2">{title}</TextHeading>
          <TextDescription className="text-sm">{description}</TextDescription>
        </div>

        <div className="overflow-hidden p-0">{children}</div>
      </div>
    </div>
  );
}
