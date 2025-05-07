import { Card } from "@/components/ui/card";
import Dashboard_CardUser from "./Dashboard_CardUser";

export default function Dashboard_Layout() {
  return (
    <div className="grid gap-5 grid-cols-12 py-2">
      <div className="col-span-9">
        <Card className="min-h-[100vh]">
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the dashboard!</p>
          </div>
        </Card>
      </div>
      <div className="col-span-3">
        <Dashboard_CardUser />
      </div>
    </div>
  );
}
