import dotenv from 'dotenv';
dotenv.config();
export const jwtSecret = {
  secret: process.env.JWT_SECRET,
};
