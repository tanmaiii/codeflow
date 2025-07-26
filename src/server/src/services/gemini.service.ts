import { HttpException } from '@/exceptions/HttpException';
import { CodeChange, GeminiConfig, GeminiResReviewPR } from '@/interfaces/gemini.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/utils/logger';
import { Service } from 'typedi';
import { formatUnifiedDiffWithLineNumbers } from '@/utils/util';

@Service()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private config: GeminiConfig;

  constructor() {
    this.init();
  }

  private async init() {
    this.config = {
      apiKey: process.env.GEMINI_TOKEN,
      model: 'gemini-1.5-flash',
      maxTokens: 8192,
      temperature: 0.7,
    };

    if (!this.config.apiKey) {
      throw new HttpException(500, 'Gemini API key is not configured');
    }

    this.genAI = new GoogleGenerativeAI(this.config.apiKey);
  }

  /**
   * Dùng để tạo nội dung cho bài viết
   * @param prompt - The prompt to generate text
   * @returns The generated text
   */
  public async generateText(prompt: string) {
    const model = this.genAI.getGenerativeModel({
      model: this.config.model,
      generationConfig: {
        maxOutputTokens: this.config.maxTokens,
        temperature: this.config.temperature,
      },
    });
    const result = await model.generateContent(prompt);

    return result.response.text();
  }

  public async evaluateCodeWithPrompt(pr_description: string, code: CodeChange[]): Promise<GeminiResReviewPR> {
    const model = this.genAI.getGenerativeModel({
      model: this.config.model,
      generationConfig: {
        maxOutputTokens: this.config.maxTokens,
        temperature: this.config.temperature,
      },
    });

    const prompt = this.buildPromptReviewPullRequest(pr_description, code);

    logger.info(prompt);

    const result = await model.generateContent(prompt);

    return this.parseEvaluationResponse(result.response.text());
  }

  private buildPromptReviewPullRequest(pr_description: string, code_changes: CodeChange[]) {
    const formattedCodeChanges = code_changes
      .map(change => {
        const numberedLines = formatUnifiedDiffWithLineNumbers(change.code);
        return `File: ${change.file}:\n${numberedLines}`;
      })
      .join('\n\n---\n\n');

    return `
    Bạn là một chuyên gia review mã nguồn, được giao nhiệm vụ đánh giá một Pull Request (PR) trên GitHub.
Dưới đây là thông tin về PR:

Mô tả PR:
${pr_description}

Thay đổi mã nguồn:
${formattedCodeChanges}

Yêu cầu đánh giá:

Hãy phân tích kỹ các thay đổi và phản hồi theo định dạng JSON với các nội dung sau:
1. summary: Một tiêu đề ngắn tóm tắt nội dung PR.
2. comments: Danh sách các nhận xét chi tiết cho từng dòng mã cần góp ý.

Chỉ đưa ra nhận xét nếu:
- Dòng mã có lỗi logic, bug, hoặc vấn đề bảo mật.
- Có thể cải thiện về hiệu suất, khả năng bảo trì, hoặc độ dễ đọc.
- Thiếu xử lý lỗi hoặc chưa đáp ứng đủ yêu cầu chức năng.

Không đưa ra nhận xét nếu:
- Nội dung không liên quan đến code.
- Thay đổi nhỏ, hiển nhiên hoặc không cần thiết.

Định dạng phản hồi:
Bạn phải trả về một đối tượng JSON hợp lệ với cấu trúc sau:
{
  "summary": "Tóm tắt ngắn gọn về nội dung PR",
  "score": 0-10,
  "comments": [
    {
      "file": "path/to/file.ext",
      "line": 42,
      "comment": "[🤖 AI Review] (Mức độ: Nhận xét rõ ràng và cụ thể về đoạn mã)"
    },
    ...thêm nhận xét
  ]
}
Không thêm bất kỳ văn bản, markdown hay giải thích nào bên ngoài JSON.
    `;
  }

  // Hàm này dùng để parse json response từ Gemini
  private parseEvaluationResponse(text: string): GeminiResReviewPR {
    try {
      // Loại bỏ markdown code blocks nếu có
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanText);

      return parsed as GeminiResReviewPR;
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      // Fallback response
      return null;
    }
  }
}
