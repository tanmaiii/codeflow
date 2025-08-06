export interface DashboardStats {
  totalStudents: number;
  totalProjects: number;
  totalTeachers: number;
  averageScore: number;
  studentGrowth: number;
  projectGrowth: number;
  teacherGrowth: number;
  scoreGrowth: number;
}

export interface ChartData {
  scores: Array<{ date: string; value: number }>;
  projects: Array<{ date: string; value: number }>;
  submissions: Array<{ date: string; value: number }>;
  scoreDistribution: Array<{ name: string; value: number }>;
  projectTypes: Array<{ name: string; value: number }>;
  projectStatus: Array<{ name: string; value: number }>;
  activity: Array<{ hour: number; value: number }>;
}

export interface MetricCardProps {
  title: string;
  value: string;
  // growth: number;
  description?: string
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export type TimeRange = '7d' | '30d' | '90d'; 