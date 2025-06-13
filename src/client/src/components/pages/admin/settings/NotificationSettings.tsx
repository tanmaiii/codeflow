import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    adminAlerts: boolean;
  };
  onUpdate: (field: string, value: boolean) => void;
}

export default function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  return (
      <div className="flex flex-col p-6 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={checked => onUpdate('emailNotifications', checked as boolean)}
            />
            <Label htmlFor="emailNotifications" className="text-sm font-medium">
              Thông báo qua email
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={checked => onUpdate('pushNotifications', checked as boolean)}
            />
            <Label htmlFor="pushNotifications" className="text-sm font-medium">
              Thông báo đẩy
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="adminAlerts"
              checked={settings.adminAlerts}
              onCheckedChange={checked => onUpdate('adminAlerts', checked as boolean)}
            />
            <Label htmlFor="adminAlerts" className="text-sm font-medium">
              Cảnh báo quản trị
            </Label>
          </div>
        </div>
      </div>
  );
} 