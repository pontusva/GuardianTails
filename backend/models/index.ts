const config = require('../config/db.config.js');
import { dbConnection } from '../config/db.config';
import { roleModelFunc } from '../models/role.model';
import { userModelFunc } from '../models/user.model';
import { Sequelize } from 'sequelize';

const dbInitFunction = () => {
  if (!dbConnection.DB || !dbConnection.USER || !dbConnection.PASSWORD)
    return null;

  const sequelize = new Sequelize(
    dbConnection.DB,
    dbConnection.USER,
    dbConnection.PASSWORD,
    {
      host: dbConnection.HOST,
      dialect: 'postgres',
      pool: {
        max: dbConnection.pool.max,
        min: dbConnection.pool.min,
        acquire: dbConnection.pool.acquire,
        idle: dbConnection.pool.idle,
      },
    }
  );

  const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    user: userModelFunc(sequelize),
    role: roleModelFunc(sequelize),
    ROLES: ['user', 'admin', 'moderator'],
  };

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = userModelFunc(sequelize);
  db.role = roleModelFunc(sequelize);

  db.role.belongsToMany(db.user, {
    through: 'user_roles',
  });

  db.user.belongsToMany(db.role, {
    through: 'user_roles',
  });

  db.ROLES = ['user', 'admin', 'moderator'];
  return db;
};
// if (!dbConnection.DB || !dbConnection.USER || !dbConnection.PASSWORD)
//   return null;

// const sequelize = new Sequelize(
//   dbConnection.DB,
//   dbConnection.USER,
//   dbConnection.PASSWORD,
//   {
//     host: dbConnection.HOST,
//     dialect: 'postgres',
//     pool: {
//       max: dbConnection.pool.max,
//       min: dbConnection.pool.min,
//       acquire: dbConnection.pool.acquire,
//       idle: dbConnection.pool.idle,
//     },
//   }
// );

// const db = {
//   sequelize: sequelize,
//   Sequelize: Sequelize,
//   user: userModelFunc(sequelize),
//   role: roleModelFunc(sequelize),
//   ROLES: ['user', 'admin', 'moderator'],
// };

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.user = userModelFunc(sequelize);
// db.role = roleModelFunc(sequelize);

// db.role.belongsToMany(db.user, {
//   through: 'user_roles',
// });
// db.user.belongsToMany(db.role, {
//   through: 'user_roles',
// });

// db.ROLES = ['user', 'admin', 'moderator'];

export default dbInitFunction;
