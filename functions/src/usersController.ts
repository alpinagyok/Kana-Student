import { Response, Request, NextFunction } from 'express';
import { admin } from './config/firebase';

interface RequestCustom extends Request {
  authToken: string;
  authId: string;
}

type UserReg = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export const createUser = async (
  req: Request<Record<string, never>, Record<string, never>, UserReg>,
  res: Response,
): Promise<Response> => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    const user = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });
    return res.status(200).json(user);
  } catch (error) { return res.status(500).json(error); }
};

const getAuthToken = (
  req: RequestCustom,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // eslint-disable-next-line prefer-destructuring
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = '';
  }
  next();
};

export const checkIfAuthenticated = (
  req: RequestCustom,
  res: Response,
  next: NextFunction,
): void => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};
