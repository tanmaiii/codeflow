'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/user_store";
import { ROLE_USER } from "@/constants/object";
import { ROLE } from "@/constants/enum";
import apiConfig from "@/lib/api";
import { 
  IconUser, 
  IconMail, 
  IconBook, 
  IconChalkboard, 
  IconSettings,
  IconLogout,
  IconBell,
  IconCalendar
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { paths } from "@/data/path";
import tokenService from "@/services/token.service";
export default function DashboardCardUser() {
  const { user, removeUser } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    tokenService.clearTokens();
    removeUser();
    router.push("/login");
  };

  if (!user) {
    return (
      <Card className="p-4 min-h-[100vh]">
        <div className="text-center text-muted-foreground">
          Đang tải thông tin người dùng...
        </div>
      </Card>
    );
  }

  const userRole = ROLE_USER.find(role => role.value === user.role);

  return (
    <Card className="p-6 min-h-[85vh] flex flex-col">
      {/* User Profile Section */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage 
            src={user.avatar || apiConfig.avatar(user.name)} 
            alt={user.name} 
          />
          <AvatarFallback className="text-lg">
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <Badge 
            variant={user.role === ROLE.ADMIN ? "destructive" : 
                    user.role === ROLE.TEACHER ? "default" : "secondary"}
            className="text-sm"
          >
            {userRole?.label || 'Người dùng'}
          </Badge>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3 text-sm">
          <IconUser className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Username:</span>
          <span className="font-medium">{user.username}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm">
          <IconMail className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium text-xs">{user.email}</span>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Quick Actions */}
      <div className="space-y-3 flex-1">
        <h4 className="font-medium text-sm text-muted-foreground mb-3">
          Thao tác nhanh
        </h4>
        
        {/* Common Actions */}
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => router.push(paths.COURSES)}
        >
          <IconBook className="w-4 h-4 mr-2" />
          Khóa học
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => router.push(paths.NOTIFICATION)}
        >
          <IconBell className="w-4 h-4 mr-2" />
          Thông báo
        </Button>

        {/* Teacher/Admin specific actions */}
        {(user.role === ROLE.TEACHER || user.role === ROLE.ADMIN) && (
          <>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => router.push(paths.TOPICS)}
            >
              <IconChalkboard className="w-4 h-4 mr-2" />
              Quản lý đề tài
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => router.push(paths.COURSE_CREATE)}
            >
              <IconCalendar className="w-4 h-4 mr-2" />
              Tạo khóa học
            </Button>
          </>
        )}

        {/* Admin specific actions */}
        {user.role === ROLE.ADMIN && (
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => router.push(paths.USERS)}
          >
            <IconSettings className="w-4 h-4 mr-2" />
            Quản lý người dùng
          </Button>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleLogout}
        >
          <IconLogout className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </Card>
  );
}
