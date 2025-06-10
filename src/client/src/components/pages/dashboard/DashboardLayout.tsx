'use client';
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/stores/user_store";
import { ROLE } from "@/constants/enum";
import Dashboard_CardUser from "./DashboardCardUser";
import DashboardStudentView from "./DashboardStudentView";
import DashboardTeacherView from "./DashboardTeacherView";

export default function DashboardLayout() {
  const { user } = useUserStore();

  // Determine which dashboard view to render based on user role
  const renderDashboardContent = () => {
    if (!user) {
      return (
        <Card className="min-h-[100vh]">
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Đang tải thông tin người dùng...</p>
          </div>
        </Card>
      );
    }

    switch (user.role) {
      case ROLE.TEACHER:
        return <DashboardTeacherView />;
      case ROLE.ADMIN:
        return <DashboardTeacherView />; // Admin uses same view as teacher for now
      case ROLE.USER:
      default:
        return <DashboardStudentView />;
    }
  };

  return (
    <div className="grid gap-5 grid-cols-12 py-2">
      <div className="col-span-9">
        {renderDashboardContent()}
      </div>
      <div className="col-span-3">
        <Dashboard_CardUser />
      </div>
    </div>
  );
}
