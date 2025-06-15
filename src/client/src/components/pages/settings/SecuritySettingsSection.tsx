import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"

interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  showOnlineStatus: boolean
  profileVisibility: string
}

interface SecuritySettingsSectionProps {
  settings: SecuritySettings
  onSettingChange: (key: string, value: string | boolean) => void
}

export function SecuritySettingsSection({ settings, onSettingChange }: SecuritySettingsSectionProps) {
  const t = useTranslations('settings')
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('securityPrivacyTitle')}</CardTitle>
        <CardDescription>
          {t('securityPrivacyDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('twoFactorAuth')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('twoFactorAuthDescription')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {settings.twoFactorAuth && (
                <Badge variant="secondary">{t('twoFactorAuthEnabled')}</Badge>
              )}
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => onSettingChange("twoFactorAuth", checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('loginAlerts')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('loginAlertsDescription')}
              </p>
            </div>
            <Switch
              checked={settings.loginAlerts}
              onCheckedChange={(checked) => onSettingChange("loginAlerts", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('showOnlineStatus')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('showOnlineStatusDescription')}
              </p>
            </div>
            <Switch
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked) => onSettingChange("showOnlineStatus", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('profileVisibility')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('profileVisibilityDescription')}
              </p>
            </div>
            <Select value={settings.profileVisibility} onValueChange={(value) => onSettingChange("profileVisibility", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">{t('profileVisibilityPublic')}</SelectItem>
                <SelectItem value="friends">{t('profileVisibilityFriends')}</SelectItem>
                <SelectItem value="private">{t('profileVisibilityPrivate')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 