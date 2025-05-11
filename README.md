# 📌 Hệ thống Theo Dõi Dự Án Phần Mềm Làm Việc Nhóm Của Sinh Viên Qua GitHub Action

## 🔗 Yêu cầu đề tài

Hệ thống đăng ký đề tài, thành viên nhóm, cho phép SV nộp bài qua GitHub, sử dụng GitHub Action để đánh giá chất lượng mã tĩnh sử dụng GitHub API để đếm số lần nộp bài của mỗi thành viên, đánh giá đóng góp của mỗi thành viên, xây dựng dashboard thể hiện đóng góp.

## 📖 Giới thiệu

Hệ thống hỗ trợ giảng viên và sinh viên theo dõi tiến độ dự án phần mềm làm việc nhóm thông qua GitHub. Sinh viên đăng nhập bằng GitHub OAuth, nộp bài qua repository riêng, hệ thống tự động kiểm tra chất lượng mã nguồn qua GitHub Actions và thống kê đóng góp của từng thành viên nhóm.

---

## 🎯 Mục tiêu dự án

- Quản lý đề tài, nhóm sinh viên và tiến độ dự án phần mềm.
- Tự động lấy thông tin commit, pull request từ GitHub qua webhook.
- Tự động kiểm tra chất lượng mã nguồn qua GitHub Actions.
- Thống kê số lần nộp bài, đóng góp từng thành viên.
- Hiển thị dữ liệu trên dashboard cho giảng viên và sinh viên theo dõi.

---

## 🛠️ Công nghệ sử dụng

- **Backend**: Node.js, Express.js, Sequelize (MySQL)
- **Frontend**: Next.js
- **Authentication**: GitHub OAuth
- **Tự động kiểm tra mã**: GitHub Actions
- **Realtime dữ liệu**: Webhook GitHub
- **API**: RESTful API
- **Triển khai**: Railway / Vercel / Render
- **Đánh giá chất lượng mã tĩnh** : SonarCloud 

---

## 📌 Các chức năng chính

### 👩‍🏫 Vai trò Giảng viên

- Tạo môn học.
- Tạo sẵn đề tài cho môn học.
- Xem danh sách sinh viên, nhóm, đề tài.
- Theo dõi tiến độ và thống kê đóng góp từng nhóm, từng sinh viên.

### 👨‍🎓 Vai trò Sinh viên

- Đăng nhập bằng tài khoản GitHub.
- Xem danh sách môn học, đề tài.
- Đăng ký đề tài có sẵn hoặc đề xuất đề tài mới.
- Tạo nhóm và thêm thành viên.
- Nộp bài bằng cách commit/pull request lên repository.
- Theo dõi đóng góp bản thân và nhóm qua dashboard.

---

## ⚙️ Quy trình thực hiện

- **Cài đặt môi trường**: Thiết lập Next.js, Express.js, MySQL, Sequelize và công cụ kiểm tra mã.
- **Xây dựng hệ thống**:
  - Phát triển backend, frontend theo thiết kế.
  - Tích hợp OAuth GitHub, webhook, API lấy commit.
  - Thiết lập GitHub Actions kiểm tra chất lượng mã nguồn.
- **Kiểm thử**:
  - Kiểm tra từng tính năng độc lập.
  - Kiểm thử luồng đăng nhập, nộp bài, thống kê đóng góp và kiểm tra mã.
- **Triển khai thử nghiệm**:
  - Demo hệ thống cho nhóm sinh viên, giảng viên sử dụng thử.
  - Ghi nhận phản hồi, chỉnh sửa và tối ưu.

---

## 📅 Kế hoạch thực hiện

| Tuần        | Công việc chính                                                             |
| :---------- | :-------------------------------------------------------------------------- |
| 07/04-13/04 | Xác định đề tài, viết đề cương, phân tích yêu cầu, nghiên cứu công nghệ     |
| 14/04-20/04 | Nghiên cứu GitHub API, OAuth, Webhook, Actions, setup môi trường phát triển |
| 21/04-27/04 | Thiết kế CSDL, vẽ sơ đồ hệ thống, thiết kế cấu trúc thư mục                 |
| 28/04-04/05 | Xây dựng API người dùng, môn học, đề tài. OAuth GitHub                      |
| 05/05-11/05 | Xây dựng chức năng đăng ký đề tài, tạo nhóm, phân quyền nhóm                |
| 12/05-18/05 | Thiết lập webhook, xử lý dữ liệu commit, lưu vào CSDL                       |
| 19/05-25/05 | Cấu hình GitHub Actions, workflow kiểm tra mã, ghi nhận kết quả             |
| 26/05-01/06 | Xây dựng frontend quản lý môn học, đề tài, nhóm                             |
| 02/06-08/06 | Hoàn thiện dashboard thống kê đóng góp, kết nối frontend-backend            |
| 09/06-15/06 | Hoàn thiện tính năng, kiểm thử toàn bộ, triển khai hệ thống demo            |
| 16/06       | Tổng kết kết quả, viết báo cáo, chuẩn bị thuyết trình                       |

---

## 📚 Tài liệu tham khảo

[1] Node.js Foundation, “Node.js Documentation,” [Online]. Available: https://nodejs.org/en/docs/.

[2] Express.js, “Express - Node.js web application framework,” [Online]. Available: https://expressjs.com/.

[3] Sequelize, “Sequelize ORM Documentation,” [Online]. Available: https://sequelize.org/docs/v6/.

[4] Vercel Inc, “Next.js Documentation,” [Online]. Available: https://nextjs.org/docs.

[5] GitHub, “GitHub API Documentation,” [Online]. Available: https://docs.github.com/en/rest.

[6] GitHub, “GitHub Webhooks Documentation,” [Online]. Available: https://docs.github.com/en/webhooks.

[7] GitHub, “GitHub Actions Documentation,” [Online]. Available: https://docs.github.com/en/actions.

---

## 📌 License

© 2025 by Đinh Tấn Mãi. Dự án phục vụ mục đích học tập và nghiên cứu.
