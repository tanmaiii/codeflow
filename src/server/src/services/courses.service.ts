import { HttpException } from '@/exceptions/HttpException';
import { Course, CourseCreate, CourseEnrollment } from '@/interfaces/courses.interface';
import { DB } from '@database';
import { compare, hash } from 'bcrypt';
import { Op, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { CourseDocumentService } from './course_document.service';
import { CourseEnrollmentService } from './course_enrollment.service';
import { TagService } from './tag.service';
import { NotificationService } from './notification.service';
import { Notification } from '@/interfaces/notification.interface';
import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';

@Service()
export class CourseService {
  constructor(
    private notificationService = Container.get(NotificationService),
    public Tag = Container.get(TagService),
    public CourseDocument = Container.get(CourseDocumentService),
    public CourseEnrollment = Container.get(CourseEnrollmentService),
  ) {}

  private readonly commentCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM comments AS c
    WHERE c.course_id = courses.id
  )`);

  private readonly enrollmentCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM course_enrollments AS ce
    WHERE ce.course_id = courses.id
  )`);

  private readonly topicCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM topics AS t
    WHERE t.course_id = courses.id
  )`);

  public async findAll(): Promise<Course[]> {
    const allCourse: Course[] = await DB.Courses.findAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
    });
    return allCourse;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
    type = '',
  ): Promise<{ count: number; rows: Course[] }> {
    const { count, rows } = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
      where: {
        ...(search && { title: { [Op.like]: `%${search}%` } }),
        ...(type && { type }),
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'courses.id',
    });
    return { count, rows };
  }

  public async findRegisteredCourses(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    userId: string,
  ): Promise<{ count: number; rows: Course[] }> {
    const enrollments = await this.CourseEnrollment.findEnrollmentByUserId(userId);
    const courseIds = enrollments.map(enrollment => enrollment.courseId);

    const registeredCourses = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
        ],
      },
      where: { id: { [Op.in]: courseIds } },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
    });

    return registeredCourses;
  }

  public async findCoursesByAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    authorId: string,
  ): Promise<{ count: number; rows: Course[] }> {
    const courses = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
      where: {
        authorId,
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
    });

    return courses;
  }

  public async findCourseById(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    return findCourse;
  }

  public async createCourse(courseData: Partial<CourseCreate>): Promise<Course> {
    const { tags, documents, ...courseDetails } = courseData;

    if (courseDetails.password) {
      courseDetails.password = await hash(courseDetails.password, 10);
    }

    const createdCourse = await DB.Courses.create(courseDetails);

    await this.attachTagsAndDocuments(createdCourse.id, tags, documents);

    return createdCourse;
  }

  public async updateCourse(courseId: string, courseData: Partial<CourseCreate>): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    const { tags, documents, ...courseDetails } = courseData;
    await DB.Courses.update(courseDetails, { where: { id: courseId } });

    await this.attachTagsAndDocuments(courseId, tags, documents);

    return DB.Courses.findByPk(courseId);
  }

  // Phương thức thêm tags và documents cho course
  private async attachTagsAndDocuments(courseId: string, tags?: string[], documents?: string[]): Promise<void> {
    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createCourseTag(courseId, tagId)));
    }

    if (documents?.length) {
      await Promise.all(
        documents.map(url =>
          this.CourseDocument.createDocument({
            courseId,
            url,
            title: url,
          }),
        ),
      );
    }
  }

  public async joinCourse(courseId: string, userId: string, password: string): Promise<CourseEnrollment> {
    const findCourse: Course = await DB.Courses.scope('withPassword').findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    if (findCourse.password) {
      const isPasswordMatching: boolean = await compare(password, findCourse.password);
      if (!isPasswordMatching) throw new HttpException(401, 'Invalid password');
    }

    // Notification: Thông báo vào khóa học
    const notificationData: Notification = {
      type: ENUM_TYPE_NOTIFICATION.JOIN_COURSE,
      title: 'New Course Enrollment',
      message: `New course enrollment "${findCourse.title}"`,
      userId: findCourse.authorId,
      link: `/courses/${courseId}`,
    };

    await this.notificationService.createNotification(notificationData);
    return this.CourseEnrollment.createEnrollment({ courseId, userId });
  }

  public async deleteCourse(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await DB.Courses.destroy({ where: { id: courseId } });

    return DB.Courses.findByPk(courseId);
  }

  public async destroyCourse(courseId: string): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId, { paranoid: false });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await DB.Courses.destroy({ force: true, where: { id: courseId } });

    return findCourse;
  }
}
