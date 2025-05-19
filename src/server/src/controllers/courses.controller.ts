import { CreateCourseDto } from '@/dtos/courses.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Comment } from '@/interfaces/comments.interface';
import { Course, CourseEnrollment } from '@/interfaces/courses.interface';
import { User } from '@/interfaces/users.interface';
import { CommentService } from '@/services/comment.service';
import { CourseEnrollmentService } from '@/services/course_enrollment.service';
import { CourseService } from '@/services/courses.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CourseController {
  public course = Container.get(CourseService);
  public comment = Container.get(CommentService);
  public courseEnrollment = Container.get(CourseEnrollmentService);

  public getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows }: { count: number; rows: Course[] } = await this.course.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const findOneCourseData: Course = await this.course.findCourseById(courseId);

      res.status(200).json({ data: findOneCourseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public joinCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const userId = req.user.id;
      const password = req.body.password;

      const joinCourseData: CourseEnrollment = await this.course.joinCourse(courseId, userId, password);

      res.status(200).json({ data: joinCourseData, message: 'joined' });
    } catch (error) {
      next(error);
    }
  };

  public checkEnrollment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const userId = req.user.id;

      const checkEnrollmentData: CourseEnrollment[] = await this.courseEnrollment.findEnrollmentByCourseId(courseId);

      res.status(200).json({ data: checkEnrollmentData ?? [], message: 'checkEnrollment' });
    } catch (error) {
      next(error);
    }
  };

  public createCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseData: Partial<CreateCourseDto> = req.body;
      const userData: User = req.user;
      const createCourseData: Course = await this.course.createCourse({
        ...courseData,
        authorId: userData.id,
      });

      res.status(201).json({ data: createCourseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const courseData: Partial<Course> = req.body;
      const updateCourseData: Course = await this.course.updateCourse(courseId, courseData);

      res.status(200).json({ data: updateCourseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const deleteCourseData: Course = await this.course.deleteCourse(courseId);

      res.status(200).json({ data: deleteCourseData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const destroyCourseData: Course = await this.course.destroyCourse(courseId);

      res.status(200).json({ data: destroyCourseData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentsByCourseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const findAllCommentsData: Comment[] = await this.comment.findCommentByCourseId(courseId);

      res.status(200).json({ data: findAllCommentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
