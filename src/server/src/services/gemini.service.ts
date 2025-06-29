import { ENUM_TYPE_SYSTEM_SETTINGS } from '@/data/enum';
import { CodeEvaluationRequest, CodeEvaluationResponse, EvaluationPromptData, GeminiConfig } from '@/interfaces/gemini.interface';
import { logger } from '@/utils/logger';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Container, { Service } from 'typedi';
import { SystemSettingsService } from './system_settings.service';

@Service()
export class GeminiService {
  private config: GeminiConfig | null = null;
  private genAi: GoogleGenerativeAI | null = null;
  private tokenCache: {
    token: string;
    cachedAt: number;
    ttl: number; // Time to live in milliseconds
  } | null = null;

  public SystemSettings = Container.get(SystemSettingsService);

  /**
   * Lấy token với cache TTL
   */
  private async getTokenWithCache(): Promise<string> {
    const now = Date.now();
    const cacheTTL = 5 * 60 * 1000; // 5 phút cache

    // Kiểm tra cache còn hiệu lực không
    if (this.tokenCache && now - this.tokenCache.cachedAt < this.tokenCache.ttl) {
      return this.tokenCache.token;
    }

    // Lấy token mới từ database
    const systemSettings = await this.SystemSettings.findSettingByKey(ENUM_TYPE_SYSTEM_SETTINGS.GEMINI_TOKEN);

    if (!systemSettings.value || systemSettings.value === '') {
      throw new Error('Gemini token is not set');
    }

    // Cập nhật cache
    this.tokenCache = {
      token: systemSettings.value,
      cachedAt: now,
      ttl: cacheTTL,
    };

    logger.info(`[Gemini Service] Token refreshed from database`);
    return systemSettings.value;
  }

  /**
   * Lấy hoặc tạo config với token mới nhất
   */
  private async getConfig(): Promise<{ config: GeminiConfig; genAi: GoogleGenerativeAI }> {
    const token = await this.getTokenWithCache();

    // Nếu token thay đổi hoặc chưa có config, tạo mới
    if (!this.config || !this.genAi || this.config.apiKey !== token) {
      this.config = {
        apiKey: token,
        model: 'gemini-1.5-flash',
        maxTokens: 8192,
        temperature: 0.7,
      };

      this.genAi = new GoogleGenerativeAI(this.config.apiKey);
      logger.info(`[Gemini Service] Config updated with new token`);
    }

    return { config: this.config, genAi: this.genAi };
  }

  /**
   * Manually refresh token và config
   */
  public async refreshConfig(): Promise<void> {
    this.tokenCache = null; // Clear cache
    this.config = null;
    this.genAi = null;

    await this.getConfig(); // Reload config
    logger.info(`[Gemini Service] Config manually refreshed`);
  }

  /**
   * Dùng để tạo nội dung cho bài viết
   * @param prompt - The prompt to generate text
   * @returns The generated text
   */
  public async generateText(prompt: string) {
    const { config, genAi } = await this.getConfig();

    const model = genAi.getGenerativeModel({
      model: config.model,
      generationConfig: {
        maxOutputTokens: config.maxTokens,
        temperature: config.temperature,
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
      const { config, genAi } = await this.getConfig();

      const prompt = this.buildEvaluationPrompt({
        code: request.code,
        language: request.language,
        exerciseDescription: request.exerciseDescription,
        requirements: request.requirements,
        criteria: request.evaluationCriteria,
      });

      const model = genAi.getGenerativeModel({
        model: config.model,
        generationConfig: {
          maxOutputTokens: config.maxTokens,
          temperature: config.temperature,
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
      const { config, genAi } = await this.getConfig();
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
