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
import { UserService } from './users.service';
import { User } from '@/interfaces/users.interface';

@Service()
export class CourseService {
  constructor(
    private notificationService = Container.get(NotificationService),
    public Tag = Container.get(TagService),
    public CourseDocument = Container.get(CourseDocumentService),
    public CourseEnrollment = Container.get(CourseEnrollmentService),
    public User = Container.get(UserService),
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
    isAdmin = false,
  ): Promise<{ count: number; rows: Course[] }> {
    const { count, rows } = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
      include: [
        {
          model: DB.Users,
          as: 'author',
          attributes: ['id', 'name', 'username', 'avatar'],
          required: true,
          paranoid: !isAdmin,
        },
      ],
      where: {
        ...(search && { title: { [Op.like]: `%${search}%` } }),
        ...(type && { type }),
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'id',
      paranoid: !isAdmin,
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

  public async findCourseByTagId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    tagId: string,
  ): Promise<{ count: number; rows: Course[] }> { 
    const courses = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
      include: [{
        model: DB.Tags,
        as: 'tags',
        where: { id: tagId },
        required: true,
        through: {
          attributes: [] // Exclude CourseTag attributes from result
        }
      }],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'id',
    });

    return courses;
  }

  // Alternative method using CourseTag directly
  public async findCourseByTagIdAlternative(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    tagId: string,
  ): Promise<{ count: number; rows: Course[] }> {
    // First get course IDs that have the specified tag
    const courseTagsResult = await DB.CourseTag.findAll({
      where: { tagId },
      attributes: ['courseId']
    });
    
    const courseIds = courseTagsResult.map(ct => ct.courseId);
    
    if (courseIds.length === 0) {
      return { count: 0, rows: [] };
    }

    // Get total count of courses with this tag (without pagination)
    const totalCount = courseIds.length;

    // Get paginated courses
    const courses = await DB.Courses.findAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
          [this.topicCountLiteral, 'topicCount'],
        ],
      },
      where: {
        id: { [Op.in]: courseIds }
      },
      include: [{
        model: DB.Tags,
        as: 'tags',
        through: {
          attributes: []
        }
      }],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
    });

    return { count: totalCount, rows: courses };
  }

  public async findCourseById(courseId: string, isAdmin = false): Promise<Course> {
    const findCourse: Course = await DB.Courses.findByPk(courseId, {
      include: [
        {
          model: DB.Users,
          as: 'author',
          attributes: ['id', 'name', 'username', 'avatar'],
          required: true,
          paranoid: !isAdmin,
        },
      ],
      paranoid: !isAdmin,
    });
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
    const user: User = await this.User.findUserById(userId);
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    if (findCourse.password) {
      const isPasswordMatching: boolean = await compare(password, findCourse.password);
      if (!isPasswordMatching) throw new HttpException(401, 'Invalid password');
    }

    // Notification: Thông báo vào khóa học
    const notificationData: Notification = {
      type: ENUM_TYPE_NOTIFICATION.JOIN_COURSE,
      title: 'New Course Enrollment',
      message: `${user.name} joined "${findCourse.title}"`,
      userId: findCourse.authorId,
      courseId: courseId,
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

  public async restoreCourse(courseId: string): Promise<Course> { 
    const findCourse: Course = await DB.Courses.findByPk(courseId, { paranoid: false });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await DB.Courses.restore({ where: { id: courseId } });

    return findCourse;
  }

  // Debug method to check CourseTag data
  public async getCourseTagDebugData() {
    const courseTagsData = await DB.CourseTag.findAll({
      include: [
        { model: DB.Courses, as: 'course', attributes: ['id', 'title'] },
        { model: DB.Tags, as: 'tag', attributes: ['id', 'name'] }
      ]
    });
    return courseTagsData;
  }
}
