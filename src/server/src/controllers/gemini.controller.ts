import { CodeEvaluationDto } from '@/dtos/gemini.dto';
import { GeminiService } from '@/services/gemini.service';
import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class GeminiController {
  public gemini = Container.get(GeminiService);

  public generateText = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body;
      const result = await this.gemini.generateText(prompt);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public evaluateCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, language, exerciseDescription, requirements, evaluationCriteria } = req.body as CodeEvaluationDto;
      const result = await this.gemini.evaluateCode({ code, language, exerciseDescription, requirements, evaluationCriteria });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public testEvaluateCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sampleCode = `
        function fibonacci(n) {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
        console.log(fibonacci(10));
              `;

      const testData = {
        code: sampleCode,
        language: 'JavaScript',
        exerciseDescription: 'Viết hàm tính số Fibonacci',
        requirements: ['Viết hàm tính số Fibonacci', 'Sử dụng đệ quy'],
        evaluationCriteria: { codeQuality: true, functionality: true, efficiency: true, readability: true, bestPractices: true, security: true },
      };

      const result = await this.gemini.evaluateCode(testData);

      res.status(200).json({
        data: result,
        message: 'Test evaluate code success',
      });
    } catch (error) {
      next(error);
    }
  };
}
