import { DangerZoneSection } from "./DangerZoneSection"
import { PasswordSection } from "./PasswordSection"
import { SecuritySettingsSection } from "./SecuritySettingsSection"

interface PasswordData {
  current: string
  new: string
  confirm: string
}

interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  showOnlineStatus: boolean
  profileVisibility: string
}

interface SecurityTabProps {
  passwords: PasswordData
  settings: SecuritySettings
  onPasswordsChange: (passwords: PasswordData) => void
  onPasswordChange: () => void
  onSettingChange: (key: string, value: string | boolean) => void
  onDeleteAccount: () => void
}

export function SecurityTab({ 
  passwords, 
  settings, 
  onPasswordsChange, 
  onPasswordChange, 
  onSettingChange, 
  onDeleteAccount 
}: SecurityTabProps) {
  return (
    <div className="space-y-6">
      <PasswordSection 
        passwords={passwords}
        onPasswordsChange={onPasswordsChange}
        onPasswordChange={onPasswordChange}
      />
      
      <SecuritySettingsSection 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      
      <DangerZoneSection 
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  )
} 