import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { CourseEnrollment } from '@/interfaces/courses.interface';
import { Op } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class CourseEnrollmentService {
  public async findAll(): Promise<CourseEnrollment[]> {
    const allEnrollments: CourseEnrollment[] = await DB.CourseEnrollment.findAll();
    return allEnrollments;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: CourseEnrollment[] }> {
    const { count, rows }: { count: number; rows: CourseEnrollment[] } = await DB.CourseEnrollment.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findAllWithPaginationByCourseId(
    pageSize: number,
    page: number,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    courseId: string,
  ): Promise<{ count: number; rows: CourseEnrollment[] }> {
    if (pageSize == -1) {
      const { count, rows }: { count: number; rows: CourseEnrollment[] } = await DB.CourseEnrollment.findAndCountAll({
        where: { courseId },
        col: 'course_enrollments.id',
      });
      return { count, rows };
    }

    const { count, rows }: { count: number; rows: CourseEnrollment[] } = await DB.CourseEnrollment.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      where: { courseId },
      col: 'course_enrollments.id',
    });
    return { count, rows };
  }

  public async findEnrollmentById(enrollmentId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    return findEnrollment;
  }

  public async findEnrollmentByCourseId(courseId: string): Promise<CourseEnrollment[]> {
    const findEnrollment: CourseEnrollment[] = await DB.CourseEnrollment.findAll({
      where: { courseId },
    });
    return findEnrollment;
  }

  public async findEnrollmentByUserId(userId: string): Promise<CourseEnrollment[]> {
    const findEnrollment: CourseEnrollment[] = await DB.CourseEnrollment.findAll({
      where: { userId },
    });
    return findEnrollment;
  }

  public async createEnrollment(enrollmentData: Partial<CourseEnrollment>): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findOne({
      where: { courseId: enrollmentData.courseId, userId: enrollmentData.userId },
    });
    if (findEnrollment) return findEnrollment;

    const createEnrollmentData: CourseEnrollment = await DB.CourseEnrollment.create(enrollmentData);

    return createEnrollmentData;
  }

  public async updateEnrollment(enrollmentId: string, enrollmentData: Partial<CourseEnrollment>): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.update(enrollmentData, { where: { courseId: enrollmentId } });

    const updateEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    return updateEnrollment;
  }

  public async deleteEnrollmentByCourseIdAndUserId(courseId: string, userId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findOne({
      where: { courseId, userId },
    });
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.destroy({ where: { courseId, userId } });

    return findEnrollment;
  }

  public async deleteEnrollment(enrollmentId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    // await DB.CourseEnrollment.destroy({ where: { courseId: enrollmentId } });

    const softDeletedEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    return softDeletedEnrollment;
  }

  public async destroyEnrollment(enrollmentId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId, {
      paranoid: false,
    });
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.destroy({ force: true, where: { courseId: enrollmentId } });

    return findEnrollment;
  }

  public async findEnrollmentsByCourseId(courseId: string): Promise<CourseEnrollment[]> {
    const enrollments: CourseEnrollment[] = await DB.CourseEnrollment.findAll({
      where: { courseId },
    });
    return enrollments;
  }

  public async findEnrollmentsByUserId(userId: string): Promise<CourseEnrollment[]> {
    const enrollments: CourseEnrollment[] = await DB.CourseEnrollment.findAll({
      where: { userId },
    });
    return enrollments;
  }
}
