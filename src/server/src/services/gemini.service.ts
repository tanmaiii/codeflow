import { HttpException } from '@/exceptions/HttpException';
import { CodeEvaluationRequest, CodeEvaluationResponse, EvaluationPromptData, GeminiConfig } from '@/interfaces/gemini.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Service } from 'typedi';

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

  /**
   * Đánh giá code
   */
  public async evaluateCode(request: CodeEvaluationRequest) {
    try {
      const prompt = this.buildEvaluationPrompt({
        code: request.code,
        language: request.language,
        exerciseDescription: request.exerciseDescription,
        requirements: request.requirements,
        criteria: request.evaluationCriteria,
      });

      const model = this.genAI.getGenerativeModel({
        model: this.config.model,
        generationConfig: {
          maxOutputTokens: this.config.maxTokens,
          temperature: this.config.temperature,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse và validate response
      const evaluation = this.parseEvaluationResponse(text);
      return evaluation;
    } catch (error) {
      throw error;
    }
  }

  public async evaluateCommitGithub(commit: string) {
    try {
    
    } catch (error) {
      throw error;
    }
  }

  private buildEvaluationPrompt(data: EvaluationPromptData): string {
    const criteriaList = Object.entries(data.criteria)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => key)
      .join(', ');

    return `
Bạn là một giảng viên lập trình chuyên nghiệp. Hãy đánh giá code của sinh viên một cách chi tiết và xây dựng.

**THÔNG TIN BÀI TẬP:**
${data.exerciseDescription ? `Mô tả bài tập: ${data.exerciseDescription}` : ''}
${data.requirements ? `Yêu cầu: ${data.requirements.join(', ')}` : ''}

**CODE CẦN ĐÁNH GIÁ:**
Ngôn ngữ: ${data.language}
\`\`\`${data.language}
${data.code}
\`\`\`

**TIÊU CHÍ ĐÁNH GIÁ:** ${criteriaList}

Hãy đánh giá theo format JSON chính xác sau (Trả lời bằng tiếng việt):
{
  "overallScore": <số điểm tổng thể từ 0-100>,
  "detailScores": {
    "codeQuality": <0-100>,
    "functionality": <0-100>,
    "efficiency": <0-100>,
    "readability": <0-100>,
    "bestPractices": <0-100>,
    "security": <0-100>
  },
  "feedback": {
    "strengths": ["điểm mạnh 1", "điểm mạnh 2", ...],
    "weaknesses": ["điểm yếu 1", "điểm yếu 2", ...],
    "suggestions": ["gợi ý 1", "gợi ý 2", ...]
  },
  "codeIssues": [
    {
      "type": "error|warning|suggestion",
      "line": <số dòng nếu có>,
      "description": "mô tả vấn đề",
      "severity": "low|medium|high|critical",
      "category": "syntax|logic|performance|security|style"
    }
  ],
  "recommendations": ["khuyến nghị 1", "khuyến nghị 2", ...],
  "evaluationSummary": "tóm tắt đánh giá tổng quan"
}

Lưu ý: Chỉ trả về JSON hợp lệ, không có text thêm.`;
  }

  // Hàm này dùng để parse json response từ Gemini
  private parseEvaluationResponse(text: string): CodeEvaluationResponse {
    try {
      // Loại bỏ markdown code blocks nếu có
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanText);

      // Validate required fields
      if (!parsed.overallScore || !parsed.detailScores || !parsed.feedback) {
        throw new Error('Invalid response format from Gemini');
      }

      return parsed as CodeEvaluationResponse;
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      // Fallback response
      return {
        overallScore: 0,
        detailScores: {
          codeQuality: 0,
          functionality: 0,
          efficiency: 0,
          readability: 0,
          bestPractices: 0,
          security: 0,
        },
        feedback: {
          strengths: [],
          weaknesses: ['Không thể phân tích code'],
          suggestions: ['Vui lòng kiểm tra lại code'],
        },
        codeIssues: [],
        recommendations: [],
        evaluationSummary: 'Đánh giá thất bại do lỗi hệ thống',
      };
    }
  }
}
