import React from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  Download,
  Settings
} from 'lucide-react';
import TextHeading, { TextDescription } from '@/components/ui/text';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Users,
      label: 'Quản lý Sinh viên',
      color: 'text-blue-500'
    },
    {
      icon: BookOpen,
      label: 'Quản lý Dự án',
      color: 'text-green-500'
    },
    {
      icon: GraduationCap,
      label: 'Quản lý Giảng viên',
      color: 'text-purple-500'
    },
    {
      icon: BarChart3,
      label: 'Báo cáo Đánh giá',
      color: 'text-orange-500'
    },
    {
      icon: Download,
      label: 'Xuất Kết quả',
      color: 'text-indigo-500'
    },
    {
      icon: Settings,
      label: 'Cài đặt Hệ thống',
      color: 'text-teal-500'
    }
  ];

  return (
    <div className="bg-background-1 rounded-lg p-6 shadow-sm border border-border">
      <TextHeading className="text-lg font-semibold mb-4">Thao tác nhanh</TextHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-background-1">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button 
              key={index}
              className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon className={`w-6 h-6 ${action.color} mb-2`} />
              <TextDescription className="text-sm">{action.label}</TextDescription>
            </button>
          );
        })}
      </div>
    </div>
  );
}; 