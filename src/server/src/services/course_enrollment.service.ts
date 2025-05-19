import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { CourseEnrollment } from '@/interfaces/courses.interface';
import { Service } from 'typedi';

@Service()
export class CourseEnrollmentService {
  public async findAll(): Promise<CourseEnrollment[]> {
    const allEnrollments: CourseEnrollment[] = await DB.CourseEnrollment.findAll();
    return allEnrollments;
  }

  public async findAndCountAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<{ count: number; rows: CourseEnrollment[] }> {
    const { count, rows }: { count: number; rows: CourseEnrollment[] } =
      await DB.CourseEnrollment.findAndCountAll({
        limit,
        offset,
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

  public async createEnrollment(
    enrollmentData: Partial<CourseEnrollment>,
  ): Promise<CourseEnrollment> {
    const createEnrollmentData: CourseEnrollment = await DB.CourseEnrollment.create(enrollmentData);
    return createEnrollmentData;
  }

  public async updateEnrollment(
    enrollmentId: string,
    enrollmentData: Partial<CourseEnrollment>,
  ): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.update(enrollmentData, { where: { id: enrollmentId } });

    const updateEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    return updateEnrollment;
  }

  public async deleteEnrollment(enrollmentId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId);
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.destroy({ where: { id: enrollmentId } });

    const softDeletedEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(
      enrollmentId,
    );
    return softDeletedEnrollment;
  }

  public async destroyEnrollment(enrollmentId: string): Promise<CourseEnrollment> {
    const findEnrollment: CourseEnrollment = await DB.CourseEnrollment.findByPk(enrollmentId, {
      paranoid: false,
    });
    if (!findEnrollment) throw new HttpException(409, "Enrollment doesn't exist");

    await DB.CourseEnrollment.destroy({ force: true, where: { id: enrollmentId } });

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
