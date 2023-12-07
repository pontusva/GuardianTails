import { dbConnection } from '../config/db.config';
import { roleModelFunc } from '../models/role.model';
import { userModelFunc } from '../models/user.model';
import {
  petModelFunc,
  petLocationHistory,
  petReportModelFunc,
  imageGalleryModel,
} from './pet.model';
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
    pet: petModelFunc(sequelize),
    petLocationHistory: petLocationHistory(sequelize),
    petReport: petReportModelFunc(sequelize),
    petImageGallery: imageGalleryModel(sequelize),
    ROLES: ['user', 'admin', 'moderator'],
  };

  // users and roles have a many-to-many relationship
  db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'user_id',
  });
  db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'user_id',
  });

  // pets and users have a one-to-many relationship
  db.pet.belongsTo(db.user, { foreignKey: 'owner_id' });
  db.user.hasMany(db.pet, { foreignKey: 'owner_id' });

  // pets and petLocationHistory have a one-to-many relationship
  db.petLocationHistory.belongsTo(db.pet, { foreignKey: 'pet_id' });
  db.pet.hasMany(db.petLocationHistory, { foreignKey: 'pet_id' });

  // reports and users have a one-to-many relationship
  db.petReport.belongsTo(db.user, { foreignKey: 'reporter_id' });
  db.user.hasMany(db.petReport, { foreignKey: 'reporter_id' });

  db.petReport.belongsTo(db.pet, { foreignKey: 'pet_id' });
  db.pet.hasMany(db.petReport, { foreignKey: 'pet_id' });

  return db;
};

export default dbInitFunction;
