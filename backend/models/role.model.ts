import { Sequelize, DataTypes } from 'sequelize';
// import { Sequelize, DataTypes } from '@sequelize/core';

export const roleModelFunc = (sequelize: Sequelize) => {
  const Role = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  return Role;
};
