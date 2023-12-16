import authJwt from '../middleware/authJwt';
import * as controller from '../controllers/user.controller';
import { Express } from 'express';
import multer from 'multer';
import cors from 'cors';
const upload = multer({ dest: 'images/' });
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

  app.get(
    '/images/:imageName',
    cors(),
    [authJwt.verifyToken],
    controller.getImage
  );

  app.post(
    '/api/images',
    cors(),
    authJwt.verifyToken,
    upload.single('image'),
    controller.uploadImageTest
  );
};
