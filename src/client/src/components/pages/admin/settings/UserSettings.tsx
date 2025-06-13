import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserSettingsProps {
  settings: {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    defaultRole: string;
    maxUsers: number;
  };
  onUpdate: (field: string, value: string | boolean | number) => void;
}

export default function UserSettings({ settings, onUpdate }: UserSettingsProps) {
  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowRegistration"
              checked={settings.allowRegistration}
              onCheckedChange={checked => onUpdate('allowRegistration', checked as boolean)}
            />
            <Label htmlFor="allowRegistration" className="text-sm font-medium">
              Cho phép đăng ký
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="requireEmailVerification"
              checked={settings.requireEmailVerification}
              onCheckedChange={checked => onUpdate('requireEmailVerification', checked as boolean)}
            />
            <Label htmlFor="requireEmailVerification" className="text-sm font-medium">
              Xác thực email
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="defaultRole">Vai trò mặc định</Label>
            <Select
              value={settings.defaultRole}
              onValueChange={value => onUpdate('defaultRole', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò mặc định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Người dùng</SelectItem>
                <SelectItem value="moderator">Điều hành viên</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxUsers">Số người dùng tối đa</Label>
            <Input
              id="maxUsers"
              type="number"
              value={settings.maxUsers}
              onChange={e => onUpdate('maxUsers', parseInt(e.target.value) || 0)}
              placeholder="Nhập số người dùng tối đa"
            />
          </div>
        </div>
    </div>
  );
} 