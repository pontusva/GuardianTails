import verifySignUp from '../middleware/verifySignUp';
import { signin, signup } from '../controllers/auth.controller';
import authJwt from '../middleware/authJwt';
import * as controller from '../controllers/user.controller';
import { Express } from 'express-serve-static-core';

export const authRoutes = (app: Express) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

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

export const userAuthRoutes = (app: Express) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
