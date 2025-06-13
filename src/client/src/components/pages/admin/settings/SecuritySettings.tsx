import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SecuritySettingsProps {
  settings: {
    twoFactorAuth: boolean;
    passwordMinLength: number;
    sessionTimeout: number;
    loginAttempts: number;
  };
  onUpdate: (field: string, value: string | boolean | number) => void;
}

export default function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  return (
      <div className="flex flex-col p-6 gap-6">
      <div className="flex items-center space-x-2">
          <Checkbox
            id="twoFactorAuth"
            checked={settings.twoFactorAuth}
            onCheckedChange={checked => onUpdate('twoFactorAuth', checked as boolean)}
          />
          <Label htmlFor="twoFactorAuth" className="text-sm font-medium">
            Xác thực hai yếu tố (2FA)
          </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="passwordMinLength">Độ dài mật khẩu tối thiểu</Label>
            <Input
              id="passwordMinLength"
              type="number"
              min="6"
              max="20"
              value={settings.passwordMinLength}
              onChange={e => onUpdate('passwordMinLength', parseInt(e.target.value) || 6)}
              placeholder="Nhập độ dài tối thiểu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Thời gian hết hạn phiên (phút)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={e => onUpdate('sessionTimeout', parseInt(e.target.value) || 30)}
              placeholder="Nhập thời gian hết hạn"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loginAttempts">Số lần đăng nhập sai tối đa</Label>
          <Input
            id="loginAttempts"
            type="number"
            min="3"
            max="10"
            value={settings.loginAttempts}
            onChange={e => onUpdate('loginAttempts', parseInt(e.target.value) || 5)}
            placeholder="Nhập số lần đăng nhập sai tối đa"
            className="w-full md:w-1/2"
          />
        </div>
      </div>
  );
} 