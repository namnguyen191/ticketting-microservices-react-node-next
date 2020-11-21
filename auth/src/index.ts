import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key is not defined!');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
    try {
      await mongoose.connect(process.env.MONGO_URI_DEV!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.log(err);
    }
  }

  app.listen(3000, () => {
    console.log('Listening on Port 3000!');
  });
};

start();
