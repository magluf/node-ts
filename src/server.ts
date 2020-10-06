import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { options, uri } from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();

const origin =
  process.env.NODE_ENV !== 'development'
    ? 'http://localhost:3000'
    : 'https://stock-chat-app.herokuapp.com';

app.use(cors({ origin, credentials: true }));

mongoose
  .connect(uri, options)
  .then(() => console.log('DB connection successful!'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
