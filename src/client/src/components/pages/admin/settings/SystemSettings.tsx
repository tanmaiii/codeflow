  import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

  interface SystemSettingsProps {
    settings: {
      backupFrequency: string;
      maintenanceMode: boolean;
      debugMode: boolean;
    };
    onUpdate: (field: string, value: string | boolean) => void;
  }

  export default function SystemSettings({ settings, onUpdate }: SystemSettingsProps) {
    return (
      <div className="flex flex-col p-6 gap-6">
        <div className="space-y-2">
            <Label htmlFor="backupFrequency">Tần suất sao lưu</Label>
            <Select
              value={settings.backupFrequency}
              onValueChange={value => onUpdate('backupFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tần suất sao lưu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hàng giờ</SelectItem>
                <SelectItem value="daily">Hàng ngày</SelectItem>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="monthly">Hàng tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={checked => onUpdate('maintenanceMode', checked as boolean)}
              />
              <Label htmlFor="maintenanceMode" className="text-sm font-medium">
                Chế độ bảo trì
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="debugMode"
                checked={settings.debugMode}
                onCheckedChange={checked => onUpdate('debugMode', checked as boolean)}
              />
              <Label htmlFor="debugMode" className="text-sm font-medium">
                Chế độ debug
              </Label>
            </div>
          </div>
      </div>
    );
  } 