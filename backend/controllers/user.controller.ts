import { Request, Response } from 'express';

export const allAccess = (req: Request, res: Response) => {
  res.status(200).send('Public Content.');
};

export const userBoard = (req: Request, res: Response) => {
  res.status(200).send('User Content.');
};

export const adminBoard = (req: Request, res: Response) => {
  res.status(200).send('Admin Content.');
};

export const moderatorBoard = (req: Request, res: Response) => {
  res.status(200).send('Moderator Content.');
};

export const map = (req: Request, res: Response) => {
  const mapToken = process.env.MAP_TOKEN;

  res.status(200).json(mapToken);
};
