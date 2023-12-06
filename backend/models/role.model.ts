import { Sequelize, DataTypes } from 'sequelize';
// import { Sequelize, DataTypes } from '@sequelize/core';

export const roleModelFunc = (sequelize: Sequelize) => {
  const Role = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  return Role;
};
