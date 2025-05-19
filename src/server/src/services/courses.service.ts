import { HttpException } from '@/exceptions/HttpException';
import { Course, CourseCreate, CourseEnrollment } from '@/interfaces/courses.interface';
import { DB } from '@database';
import { compare, hash } from 'bcrypt';
import { Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { CourseDocumentService } from './course_document.service';
import { CourseEnrollmentService } from './course_enrollment.service';
import { TagService } from './tag.service';
@Service()
export class CourseService {
  public Tag = Container.get(TagService);
  public CourseDocument = Container.get(CourseDocumentService);
  public CourseEnrollment = Container.get(CourseEnrollmentService);

  public async findAll(): Promise<Course[]> {
    const allCourse: Course[] = await DB.Courses.findAll();
    return allCourse;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ count: number; rows: Course[] }> {
    const { count, rows }: { count: number; rows: Course[] } = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM comments AS c
                  WHERE c.course_id = courses.id
                )`),
            'commentCount',
          ],
        ],
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'courses.id',
    });
    return { count, rows };
  }

  public async findCourseById(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    return findCourse;
  }

  public async createCourse(courseData: Partial<CourseCreate>): Promise<Course> {
    const { tags, documents, ...dataWithoutTags } = courseData;
    if (dataWithoutTags.password) {
      dataWithoutTags.password = await hash(dataWithoutTags.password, 10);
    }
    const createCourseData: Course = await DB.Courses.create(dataWithoutTags);

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createCourseTag(createCourseData.id, tagId)));
    }

    if (documents?.length) {
      await Promise.all(
        documents.map(url =>
          this.CourseDocument.createDocument({
            courseId: createCourseData.id,
            url: url,
            title: url,
          }),
        ),
      );
    }

    return createCourseData;
  }

  public async updateCourse(courseId: string, courseData: Partial<CourseCreate>): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    const { tags, documents, ...dataWithoutTags } = courseData;
    await DB.Courses.update(dataWithoutTags, { where: { id: courseId } });

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createCourseTag(courseId, tagId)));
    }

    if (documents?.length) {
      await Promise.all(
        documents.map(url =>
          this.CourseDocument.createDocument({
            courseId: courseId,
            url: url,
            title: url,
          }),
        ),
      );
    }

    return DB.Courses.findByPk(courseId);
  }

  public async joinCourse(courseId: string, userId: string, password: string): Promise<CourseEnrollment> {
    const findCourse: Course = await DB.Courses.scope('withPassword').findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    if (findCourse.password) {
      const isPasswordMatching: boolean = await compare(password, findCourse.password);
      if (!isPasswordMatching) throw new HttpException(401, 'Invalid password');
    }

    const createEnrollmentData: CourseEnrollment = await this.CourseEnrollment.createEnrollment({
      courseId: courseId,
      userId: userId,
    });

    return createEnrollmentData;
  }

  public async deleteCourse(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await DB.Courses.destroy({ where: { id: courseId } });

    const softDeletedCourse: Course = await DB.Courses.findByPk(courseId);
    return softDeletedCourse;
  }

  public async destroyCourse(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId, { paranoid: false });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await DB.Courses.destroy({ force: true, where: { id: courseId } });

    return findCourse;
  }
}
