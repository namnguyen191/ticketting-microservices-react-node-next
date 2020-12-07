import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';

import { errorHandler, NotFoundError, requireAuth, currentUser } from '@nnticketting/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

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

app.use(cors());

app.use(currentUser);

// Routes that do not require authentication
app.use(showTicketRouter);
app.use(indexTicketRouter);


// Routes that require authentication
app.use(requireAuth);
app.use(updateTicketRouter);
app.use(createTicketRouter);

app.get('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
