import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { mockCourseData } from './mockData';

export default function QuickStatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Thống kê nhanh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tổng bài tập</span>
          <span className="font-semibold">{mockCourseData.totalAssignments}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Bài đã nộp</span>
          <span className="font-semibold">{mockCourseData.submittedAssignments}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tổng đề tài</span>
          <span className="font-semibold">{mockCourseData.totalTopics}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Bài thảo luận</span>
          <span className="font-semibold">{mockCourseData.discussionPosts}</span>
        </div>
      </CardContent>
    </Card>
  );
}
