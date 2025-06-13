'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { toast } from 'sonner';
import AppearanceSettings from './AppearanceSettings';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import SettingsLayout from './SettingsLayout';
import SystemSettings from './SystemSettings';
import UserSettings from './UserSettings';

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
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Cài đặt đã được lưu thành công!');
    } catch {
      toast.error('Có lỗi xảy ra khi lưu cài đặt');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
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

    toast.success('Tất cả cài đặt đã được đặt về giá trị mặc định');
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

  return (
    <SettingsLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="grid w-full grid-cols-6 rounded-sm border-b">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <Card className='py-0'>
          <TabsContent value="general" className="mt-0">
            <GeneralSettings
              settings={settings.general}
              onUpdate={(field, value) => updateSettings('general', field, value)}
            />
          </TabsContent>

          <TabsContent value="user" className="mt-0">
            <UserSettings
              settings={settings.user}
              onUpdate={(field, value) => updateSettings('user', field, value)}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecuritySettings
              settings={settings.security}
              onUpdate={(field, value) => updateSettings('security', field, value)}
            />
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <AppearanceSettings
              settings={settings.appearance}
              onUpdate={(field, value) => updateSettings('appearance', field, value)}
            />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings
              settings={settings.notifications}
              onUpdate={(field, value) => updateSettings('notifications', field, value)}
            />
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <SystemSettings
              settings={settings.system}
              onUpdate={(field, value) => updateSettings('system', field, value)}
            />
          </TabsContent>

          {/* Footer Actions */}
          <CardContent className="border-t bg-muted/50 p-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Đặt lại</span>
              </Button>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? 'Đang lưu...' : 'Lưu cài đặt'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </SettingsLayout>
  );
}
