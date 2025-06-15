import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Key } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface PasswordData {
  current: string
  new: string
  confirm: string
}

interface PasswordSectionProps {
  passwords: PasswordData
  onPasswordsChange: (passwords: PasswordData) => void
  onPasswordChange: () => void
}

export function PasswordSection({ passwords, onPasswordsChange, onPasswordChange }: PasswordSectionProps) {
  const t = useTranslations('settings')
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordFieldChange = (field: keyof PasswordData, value: string) => {
    onPasswordsChange({ ...passwords, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('passwordTitle')}</CardTitle>
        <CardDescription>
          {t('passwordDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">{t('currentPassword')}</Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showPassword ? "text" : "password"}
              value={passwords.current}
              onChange={(e) => handlePasswordFieldChange("current", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">{t('newPassword')}</Label>
          <Input
            id="new-password"
            type="password"
            value={passwords.new}
            onChange={(e) => handlePasswordFieldChange("new", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">{t('confirmNewPassword')}</Label>
          <Input
            id="confirm-password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => handlePasswordFieldChange("confirm", e.target.value)}
          />
        </div>
        <Button onClick={onPasswordChange} className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {t('updatePassword')}
        </Button>
      </CardContent>
    </Card>
  )
} 