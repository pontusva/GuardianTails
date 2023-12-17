import { Sequelize, DataTypes, Model } from 'sequelize';

interface UserInstance extends Model {
  user_id: number;
  username: string;
  email: string;
  password: string;
  thread_id: string;
  assistant_id: string;
}

export const userModelFunc = (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>('users', {
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
    thread_id: {
      type: DataTypes.STRING,
    },
    assistant_id: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
