import { CreateCourseDto } from '@/dtos/courses.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CommentService } from '@/services/comment.service';
import { CourseEnrollmentService } from '@/services/course_enrollment.service';
import { CourseService } from '@/services/courses.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CourseController {
  private readonly course: CourseService;
  private readonly comment: CommentService;
  private readonly courseEnrollment: CourseEnrollmentService;

  constructor() {
    this.course = Container.get(CourseService);
    this.comment = Container.get(CommentService);
    this.courseEnrollment = Container.get(CourseEnrollmentService);
  }

  private createPaginationResponse(count: number | string, page: number | string, limit: number | string) {
    return {
      totalItems: count,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
    };
  }

  private async handleRequest<T>(req: Request, res: Response, next: NextFunction, handler: () => Promise<T>) {
    try {
      const result = await handler();
      return res.status(200).json({ data: result, message: 'success' });
    } catch (error) {
      next(error);
    }
  }

  public getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search, type } = req.query;
      const { count, rows } = await this.course.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search ?? ''),
        String(type ?? ''),
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getRegisteredCourses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.course.findRegisteredCourses(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.user.id,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCoursesByAuthorId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.course.findCoursesByAuthorId(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.idAuthor,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCoursesByTagId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;

      const { count, rows } = await this.course.findCourseByTagIdAlternative(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.idTag,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getMembersByCourseId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.courseEnrollment.findAllWithPaginationByCourseId(
        Number(limit),
        Number(page),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.id,
      );

      res.status(200).json({
        data: rows.map(enrollment => enrollment.user) ?? [],
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.findCourseById(req.params.id);
    });
  };

  public joinCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.joinCourse(req.params.id, req.user.id, req.body.password);
    });
  };

  public checkEnrollment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      const enrollments = await this.courseEnrollment.findEnrollmentByCourseId(req.params.id);
      return enrollments.some(enrollment => enrollment.userId === req.user.id);
    });
  };

  public createCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseData: Partial<CreateCourseDto> = req.body;
      const createCourseData = await this.course.createCourse({
        ...courseData,
        authorId: req.user.id,
      });

      res.status(201).json({ data: createCourseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.updateCourse(req.params.id, req.body);
    });
  };

  public deleteCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.deleteCourse(req.params.id);
    });
  };

  public destroyCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.destroyCourse(req.params.id);
    });
  };

  public getCommentsByCourseId = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.comment.findCommentByCourseId(req.params.id);
    });
  };

  // Debug method to test CourseTag data
  public debugCourseTagData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all CourseTag records to debug
      const courseTagsData = await this.course.getCourseTagDebugData();
      res.status(200).json({
        data: courseTagsData,
        message: 'debug data',
      });
    } catch (error) {
      next(error);
    }
  };
}
