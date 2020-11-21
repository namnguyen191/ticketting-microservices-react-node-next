import { Request } from 'express';

export interface CustomRequest<T> extends Request {
  body: T;
}

export interface RegisterFormBody {
  email: string;
  password: string;
}

export interface UserPayload {
  id: string;
  email: string;
}