import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import cookieSession from 'cookie-session';
import dotenv from 'dotenv';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

dotenv.config();

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false
    // secure: true
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
