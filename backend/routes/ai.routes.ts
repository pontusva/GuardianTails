import authJwt from '../middleware/authJwt';
import { Express } from 'express';
import * as aiController from '../controllers/ai.controller';

export const aiRoutes = (app: Express) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/oai', [authJwt.verifyToken], aiController.oai);

  // call this route once to create a thread
  app.get('/api/oai/thread', [authJwt.verifyToken], aiController.createThread);

  // call this route to check if a user has a thread
  app.post(
    '/api/oai/is-user-thread',
    [authJwt.verifyToken],
    aiController.isUserThread
  );
};
