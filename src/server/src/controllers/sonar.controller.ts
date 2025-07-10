import { RequestWithUser } from '@/interfaces/auth.interface';
import { SonarService } from '@/services/sonar.service';
import { NextFunction, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class SonarController {
  private readonly sonarService: SonarService;

  constructor() {
    this.sonarService = Container.get(SonarService);
  }
  public createProject = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = req.body;
      const project = await this.sonarService.createProject(name);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  };
}
