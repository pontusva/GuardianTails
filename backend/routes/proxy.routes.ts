import authJwt from '../middleware/authJwt';
import { Express } from 'express';
import * as controller from '../controllers/user.controller';

export const mapRoutes = (app: Express) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/auth/map', [authJwt.verifyToken], controller.map);
};
