import { Sequelize, DataTypes } from 'sequelize';

export const userModelFunc = (sequelize: Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
