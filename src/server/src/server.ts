import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CommentRoute } from './routes/comment.route';
import { CourseRoute } from './routes/courses.route';
import { FileRoute } from './routes/file.route';
import { NotificationRoute } from './routes/notification.route';
import { PostRoute } from './routes/posts.route';
import { ReposRoute } from './routes/repos.route';
import { SearchRoute } from './routes/search.route';
import { TagRoute } from './routes/tags.route';
import { TopicRoute } from './routes/topic.route';
import { GitHubRoute } from './routes/github.route';
ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new CourseRoute(),
  new FileRoute(),
  new PostRoute(),
  new TagRoute(),
  new CommentRoute(),
  new TopicRoute(),
  new GitHubRoute(),
  new NotificationRoute(),
  new SearchRoute(),
  new ReposRoute(),
]);

app.listen();
