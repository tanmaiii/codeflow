import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface GeneralSettingsProps {
  settings: {
    siteName: string;
    siteDescription: string;
    language: string;
    timezone: string;
  };
  onUpdate: (field: string, value: string) => void;
}

export default function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">Tên trang web</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={e => onUpdate('siteName', e.target.value)}
            placeholder="Nhập tên trang web"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Ngôn ngữ</Label>
          <Select value={settings.language} onValueChange={value => onUpdate('language', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteDescription">Mô tả trang web</Label>
        <Textarea
          id="siteDescription"
          value={settings.siteDescription}
          onChange={e => onUpdate('siteDescription', e.target.value)}
          placeholder="Nhập mô tả trang web"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Múi giờ</Label>
        <Select value={settings.timezone} onValueChange={value => onUpdate('timezone', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn múi giờ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</SelectItem>
            <SelectItem value="UTC">UTC</SelectItem>
            <SelectItem value="America/New_York">America/New_York</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
