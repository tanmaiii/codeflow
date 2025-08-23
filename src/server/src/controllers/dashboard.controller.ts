import { RequestWithUser } from '@/interfaces/auth.interface';
import { CourseService } from '@/services/courses.service';
import { ReposService } from '@/services/repos.service';
import { TagService } from '@/services/tag.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class DashboardController {
  private readonly course: CourseService;
  private readonly tags: TagService;
  private readonly repos: ReposService;

  constructor() {
    this.course = Container.get(CourseService);
    this.tags = Container.get(TagService);
    this.repos = Container.get(ReposService);
  }

  public getCodeActivity = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const days: number = parseInt(req.query.days as string) || 7;

      const codeActivity = await this.course.getCourseAllActivity(undefined, days);

      res.status(200).json({ data: codeActivity, message: 'getCourseCodeActivity' });
    } catch (error) {
      next(error);
    }
  };

  public getTags = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.tags.getTagsWithUsageCount();

      res.status(200).json({ data: tags, message: 'getTags' });
    } catch (error) {
      next(error);
    }
  };

  public getFramework = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courses = await this.repos.getRepoFramework();
      res.status(200).json({ data: courses, message: 'getFramework' });
    } catch (error) {
      next(error);
    }
  };

  public getCourseTypes = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseTypes = await this.course.getCourseTypes();
      res.status(200).json({ data: courseTypes, message: 'getCourseTypes' });
    } catch (error) {
      next(error);
    }
  };
}
