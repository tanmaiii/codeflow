export const mockCourseData = {
  totalStudents: 45,
  activeStudents: 38,
  completionRate: 76,
  totalAssignments: 12,
  submittedAssignments: 420,
  totalTopics: 8,
  discussionPosts: 89,
};

export const mockCodeActivity = [
  { date: '2024-01-15', commits: 24, pullRequests: 8, codeAnalysis: 12 },
  { date: '2024-01-16', commits: 32, pullRequests: 12, codeAnalysis: 18 },
  { date: '2024-01-17', commits: 18, pullRequests: 6, codeAnalysis: 10 },
  { date: '2024-01-18', commits: 45, pullRequests: 15, codeAnalysis: 22 },
  { date: '2024-01-19', commits: 38, pullRequests: 11, codeAnalysis: 16 },
  { date: '2024-01-20', commits: 28, pullRequests: 9, codeAnalysis: 14 },
  { date: '2024-01-21', commits: 35, pullRequests: 13, codeAnalysis: 19 },
];

export const mockProjectProgress = [
  { 
    project: 'Hệ thống quản lý thư viện', 
    completionRate: 95, 
    milestonesCompleted: 8, 
    totalMilestones: 10,
    participationRate: 88,
    difficulty: 'easy',
    studentsWorking: 12,
    status: 'nearly_completed'
  },
  { 
    project: 'Website thương mại điện tử', 
    completionRate: 87, 
    milestonesCompleted: 7, 
    totalMilestones: 10,
    participationRate: 82,
    difficulty: 'medium',
    studentsWorking: 15,
    status: 'in_progress'
  },
  { 
    project: 'Ứng dụng mobile quản lý chi tiêu', 
    completionRate: 75, 
    milestonesCompleted: 6, 
    totalMilestones: 10,
    participationRate: 76,
    difficulty: 'medium',
    studentsWorking: 8,
    status: 'in_progress'
  },
  { 
    project: 'Hệ thống IoT giám sát môi trường', 
    completionRate: 68, 
    milestonesCompleted: 5, 
    totalMilestones: 10,
    participationRate: 70,
    difficulty: 'hard',
    studentsWorking: 6,
    status: 'in_progress'
  },
  { 
    project: 'AI chatbot hỗ trợ học tập', 
    completionRate: 45, 
    milestonesCompleted: 3, 
    totalMilestones: 10,
    participationRate: 65,
    difficulty: 'hard',
    studentsWorking: 4,
    status: 'early_stage'
  },
];

export const mockActiveStudents = [
  { name: 'Nguyễn Văn A', assignments: 12, participation: 95, lastActive: '2 giờ trước' },
  { name: 'Trần Thị B', assignments: 11, participation: 92, lastActive: '5 giờ trước' },
  { name: 'Lê Văn C', assignments: 12, participation: 88, lastActive: '1 ngày trước' },
  { name: 'Phạm Thị D', assignments: 10, participation: 85, lastActive: '3 giờ trước' },
  { name: 'Hoàng Văn E', assignments: 11, participation: 82, lastActive: '6 giờ trước' },
  { name: 'Nguyễn Văn A', assignments: 12, participation: 95, lastActive: '2 giờ trước' },
  { name: 'Trần Thị B', assignments: 11, participation: 92, lastActive: '5 giờ trước' },
  { name: 'Lê Văn C', assignments: 12, participation: 88, lastActive: '1 ngày trước' },
  { name: 'Phạm Thị D', assignments: 10, participation: 85, lastActive: '3 giờ trước' },
  { name: 'Hoàng Văn E', assignments: 11, participation: 82, lastActive: '6 giờ trước' },
];

export const mockDailyActivity = [
  { date: '2024-01-15', logins: 28, submissions: 12, discussions: 8 },
  { date: '2024-01-16', logins: 32, submissions: 15, discussions: 12 },
  { date: '2024-01-17', logins: 25, submissions: 8, discussions: 6 },
  { date: '2024-01-18', logins: 35, submissions: 18, discussions: 14 },
  { date: '2024-01-19', logins: 30, submissions: 14, discussions: 10 },
  { date: '2024-01-20', logins: 20, submissions: 5, discussions: 3 },
  { date: '2024-01-21', logins: 15, submissions: 3, discussions: 2 },
];

export const mockClassPerformance = {
  avgAttendance: 85,
  avgCompletion: 76,
  avgParticipation: 78,
  avgEngagement: 82,
  avgPunctuality: 90,
  avgCollaboration: 75,
};

export const mockBestProjects = [
  {
    name: 'Hệ thống quản lý bán hàng online',
    completionRate: 94,
    avgScore: 8.7,
    studentsWorking: 3,
    commits: 127,
    rating: 4.8,
    mentor: 'TS. Nguyễn Văn A',
  },
  {
    name: 'Ứng dụng học tập thông minh với AI',
    completionRate: 89,
    avgScore: 8.4,
    studentsWorking: 2,
    commits: 98,
    rating: 4.7,
    mentor: 'TS. Trần Thị B',
  },
  {
    name: 'Website tin tức với CMS tùy chỉnh',
    completionRate: 87,
    avgScore: 8.2,
    studentsWorking: 2,
    commits: 156,
    rating: 4.6,
    mentor: 'TS. Lê Văn C',
  },
  {
    name: 'Hệ thống booking khách sạn',
    completionRate: 91,
    avgScore: 7.9,
    studentsWorking: 1,
    commits: 89,
    rating: 4.5,
    mentor: 'TS. Phạm Thị D',
  },
  {
    name: 'Ứng dụng fitness tracking',
    completionRate: 78,
    avgScore: 7.5,
    studentsWorking: 2,
    commits: 67,
    rating: 4.3,
    mentor: 'TS. Hoàng Văn E',
  },
];

export const mockTopicApproval = [
  { 
    topicName: 'Hệ thống quản lý thư viện', 
    studentName: 'Nguyễn Văn A',
    mentor: 'TS. Trần Thị B',
    category: 'Web Development',
    difficulty: 'Trung cấp',
    submittedDate: '2024-01-15',
    status: 'pending'
  },
  { 
    topicName: 'Website thương mại điện tử', 
    studentName: 'Lê Văn C',
    mentor: 'TS. Phạm Thị D',
    category: 'E-commerce',
    difficulty: 'Nâng cao',
    submittedDate: '2024-01-10',
    status: 'approved'
  },
  { 
    topicName: 'Ứng dụng mobile quản lý chi tiêu', 
    studentName: 'Hoàng Văn E',
    mentor: 'TS. Vũ Thị F',
    category: 'Mobile Development',
    difficulty: 'Trung cấp',
    submittedDate: '2024-01-08',
    status: 'rejected'
  },
  { 
    topicName: 'Hệ thống IoT giám sát môi trường', 
    studentName: 'Nguyễn Thị G',
    mentor: 'TS. Đỗ Văn H',
    category: 'IoT',
    difficulty: 'Nâng cao',
    submittedDate: '2024-01-12',
    status: 'pending'
  },
  { 
    topicName: 'AI chatbot hỗ trợ học tập', 
    studentName: 'Trần Văn I',
    mentor: 'TS. Lê Thị K',
    category: 'AI/ML',
    difficulty: 'Nâng cao',
    submittedDate: '2024-01-05',
    status: 'approved'
  },
  { 
    topicName: 'Hệ thống quản lý bán hàng', 
    studentName: 'Phạm Văn L',
    mentor: 'TS. Nguyễn Văn M',
    category: 'Business Management',
    difficulty: 'Cơ bản',
    submittedDate: '2024-01-03',
    status: 'rejected'
  },
];
