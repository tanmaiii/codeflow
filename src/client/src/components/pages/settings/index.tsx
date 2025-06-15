"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Palette,
  Shield,
  User
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { AppearanceTab } from "./AppearanceTab"
import { NotificationsTab } from "./NotificationsTab"
import { ProfileTab } from "./ProfileTab"
import { SecurityTab } from "./SecurityTab"

export default function Settings() {
  const t = useTranslations('settings')
  
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating amazing user experiences.",
    avatar: "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  })

  const [settings, setSettings] = useState({
    // Appearance
    theme: "system",
    language: "vi",
    compactMode: false,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    
    // Privacy & Security
    twoFactorAuth: false,
    loginAlerts: true,
    dataSharing: false,
    profileVisibility: "public",
    
    // General
    autoSave: true,
    showOnlineStatus: true
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  })

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast.success(t('settingsUpdated'))
  }

  const handleProfileChange = (key: string, value: string) => {
    setProfileData(prev => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error(t('passwordMismatch'))
      return
    }
    
    if (passwords.new.length < 8) {
      toast.error(t('passwordTooShort'))
      return
    }
    
    // Simulate password change
    toast.success(t('passwordUpdated'))
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleDeleteAccount = () => {
    toast.error(t('deleteAccountUnavailable'))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('profile')}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t('appearance')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t('notifications')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('security')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileTab 
            profileData={profileData}
            onProfileChange={handleProfileChange}
          />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AppearanceTab 
            settings={{
              theme: settings.theme,
              language: settings.language,
              compactMode: settings.compactMode
            }}
            onSettingChange={handleSettingChange}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsTab 
            settings={{
              emailNotifications: settings.emailNotifications,
              pushNotifications: settings.pushNotifications,
              projectUpdates: settings.projectUpdates,
              securityAlerts: settings.securityAlerts,
              marketingEmails: settings.marketingEmails
            }}
            onSettingChange={handleSettingChange}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityTab 
            passwords={passwords}
            settings={{
              twoFactorAuth: settings.twoFactorAuth,
              loginAlerts: settings.loginAlerts,
              showOnlineStatus: settings.showOnlineStatus,
              profileVisibility: settings.profileVisibility
            }}
            onPasswordsChange={setPasswords}
            onPasswordChange={handlePasswordChange}
            onSettingChange={handleSettingChange}
            onDeleteAccount={handleDeleteAccount}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
