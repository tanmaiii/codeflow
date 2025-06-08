  import { IComment } from '@/interfaces/comment';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import { ICourse, ICourseEnrollment, ICreateCourseDto } from '@/interfaces/course';
import { IUser } from '@/interfaces/user';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';


  interface IGetCourseAllQuery extends IGetAllQuery {
    type?: string;
  }
  class CourseService {
    private client: AxiosInstance;

    constructor() {
      this.client = createHttpClient('courses');
    }

    async getAll(params: IGetCourseAllQuery): Promise<PaginatedResponseAPIDto<ICourse[]>> {
      const res = await this.client.get('/', { params });
      return res.data;
    }

    async getAllRegistered(params: IGetCourseAllQuery): Promise<PaginatedResponseAPIDto<ICourse[]>> {
      const res = await this.client.get('/registered', { params });
      return res.data;
    }

    async getAllByUser(id: string, params: IGetCourseAllQuery): Promise<PaginatedResponseAPIDto<ICourse[]>> {
      const res = await this.client.get(`/${id}/user`, { params });
      return res.data;
    }

    async getAllByTag(params: IGetCourseAllQuery, tagId: string): Promise<PaginatedResponseAPIDto<ICourse[]>> {
      const res = await this.client.get(`/tag/${tagId}`, { params });
      return res.data;
    }

    async getById(id: string): Promise<ResponseAPIDto<ICourse>> {
      const res = await this.client.get(`/${id}`);
      return res.data;
    }

    async create(data: ICreateCourseDto): Promise<ResponseAPIDto<ICourse>> {
      const res = await this.client.post('/', data);
      return res.data;
    }

    async update(id: string, data: ICreateCourseDto): Promise<ResponseAPIDto<ICourse>> {
      const res = await this.client.put(`/${id}`, data);
      return res.data;
    }

    async delete(id: string): Promise<ResponseAPIDto<ICourse>> {
      const res = await this.client.delete(`/${id}`);
      return res.data;
    }

    async destroy(id: string): Promise<ResponseAPIDto<ICourse>> {
      const res = await this.client.delete(`/${id}/force`);
      return res.data;
    }

    async joinCourse(courseId: string, password: string): Promise<ResponseAPIDto<ICourseEnrollment>> {
      const res = await this.client.post(`/${courseId}/join`, { password });
      return res.data;
    }

    async leaveCourse(courseId: string): Promise<ResponseAPIDto<ICourseEnrollment>> {
      const res = await this.client.post(`/${courseId}/leave`);
      return res.data;
    }

    async checkJoinCourse(courseId: string): Promise<ResponseAPIDto<boolean>> {
      const res = await this.client.get(`/${courseId}/check`);
      return res.data;
    }

    async memberInCourse(courseId: string, params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IUser[]>> {
      const res = await this.client.get(`/${courseId}/members`, { params });
      return res.data;
    }

    async comments(id: string): Promise<ResponseAPIDto<IComment[]>> {
      const res = await this.client.get(`/${id}/comments`);
      return res.data;
    }
  }

  export default new CourseService() as CourseService;
