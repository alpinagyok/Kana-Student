import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { admin, db } from './config/firebase';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export interface RequestCustom<P = any, ResBody = any, ReqBody = any> extends Request {
  authToken: string;
  authId: string;
}

type UserReg = {
  email: string,
  password: string,
  displayName: string,
}

export const createUser = async (
  req: Request<Record<string, never>, Record<string, never>, UserReg>,
  res: Response,
): Promise<Response> => {
  try {
    const {
      email,
      password,
      displayName,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }

    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    // Add default achievement for registration
    await db.collection('users').doc(user.uid).set({
      achievements: ['p0uprM2NDTzZ5J95nvxq'],
    });
    return res.status(200).json({ achievements: [1] });
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
