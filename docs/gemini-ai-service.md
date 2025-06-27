# Gemini AI Service - Đánh giá Code Sinh viên

## Tổng quan

Gemini AI Service là một dịch vụ được tích hợp vào hệ thống để đánh giá code của sinh viên một cách tự động sử dụng Google Gemini AI. Service này cung cấp các tính năng đánh giá toàn diện, phân tích nhanh và so sánh code.

## Cấu hình

### 1. Cài đặt Dependencies

Service đã được cài đặt với package `@google/generative-ai`. Không cần cài thêm.

### 2. Environment Variables

Thêm vào file `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Lấy API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Tạo API key mới
4. Copy và paste vào file `.env`

## API Endpoints

### 1. Health Check

```http
GET /api/gemini/health
```

Kiểm tra trạng thái kết nối với Gemini API.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "model": "gemini-1.5-flash"
  },
  "message": "Gemini API is healthy"
}
```

### 2. Test Evaluation

```http
GET /api/gemini/test
```

Endpoint để test đánh giá với code mẫu (không cần authentication).

### 3. Đánh giá Code Toàn diện

```http
POST /api/gemini/evaluate
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }",
  "language": "javascript",
  "exerciseDescription": "Viết hàm tính số Fibonacci",
  "requirements": ["Sử dụng đệ quy", "Xử lý trường hợp base case"],
  "evaluationCriteria": {
    "codeQuality": true,
    "functionality": true,
    "efficiency": true,
    "readability": true,
    "bestPractices": true,
    "security": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overallScore": 75,
    "detailScores": {
      "codeQuality": 80,
      "functionality": 90,
      "efficiency": 40,
      "readability": 85,
      "bestPractices": 70,
      "security": 80
    },
    "feedback": {
      "strengths": ["Code logic đúng", "Dễ đọc và hiểu"],
      "weaknesses": ["Hiệu suất kém với số lớn", "Không có memoization"],
      "suggestions": ["Sử dụng dynamic programming", "Thêm input validation"]
    },
    "codeIssues": [
      {
        "type": "warning",
        "line": 3,
        "description": "Độ phức tạp thời gian O(2^n) - không hiệu quả",
        "severity": "high",
        "category": "performance"
      }
    ],
    "recommendations": ["Optimize thuật toán", "Thêm error handling"],
    "evaluationSummary": "Code hoạt động đúng nhưng cần cải thiện hiệu suất"
  },
  "message": "Code evaluated successfully"
}
```

### 4. Đánh giá Nhanh

```http
POST /api/gemini/quick-evaluate
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "console.log('Hello World')",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hasErrors": false,
    "issues": [],
    "quickFeedback": "Code đơn giản và hoạt động tốt"
  },
  "message": "Quick evaluation completed"
}
```

### 5. So sánh với Solution

```http
POST /api/gemini/compare
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "studentCode": "function add(a, b) { return a + b; }",
  "solutionCode": "const add = (a, b) => a + b;",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "similarity": 85,
    "differences": ["Sử dụng function declaration thay vì arrow function"],
    "improvements": ["Có thể sử dụng arrow function để code ngắn gọn hơn"],
    "learningPoints": ["Hiểu về các cách declare function khác nhau"]
  },
  "message": "Code comparison completed"
}
```

## Tiêu chí Đánh giá

### Code Quality (Chất lượng code)
- Cấu trúc code logic và rõ ràng
- Sử dụng patterns và principles tốt
- Code organization và modularity

### Functionality (Tính năng)
- Code hoạt động đúng với requirements
- Xử lý các test cases
- Logic nghiệp vụ chính xác

### Efficiency (Hiệu suất)
- Time complexity
- Space complexity  
- Optimization possibilities

### Readability (Khả năng đọc)
- Naming conventions
- Code formatting
- Comments và documentation

### Best Practices (Thực hành tốt)
- Coding standards
- Design patterns
- Error handling

### Security (Bảo mật)
- Input validation
- Security vulnerabilities
- Safe coding practices

## Ngôn ngữ được hỗ trợ

Service có thể đánh giá code cho các ngôn ngữ phổ biến:

- JavaScript/TypeScript
- Python
- Java
- C/C++
- C#
- PHP
- Go
- Rust
- Ruby
- Swift
- Kotlin

## Lưu ý Sử dụng

### Rate Limiting
- Gemini API có giới hạn requests per minute
- Nên implement caching cho các evaluation tương tự

### Security
- Không gửi code chứa thông tin nhạy cảm
- Validate input trước khi gửi đến API

### Performance
- Large code files có thể mất thời gian xử lý
- Sử dụng quick-evaluate cho feedback nhanh

### Cost Management
- Gemini API có thể tính phí theo usage
- Monitor API usage thường xuyên

## Ví dụ Integration

### Frontend Usage

```typescript
// React component example
const CodeEvaluation = ({ code, language }) => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const evaluateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code,
          language,
          evaluationCriteria: {
            codeQuality: true,
            functionality: true,
            efficiency: true,
            readability: true,
            bestPractices: true,
            security: true
          }
        })
      });
      
      const result = await response.json();
      setEvaluation(result.data);
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={evaluateCode} disabled={loading}>
        {loading ? 'Đang đánh giá...' : 'Đánh giá Code'}
      </button>
      
      {evaluation && (
        <div>
          <h3>Điểm tổng: {evaluation.overallScore}/100</h3>
          <div>
            <h4>Điểm mạnh:</h4>
            <ul>
              {evaluation.feedback.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          {/* Render other evaluation details */}
        </div>
      )}
    </div>
  );
};
```

### Backend Integration

```typescript
// Service usage example
import { Container } from 'typedi';
import { GeminiService } from '@services/gemini.service';

export class AssignmentService {
  private geminiService = Container.get(GeminiService);

  async gradeSubmission(submissionId: string) {
    const submission = await this.getSubmission(submissionId);
    
    const evaluation = await this.geminiService.evaluateCode({
      code: submission.code,
      language: submission.language,
      exerciseDescription: submission.exercise.description,
      requirements: submission.exercise.requirements,
      evaluationCriteria: {
        codeQuality: true,
        functionality: true,
        efficiency: true,
        readability: true,
        bestPractices: true,
        security: false
      }
    });

    await this.saveEvaluation(submissionId, evaluation);
    return evaluation;
  }
}
```

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Kiểm tra GEMINI_API_KEY trong .env
   - Verify API key trên Google AI Studio

2. **Rate Limit Exceeded**
   - Implement exponential backoff
   - Cache evaluations để giảm API calls

3. **Large Code Timeout**
   - Break down large files
   - Use quick-evaluate for initial feedback

4. **JSON Parse Error**
   - Gemini response format không đúng
   - Check prompt engineering

### Logs

Service sẽ log các errors để debug:

```bash
# Check logs
tail -f src/logs/error/error.log
```

## Future Enhancements

- [ ] Batch evaluation cho multiple files
- [ ] Custom evaluation criteria templates  
- [ ] Integration với plagiarism detection
- [ ] Code suggestion improvements
- [ ] Support cho unit test evaluation
- [ ] Real-time code analysis
- [ ] Performance benchmarking 