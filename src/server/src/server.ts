import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CourseRoute } from './routes/courses.route';
import { FileRoute } from './routes/file.route';
import { PostRoute } from './routes/posts.route';
import { TagRoute } from './routes/tags.route';
import { CommentRoute } from './routes/comment.route';
import { TopicRoute } from './routes/topic.route';
import { GroupRoute } from './routes/group.route';
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
  new GroupRoute(),
  new GitHubRoute(),
]);

app.listen();
