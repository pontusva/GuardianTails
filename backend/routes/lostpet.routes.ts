import authJwt from '../middleware/authJwt';
import * as controller from '../controllers/lostpet.controller';
import { Express } from 'express';

export const lostPetRoutes = (app: Express) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/lost-pet-description',
    [authJwt.verifyToken],
    controller.createLostPet
  );
};
