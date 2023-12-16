import { Request, Response } from 'express';
import dbInitFunction from '../models';
import path from 'path';
import fs from 'fs';
const db = dbInitFunction();

const PetImageGallery = db?.petImageGallery;

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

  const pet_id = req.body.pet_id; // You need to get the pet_id from somewhere

  // Create a new instance of the ImageGallery model
  PetImageGallery!.create({
    pet_id,
    image_url: imageName,
    description,
  });

  // Save the instance to the database
  try {
    console.log('Image saved successfully');
    res.send({ description, imageName });
  } catch (error) {
    console.error('Failed to save image:', error);
    res.status(500).send({ error: 'Failed to save image' });
  }

  console.log(description, imageName);
  res.send({ description, imageName });
};
