import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { HttpException } from '@/exceptions/HttpException';
import { Course, CourseCreate, CourseEnrollment } from '@/interfaces/courses.interface';
import { Notification } from '@/interfaces/notification.interface';
import { User, UserContributes } from '@/interfaces/users.interface';
import { DB } from '@database';
import { compare, hash } from 'bcrypt';
import { Op, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { CourseDocumentService } from './course_document.service';
import { CourseEnrollmentService } from './course_enrollment.service';
import { NotificationService } from './notification.service';
import { TagService } from './tag.service';
import { UserService } from './users.service';
import { logger } from '@/utils/logger';
import { ReposService } from './repos.service';

@Service()
export class CourseService {
  private notificationService: NotificationService;
  private tagService: TagService;
  private courseDocumentService: CourseDocumentService;
  private courseEnrollmentService: CourseEnrollmentService;
  private userService: UserService;
  private _reposService: ReposService;

  constructor() {
    this.notificationService = Container.get(NotificationService);
    this.tagService = Container.get(TagService);
    this.courseDocumentService = Container.get(CourseDocumentService);
    this.courseEnrollmentService = Container.get(CourseEnrollmentService);
    this.userService = Container.get(UserService);
  }

  // Lazy getter để tránh circular dependency
  private get reposService(): ReposService {
    if (!this._reposService) {
      this._reposService = Container.get(ReposService);
    }
    return this._reposService;
  }

  // Lazy getter để tránh circular dependency

  private readonly commentCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM comments AS c
    WHERE c.course_id = courses.id
    AND c.deleted_at is NULL
  )`);

  private readonly enrollmentCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM course_enrollments AS ce
    WHERE ce.course_id = courses.id
    AND ce.deleted_at is NULL
  )`);

  private readonly topicCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM topics AS t
    WHERE t.course_id = courses.id
    AND t.deleted_at is NULL
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
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : (page - 1) * pageSize,
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
    const enrollments = await this.courseEnrollmentService.findEnrollmentByUserId(userId);
    const courseIds = enrollments.map(enrollment => enrollment.courseId);

    const registeredCourses = await DB.Courses.findAndCountAll({
      attributes: {
        include: [
          [this.commentCountLiteral, 'commentCount'],
          [this.topicCountLiteral, 'topicCount'],
          [this.enrollmentCountLiteral, 'enrollmentCount'],
        ],
      },
      where: { id: { [Op.in]: courseIds } },
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : (page - 1) * pageSize,
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
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : (page - 1) * pageSize,
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
      include: [
        {
          model: DB.Tags,
          as: 'tags',
          where: { id: tagId },
          required: true,
          through: {
            attributes: [], // Exclude CourseTag attributes from result
          },
        },
      ],
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : (page - 1) * pageSize,
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
      attributes: ['courseId'],
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
        id: { [Op.in]: courseIds },
      },
      include: [
        {
          model: DB.Tags,
          as: 'tags',
          through: {
            attributes: [],
          },
        },
      ],
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

    if (courseData.password) {
      courseData.password = await hash(courseData.password, 10);
    }

    const { tags, documents, ...courseDetails } = courseData;
    await DB.Courses.update(courseDetails, { where: { id: courseId } });

    await this.attachTagsAndDocuments(courseId, tags, documents);

    return DB.Courses.findByPk(courseId);
  }

  // Phương thức thêm tags và documents cho course
  private async attachTagsAndDocuments(courseId: string, tags?: string[], documents?: string[]): Promise<void> {
    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.tagService.createCourseTag(courseId, tagId)));
    }

    if (documents?.length) {
      await Promise.all(
        documents.map(url =>
          this.courseDocumentService.createDocument({
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
    const user: User = await this.userService.findUserById(userId);
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
    return this.courseEnrollmentService.createEnrollment({ courseId, userId });
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
        { model: DB.Tags, as: 'tag', attributes: ['id', 'name'] },
      ],
    });
    return courseTagsData;
  }

  public async getCourseAllActivity(courseId: string, days: number = 7) {
    const course = await this.findCourseById(courseId);
    if (!course) throw new HttpException(409, "Course doesn't exist");

    const repos = await DB.Repos.findAll({ where: { courseId: course.id } });

    // Tìm ngày commit mới nhất
    let latestDate: Date | null = null;

    for (const repo of repos) {
      // Check latest commit
      const latestCommit = await DB.Commits.findOne({
        where: { reposId: repo.id },
        order: [['createdAt', 'DESC']],
        limit: 1,
      });

      if (latestCommit) {
        const commitDate = new Date(latestCommit.createdAt);
        if (!latestDate || commitDate > latestDate) {
          latestDate = commitDate;
        }
      }
    }

    // Nếu không có hoạt động nào, trả về empty activity
    if (!latestDate) {
      return {
        activities: [],
        totalCommits: 0,
        totalPullRequests: 0,
        totalCodeAnalysis: 0,
      };
    }

    // Set endDate to the latest activity date and calculate startDate (ngày cuối cùng và ngày đầu tiên)
    const endDate = latestDate;
    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - days);

    logger.info(`Getting all activities from ${startDate.toISOString()} to ${endDate.toISOString()} (${days} days)`);

    // Get all activities from all repos
    const [allCommits, allPRs, allAnalysis] = await Promise.all([
      // Get commits
      Promise.all(
        repos.map(async repo => {
          const commits = await DB.Commits.findAll({
            where: { reposId: repo.id },
          });
          return commits;
        }),
      ),
      // Get pull requests
      Promise.all(
        repos.map(async repo => {
          const pullRequests = await DB.PullRequests.findAll({
            where: { reposId: repo.id },
          });
          return pullRequests;
        }),
      ),
      // Get code analysis
      Promise.all(
        repos.map(async repo => {
          const codeAnalysis = await DB.CodeAnalysis.findAll({
            where: { reposId: repo.id },
          });
          return codeAnalysis;
        }),
      ),
    ]);

    // Flatten all activities into single arrays
    const flattenedCommits = allCommits.flat();
    const flattenedPRs = allPRs.flat();
    const flattenedAnalysis = allAnalysis.flat();

    // Filter activities by date range
    const filteredCommits = flattenedCommits.filter(commit => {
      const commitDate = new Date(commit.createdAt);
      return commitDate >= startDate && commitDate <= endDate;
    });

    const filteredPRs = flattenedPRs.filter(pr => {
      const prDate = new Date(pr.createdAt);
      return prDate >= startDate && prDate <= endDate;
    });

    const filteredAnalysis = flattenedAnalysis.filter(analysis => {
      const analysisDate = new Date(analysis.analyzedAt);
      return analysisDate >= startDate && analysisDate <= endDate;
    });

    // Initialize all dates in range with 0 activities
    const activitiesByDate: { [date: string]: { commits: number; pullRequests: number; codeAnalysis: number } } = {};

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD format
      activitiesByDate[dateStr] = {
        commits: 0,
        pullRequests: 0,
        codeAnalysis: 0,
      };
    }

    // Count commits for each date
    filteredCommits.forEach(commit => {
      const commitDate = new Date(commit.createdAt);
      const dateStr = commitDate.toISOString().split('T')[0];
      if (activitiesByDate.hasOwnProperty(dateStr)) {
        activitiesByDate[dateStr].commits++;
      }
    });

    // Count pull requests for each date
    filteredPRs.forEach(pr => {
      const prDate = new Date(pr.createdAt);
      const dateStr = prDate.toISOString().split('T')[0];
      if (activitiesByDate.hasOwnProperty(dateStr)) {
        activitiesByDate[dateStr].pullRequests++;
      }
    });

    // Count code analysis for each date
    filteredAnalysis.forEach(analysis => {
      const analysisDate = new Date(analysis.analyzedAt);
      const dateStr = analysisDate.toISOString().split('T')[0];
      if (activitiesByDate.hasOwnProperty(dateStr)) {
        activitiesByDate[dateStr].codeAnalysis++;
      }
    });

    // Convert to array format for easier frontend consumption
    // Filter out dates where all activities are 0
    const dailyActivities = Object.entries(activitiesByDate)
      .filter(([date, activities]) => {
        return activities.commits > 0 || activities.pullRequests > 0 || activities.codeAnalysis > 0;
      })
      .map(([date, activities]) => ({
        date,
        ...activities,
      }));

    return {
      activities: dailyActivities,
      totalCommits: filteredCommits.length,
      totalPullRequests: filteredPRs.length,
      totalCodeAnalysis: filteredAnalysis.length,
    };
  }

  public async contributors(courseId: string): Promise<any[]> {
    const course = await this.findCourseById(courseId);
    if (!course) throw new HttpException(409, "Course doesn't exist");

    const repos = await DB.Repos.findAll({ where: { courseId: course.id } });

    const contributorPromises = repos.map(async repo => {
      const repoContributors = await this.reposService.getRepoContributors(repo.id);
      return repoContributors;
    });

    const contributorResults = await Promise.all(contributorPromises);
    const allContributors = contributorResults.flat();

    // Gộp contributors có cùng authorId
    const mergedContributors = this.mergeContributorsByAuthorId(allContributors);

    return mergedContributors;
  }

  private mergeContributorsByAuthorId(contributors: UserContributes[]): UserContributes[] {
    const contributorMap = new Map<string, UserContributes>();

    contributors.forEach(contributor => {
      const { authorId } = contributor;

      if (contributorMap.has(authorId)) {
        // Nếu đã có contributor này, gộp các thống kê
        const existing = contributorMap.get(authorId);
        if (existing) {
          existing.commit.total += contributor.commit.total;
          existing.commit.additions += contributor.commit.additions;
          existing.commit.deletions += contributor.commit.deletions;

          existing.pullRequest.total += contributor.pullRequest.total;
          existing.pullRequest.additions += contributor.pullRequest.additions;
          existing.pullRequest.deletions += contributor.pullRequest.deletions;

          existing.codeAnalysis.total += contributor.codeAnalysis.total;
          existing.codeAnalysis.success += contributor.codeAnalysis.success;
          existing.codeAnalysis.failure += contributor.codeAnalysis.failure;
        }
      } else {
        // Nếu chưa có, thêm mới vào map
        contributorMap.set(authorId, { ...contributor });
      }
    });

    return Array.from(contributorMap.values());
  }
}
