import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { options, uri } from './db';

import User from './model/user.model';

mongoose.connect(uri, options).then((con) => console.log(con));

const user = new User(1, 'Test User');
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, ${user.name}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
