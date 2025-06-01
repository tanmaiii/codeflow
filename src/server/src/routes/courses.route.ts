import { CourseController } from '@/controllers/courses.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreateCourseDto, JoinCourseDto } from '@/dtos/courses.dto';
import { AuthMiddleware, isTeacherOrAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class CourseRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public course = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Course enrollment routes
    this.router.post(`${this.path}/:id/join`, AuthMiddleware, ValidationMiddleware(JoinCourseDto, 'body'), this.course.joinCourse);
    this.router.get(`${this.path}/:id/check`, AuthMiddleware, this.course.checkEnrollment);
    this.router.get(`${this.path}/:id/members`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getMembersByCourseId);

    // Course listing routes
    this.router.get(`${this.path}/registered`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getRegisteredCourses);
    this.router.get(`${this.path}/:idAuthor/user`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getCoursesByAuthorId);
    this.router.get(`${this.path}/author/:id`, AuthMiddleware, this.course.getCoursesByAuthorId);
    this.router.get(`${this.path}/tag/:idTag`, AuthMiddleware, this.course.getCoursesByTagId);

    // Course management routes (teacher/admin only)
    this.router.post(`${this.path}`, isTeacherOrAdmin, ValidationMiddleware(CreateCourseDto), this.course.createCourse);
    this.router.put(`${this.path}/:id`, isTeacherOrAdmin, ValidationMiddleware(CreateCourseDto, 'body', true), this.course.updateCourse);
    this.router.put(`${this.path}/:id/delete`, isTeacherOrAdmin, this.course.deleteCourse);
    this.router.delete(`${this.path}/:id`, isTeacherOrAdmin, this.course.destroyCourse);

    // Public routes
    this.router.get(`${this.path}`, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getCourses);
    this.router.get(`${this.path}/:id`, this.course.getCourseById);
    // Course comments route
    this.router.get(`${this.path}/:id/comments`, AuthMiddleware, this.course.getCommentsByCourseId);
    
    // Debug route for CourseTag data
    this.router.get(`${this.path}/debug/coursetags`, this.course.debugCourseTagData);
  }
}
