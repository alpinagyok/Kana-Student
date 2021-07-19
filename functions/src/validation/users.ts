import { body, ValidationChain } from 'express-validator';

const validateUsers = (method: string): ValidationChain[] => {
  switch (method) {
    case 'createUser':
    default: {
      return [
        body('email', { code: 'auth/invalid-email', message: 'Empty email' }).exists(),
        body('password', { code: 'auth/invalid-password', message: 'Empty password' }).exists(),
        body('displayName', { code: 'auth/invalid-name', message: 'Invalid name (min length 3)' }).exists().isLength({ min: 3 }),
      ];
    }
  }
};

export default validateUsers;
