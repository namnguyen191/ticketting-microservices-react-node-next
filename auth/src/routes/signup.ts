import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import {
  BadRequestError,
  RequestValidationError,
  validateRequest
} from '@nnticketting/common';
import { User } from '../models/user';
import { CustomRequest, RegisterFormBody } from '../services/Interfaces';

dotenv.config();
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: CustomRequest<RegisterFormBody>, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email is already exist!');
    }

    const user = User.build({
      email,
      password
    });

    await user.save();

    // Generate JWT and store it on the session object
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJWT
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
