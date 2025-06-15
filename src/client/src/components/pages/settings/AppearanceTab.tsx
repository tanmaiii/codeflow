import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"

interface AppearanceSettings {
  theme: string
  language: string
  compactMode: boolean
}

interface AppearanceTabProps {
  settings: AppearanceSettings
  onSettingChange: (key: string, value: string | boolean) => void
}

export function AppearanceTab({ settings, onSettingChange }: AppearanceTabProps) {
  const t = useTranslations('settings')
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('appearanceTitle')}</CardTitle>
        <CardDescription>
          {t('appearanceDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('theme')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('themeDescription')}
              </p>
            </div>
            <Select value={settings.theme} onValueChange={(value) => onSettingChange("theme", value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('themeLight')}</SelectItem>
                <SelectItem value="dark">{t('themeDark')}</SelectItem>
                <SelectItem value="system">{t('themeSystem')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('language')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('languageDescription')}
              </p>
            </div>
            <Select value={settings.language} onValueChange={(value) => onSettingChange("language", value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">{t('languageVi')}</SelectItem>
                <SelectItem value="en">{t('languageEn')}</SelectItem>
                <SelectItem value="jp">{t('languageJp')}</SelectItem>
                <SelectItem value="ko">{t('languageKo')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('compactMode')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('compactModeDescription')}
              </p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => onSettingChange("compactMode", checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 