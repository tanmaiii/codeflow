import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CourseRoute } from './routes/courses.route';
import { UploadRoute } from './routes/upload.route';
import { PostRoute } from './routes/posts.route';
import { TagRoute } from './routes/tags.route';
import { CommentRoute } from './routes/comment.route';
import { TopicRoute } from './routes/topic.route';
import { GroupRoute } from './routes/group.route';
ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new CourseRoute(),
  new UploadRoute(),
  new PostRoute(),
  new TagRoute(),
  new CommentRoute(),
  new TopicRoute(),
  new GroupRoute(),
]);

app.listen();
