import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Mail, Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  projectUpdates: boolean
  securityAlerts: boolean
  marketingEmails: boolean
}

interface NotificationsTabProps {
  settings: NotificationSettings
  onSettingChange: (key: string, value: boolean) => void
}

export function NotificationsTab({ settings, onSettingChange }: NotificationsTabProps) {
  const t = useTranslations('settings')
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('notificationsTitle')}</CardTitle>
        <CardDescription>
          {t('notificationsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label>{t('emailNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('emailNotificationsDescription')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => onSettingChange("emailNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label>{t('pushNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('pushNotificationsDescription')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => onSettingChange("pushNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('projectUpdates')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('projectUpdatesDescription')}
              </p>
            </div>
            <Switch
              checked={settings.projectUpdates}
              onCheckedChange={(checked) => onSettingChange("projectUpdates", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('securityAlerts')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('securityAlertsDescription')}
              </p>
            </div>
            <Switch
              checked={settings.securityAlerts}
              onCheckedChange={(checked) => onSettingChange("securityAlerts", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('marketingEmails')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('marketingEmailsDescription')}
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => onSettingChange("marketingEmails", checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 