# Xây dựng hệ thống theo dõi dự án phần mềm làm việc nhóm của sinh viên qua GitHub Action

Hệ thống hỗ trợ giảng viên và sinh viên trong việc quản lý, theo dõi và đánh giá các dự án lập trình nhóm. Sinh viên có thể đăng ký môn học, chọn hoặc đề xuất đề tài, làm việc nhóm và nộp bài thông qua kho lưu trữ mã nguồn. Giảng viên có thể quản lý môn học, duyệt đề tài, theo dõi tiến độ của từng nhóm và đánh giá bài nộp dựa trên lịch sử commit, pull request và các công cụ phân tích mã nguồn.


### Công nghệ sử dụng
- Backend: Node.js, Express, Sequelize, MySQL

- Frontend: Next.js, React, TypeScript

- API: GitHub API, Webhook

- Công cụ đánh giá mã nguồn: SonarQube, ESLint

### Yêu cầu

Hệ thống đăng ký đề tài, thành viên nhóm, cho phép SV nộp bài qua Github, sử dụng github Action để đánh giá chất lượng mã tĩnh, sử dụng GithubAPI để đếm số lần nộp bài của thành viên, đánh giá đóng góp của mỗi thành viên, xây đựng dashboard thể hiện đóng góp