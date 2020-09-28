import express, { Application, Request, Response } from 'express';
import User from './model/user.model';

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
