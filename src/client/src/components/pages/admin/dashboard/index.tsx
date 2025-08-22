'use client';
import StatCard from '@/components/common/StatCard';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import useQ_Repos_GetAll from '@/hooks/query-hooks/Repos/useQ_Repos_GetAll';
import useQ_User_GetAll from '@/hooks/query-hooks/User/useQ_User_GetAll';
import { IconMessageCircle } from '@tabler/icons-react';
import { BookOpen, Folder, Users } from 'lucide-react';
import {
  ChartCommit,
  ChartComplexity,
  ChartPieCoursesStatus,
  ChartPieCoursesType,
  ChartPieLanguage,
  ChartTags,
  ChartTopic,
  FeaturedCourses,
  FeaturedStudents,
} from './components';

export default function Dashboard() {
  const { data: users } = useQ_User_GetAll({ params: { page: 1, limit: 0 } });
  const { data: courses } = useQ_Course_GetAll({ params: { page: 1, limit: 0 } });
  const { data: repos } = useQ_Repos_GetAll({ params: { page: 1, limit: 0 } });
  const { data: posts } = useQ_Post_GetAll({ params: { page: 1, limit: 0 } });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <TextHeading className="text-4xl font-bold">Codeflow</TextHeading>
              <TextDescription className="text-sm text-gray-500"></TextDescription>
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tổng người dùng"
            value={users?.pagination?.totalItems.toLocaleString('vi-VN') ?? '0'}
            icon={Users}
            color="default"
          />
          <StatCard
            title="Tổng khóa học"
            value={courses?.pagination?.totalItems.toLocaleString('vi-VN') ?? '0'}
            icon={BookOpen}
            color="success"
          />
          <StatCard
            title="Tổng đề tài"
            value={repos?.pagination?.totalItems.toLocaleString('vi-VN') ?? '0'}
            icon={Folder}
            color="warning"
          />
          <StatCard
            title="Tổng bài viết"
            value={posts?.pagination?.totalItems.toLocaleString('vi-VN') ?? '0'}
            icon={IconMessageCircle}
            color="success"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* TODO: Mockdata */}
          <ChartCommit />
          {/* TODO: Mockdata */}
          <ChartTags />
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* TODO: Mockdata */}
          <ChartPieLanguage />
          {/* TODO: Mockdata */}
          <ChartPieCoursesType />
          {/* TODO: Mockdata */}
          <ChartTopic />
        </div>

        {/* Test & Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">
          {/* TODO: Mockdata */}
          <ChartPieCoursesStatus />
          {/* TODO: Mockdata */}
          <ChartComplexity />
        </div>

        {/* Featured Students and Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FeaturedStudents />
          <FeaturedCourses />
        </div>
      </div>
    </div>
  );
}
