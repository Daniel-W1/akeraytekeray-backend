import App from '@/app';
import AuthRoute from '@routes/auth.route';
import { HousePostRoute } from '@/routes/housePost.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { BookmarkRoute } from './routes/bookMark.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new HousePostRoute(), new BookmarkRoute()]);

app.listen();
