import verifySignUp from '../middleware/verifySignUp';
import { signin, signup } from '../controllers/auth.controller';
import { Express } from 'express-serve-static-core';
import cors from 'cors';

export const authRoutes = (app: Express) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  }, cors());

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signup
  );

  app.post('/api/auth/signin', signin);
};
