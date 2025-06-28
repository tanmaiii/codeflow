export interface CodeEvaluationRequest {
  code: string;
  language: string;
  exerciseDescription?: string;
  requirements?: string[];
  evaluationCriteria?: EvaluationCriteria;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface EvaluationCriteria {
  codeQuality?: boolean;
  functionality?: boolean;
  efficiency?: boolean;
  readability?: boolean;
  bestPractices?: boolean;
  security?: boolean;
}

export interface EvaluationPromptData {
  code: string; // Code đã viết
  language: string; // Ngôn ngữ code
  exerciseDescription?: string; // Mô tả bài tập
  requirements?: string[]; // Yêu cầu của bài tập
  criteria: EvaluationCriteria; // Đánh giá các tiêu chí
}

export interface CodeIssue {
    type: 'error' | 'warning' | 'suggestion';
    line?: number;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    category: 'syntax' | 'logic' | 'performance' | 'security' | 'style';
  }
  

export interface CodeEvaluationResponse {
  overallScore: number; // 0-100
  detailScores: {
    codeQuality: number;
    functionality: number;
    efficiency: number;
    readability: number;
    bestPractices: number;
    security: number;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  codeIssues: CodeIssue[];
  recommendations: string[];
  evaluationSummary: string;
}
