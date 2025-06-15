import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LogOut, Trash2 } from "lucide-react"

interface DangerZoneSectionProps {
  onDeleteAccount: () => void
}

export function DangerZoneSection({ onDeleteAccount }: DangerZoneSectionProps) {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
        <CardDescription>
          Các hành động này không thể hoàn tác. Hãy thận trọng!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
          <div className="space-y-1">
            <Label className="text-destructive">Xóa tài khoản</Label>
            <p className="text-sm text-muted-foreground">
              Xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Xóa tài khoản
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa tài khoản?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Tài khoản và tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Xóa tài khoản
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg">
          <div className="space-y-1">
            <Label className="text-orange-600">Đăng xuất tất cả thiết bị</Label>
            <p className="text-sm text-muted-foreground">
              Đăng xuất khỏi tất cả thiết bị và phiên đăng nhập
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50">
            <LogOut className="h-4 w-4" />
            Đăng xuất tất cả
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 