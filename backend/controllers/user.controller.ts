import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

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

export const getImage = (req: Request, res: Response) => {
  const imageName = req.params.imageName;
  console.log(imageName);
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
};

export const uploadImage = (req: Request, res: Response) => {
  const imageName = req.file && req.file.filename;
  const description = req.body.description;

  // Save this data to a database probably

  console.log(description, imageName);
  res.send({ description, imageName });
};
