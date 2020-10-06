// import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Response, CookieOptions } from 'express';
import UserService from '../services/user.service';
import { isDecryptionValid } from '../utils/encrypt.util';
import HttpUtil from '../utils/http.util';
import { RequestWithBody } from '../utils/interfaces';

const httpUtil = new HttpUtil();

interface ILoginInfo {
  username: string;
  password: string;
}

const jwtToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const decodeJwt = (token: string) => {
  return promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET as string,
  ) as Promise<{ id: string; iat: number; exp: number }>;
};

class AuthController {
  static async login(req: RequestWithBody<ILoginInfo>, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      httpUtil.setError(400, 'Incomplete info.');
      return httpUtil.send(res);
    }

    try {
      const user = await UserService.getUserByUsername(username);
      if (!user) {
        httpUtil.setError(401, 'Credentials invalid');
        return httpUtil.send(res);
      }

      if (
        await isDecryptionValid(
          password,
          user.salt as string,
          user.password as string,
        )
      ) {
        const token = jwtToken(user.id);

        let cookieOptions: CookieOptions = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          secure: false,
          httpOnly: true,
        };
        if (process.env.NODE_ENV === 'production')
          cookieOptions = { ...cookieOptions, secure: true };

        res.cookie('jwt', token, cookieOptions);
        httpUtil.setSuccess(201, 'User logged in!', {
          id: user._id,
          username: user.username,
          email: user.email,
        });
        return httpUtil.send(res);
      }

      httpUtil.setError(401, 'Credentials invalid.');
      return httpUtil.send(res);
    } catch (error) {
      httpUtil.setError(400, error);
      return httpUtil.send(res);
    }
  }
}

export default AuthController;
