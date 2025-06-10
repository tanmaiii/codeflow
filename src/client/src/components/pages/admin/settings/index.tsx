'use client';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import TextHeading, { TextDescription } from '@/components/ui/text';
import {
  Bell,
  Database,
  Palette,
  RefreshCw,
  Save,
  Settings as SettingsIcon,
  Shield,
  Users,
} from 'lucide-react';
import { useState } from 'react';

interface SettingsData {
  general: {
    siteName: string;
    siteDescription: string;
    language: string;
    timezone: string;
  };
  user: {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    defaultRole: string;
    maxUsers: number;
  };
  security: {
    twoFactorAuth: boolean;
    passwordMinLength: number;
    sessionTimeout: number;
    loginAttempts: number;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    allowUserThemes: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    adminAlerts: boolean;
  };
  system: {
    backupFrequency: string;
    maintenanceMode: boolean;
    debugMode: boolean;
  };
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  // const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    general: {
      siteName: 'Admin Dashboard',
      siteDescription: 'Comprehensive admin management system',
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh',
    },
    user: {
      allowRegistration: true,
      requireEmailVerification: true,
      defaultRole: 'user',
      maxUsers: 1000,
    },
    security: {
      twoFactorAuth: false,
      passwordMinLength: 8,
      sessionTimeout: 30,
      loginAttempts: 5,
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3b82f6',
      allowUserThemes: true,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      adminAlerts: true,
    },
    system: {
      backupFrequency: 'daily',
      maintenanceMode: false,
      debugMode: false,
    },
  });

  const tabs = [
    { id: 'general', label: 'Tổng quan', icon: SettingsIcon },
    { id: 'user', label: 'Người dùng', icon: Users },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'system', label: 'Hệ thống', icon: Database },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Cài đặt đã được lưu thành công!');
    }, 1000);
  };

  const updateSettings = (
    section: keyof SettingsData,
    field: string,
    value: string | boolean | number,
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên trang web</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={e => updateSettings('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
          <Select
            value={settings.general.language}
            onValueChange={value => updateSettings('general', 'language', value)}
          >
            <SelectTrigger className="w-full">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả trang web</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={e => updateSettings('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
        <Select
          value={settings.general.timezone}
          onValueChange={value => updateSettings('general', 'timezone', value)}
        >
          <SelectTrigger className="w-full">
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

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.user.allowRegistration}
              onChange={e => updateSettings('user', 'allowRegistration', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Cho phép đăng ký</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.user.requireEmailVerification}
              onChange={e => updateSettings('user', 'requireEmailVerification', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Xác thực email</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò mặc định</label>

          <Select
            value={settings.user.defaultRole}
            onValueChange={value => updateSettings('user', 'defaultRole', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn vai trò mặc định" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Người dùng</SelectItem>
              <SelectItem value="moderator">Điều hành viên</SelectItem>
              <SelectItem value="admin">Quản trị viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số người dùng tối đa
          </label>
          <input
            type="number"
            value={settings.user.maxUsers}
            onChange={e => updateSettings('user', 'maxUsers', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={e => updateSettings('security', 'twoFactorAuth', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Xác thực hai yếu tố (2FA)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Độ dài mật khẩu tối thiểu
          </label>
          <input
            type="number"
            min="6"
            max="20"
            value={settings.security.passwordMinLength}
            onChange={e =>
              updateSettings('security', 'passwordMinLength', parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian hết hạn phiên (phút)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={e => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Số lần đăng nhập sai tối đa
        </label>
        <input
          type="number"
          min="3"
          max="10"
          value={settings.security.loginAttempts}
          onChange={e => updateSettings('security', 'loginAttempts', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
          <Select
            value={settings.appearance.theme}
            onValueChange={value => updateSettings('appearance', 'theme', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn chủ đề" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sáng</SelectItem>
              <SelectItem value="dark">Tối</SelectItem>
              <SelectItem value="auto">Tự động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Màu chủ đạo</label>
          <input
            type="color"
            value={settings.appearance.primaryColor}
            onChange={e => updateSettings('appearance', 'primaryColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.appearance.allowUserThemes}
            onChange={e => updateSettings('appearance', 'allowUserThemes', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Cho phép người dùng tùy chỉnh giao diện
          </span>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={e => updateSettings('notifications', 'emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Thông báo qua email</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={e => updateSettings('notifications', 'pushNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Thông báo đẩy</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.notifications.adminAlerts}
            onChange={e => updateSettings('notifications', 'adminAlerts', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Cảnh báo quản trị</span>
        </label>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tần suất sao lưu</label>
        <Select
          value={settings.system.backupFrequency}
          onValueChange={value => updateSettings('system', 'backupFrequency', value)}
        >
          <SelectTrigger className="w-full">
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.system.maintenanceMode}
            onChange={e => updateSettings('system', 'maintenanceMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Chế độ bảo trì</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.system.debugMode}
            onChange={e => updateSettings('system', 'debugMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Chế độ debug</span>
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'user':
        return renderUserSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-background-2 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <TextHeading className="text-3xl font-bold mb-2">Cài đặt hệ thống</TextHeading>
          <TextDescription className="text-sm">
            Quản lý và cấu hình các thiết lập của hệ thống
          </TextDescription>
        </div>

        <div className="bg-background-1 rounded-lg shadow-lg border overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>

          {/* Footer Actions */}
          <div className="bg-backgroud-1 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Đặt lại
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Đang lưu...' : 'Lưu cài đặt'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
