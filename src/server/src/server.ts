import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CourseRoute } from './routes/courses.route';
import { UploadRoute } from './routes/upload.route';
ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CourseRoute(), new UploadRoute()]);

app.listen();
