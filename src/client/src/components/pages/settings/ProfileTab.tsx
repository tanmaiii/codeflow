import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"

interface ProfileData {
  name: string
  email: string
  bio: string
  avatar: string
  phone: string
  location: string
}

interface ProfileTabProps {
  profileData: ProfileData
  onProfileChange: (key: string, value: string) => void
}

export function ProfileTab({ profileData, onProfileChange }: ProfileTabProps) {
  const t = useTranslations('settings')
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('personalInfo')}</CardTitle>
        <CardDescription>
          {t('personalInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileData.avatar} />
            <AvatarFallback className="text-lg">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {t('uploadNewPhoto')}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t('photoRequirements')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('fullName')}</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => onProfileChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => onProfileChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => onProfileChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">{t('location')}</Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => onProfileChange("location", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">{t('bio')}</Label>
          <Textarea
            id="bio"
            placeholder={t('bioPlaceholder')}
            value={profileData.bio}
            onChange={(e) => onProfileChange("bio", e.target.value)}
            rows={4}
          />
        </div>

        <Button>{t('saveChanges')}</Button>
      </CardContent>
    </Card>
  )
} 