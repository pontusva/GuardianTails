import dbInitFunction from '../models';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { Op } from '@sequelize/core';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

type Roles = 'user' | 'admin' | 'moderator';

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  roles: Roles[];
}

interface User {
  username: string;
  email: string;
  password: string;
}

const db = dbInitFunction();

const userAndRoleGuard = (function () {
  if (!db) return null;
  const User = db.user;
  const Role = db.role;
  return { User, Role };
})();

const userAndRole = userAndRoleGuard;

const { User, Role }: any = userAndRole || {};

export const signup = (req: Request, res: Response) => {
  // Save User to Database
  const { username, email, password, roles }: SignUpRequest = req.body;

  User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
  })
    .then((user: any) => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles: any) => {
          console.log(roles);
          roles &&
            user.setRoles(roles).then(() => {
              res.send({ message: 'User was registered successfully!' });
            });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req: Request, res: Response) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }
      const secret = process.env.JWT_SECRET as '';
      const token = jwt.sign({ id: user.id }, secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities: string[] = [];

      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.user_id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err.message });
    });
};
