import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface AppearanceSettingsProps {
  settings: {
    theme: string;
    primaryColor: string;
    allowUserThemes: boolean;
  };
  onUpdate: (field: string, value: string | boolean) => void;
}

export default function AppearanceSettings({ settings, onUpdate }: AppearanceSettingsProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Chủ đề</Label>
            <Select value={settings.theme} onValueChange={value => onUpdate('theme', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Sáng</SelectItem>
                <SelectItem value="dark">Tối</SelectItem>
                <SelectItem value="auto">Tự động</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryColor">Màu chủ đạo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="primaryColor"
                type="color"
                value={settings.primaryColor}
                onChange={e => onUpdate('primaryColor', e.target.value)}
                className="w-20 h-10 p-1 border rounded-md cursor-pointer"
              />
              <Input
                type="text"
                value={settings.primaryColor}
                onChange={e => onUpdate('primaryColor', e.target.value)}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="allowUserThemes"
            checked={settings.allowUserThemes}
            onCheckedChange={checked => onUpdate('allowUserThemes', checked as boolean)}
          />
          <Label htmlFor="allowUserThemes" className="text-sm font-medium">
            Cho phép người dùng tùy chỉnh giao diện
          </Label>
        </div>
      </CardContent>
    </Card>
  );
} 