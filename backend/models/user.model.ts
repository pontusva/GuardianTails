import { Sequelize, DataTypes } from 'sequelize';

export const userModelFunc = (sequelize: Sequelize) => {
  const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
