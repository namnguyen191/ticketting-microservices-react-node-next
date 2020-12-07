import express from 'express';

import dotenv from 'dotenv';

import { currentUser } from '@nnticketting/common';

dotenv.config();

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
