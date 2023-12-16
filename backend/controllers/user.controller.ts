import { Request, Response } from 'express';

interface LostPet {
  pet_id?: number;
}

import dbInitFunction from '../models';
import path from 'path';
import fs from 'fs';
const db = dbInitFunction();

const PetImageGallery = db?.petImageGallery;
const LostPet = db?.pet;
const User = db?.user;
const sequelize = db?.sequelize;

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

export const getAllLostPets = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const pets = await LostPet!.findAll({
    where: {
      status: 'lost',
      owner_id: user_id,
    },
    include: [
      {
        model: PetImageGallery!,
        attributes: ['image_url'],
      },
      {
        model: User, // Include the User model
        attributes: ['username', 'email'], // Specify the attributes you want to include from the User model
      },
    ],
  });

  res.send(pets);
};

export const uploadLostPet = async (req: Request, res: Response) => {
  const imageName = req.file && req.file.filename;

  const {
    name,
    species,
    breed,
    color,
    age,
    last_seen_location,
    description,
    owner_id,
    status,
  } = req.body;

  // Start a new transaction
  const transaction = await sequelize!.transaction();

  try {
    const pet = (await LostPet!.create(
      {
        name,
        species,
        breed,
        color,
        age,
        last_seen_location,
        description,
        owner_id,
        status,
      },
      { transaction }
    )) as LostPet;

    // Create the PetImageGallery
    await PetImageGallery!.create(
      {
        pet_id: pet.pet_id,
        image_url: imageName,
        description,
      },
      { transaction }
    );

    // If both creations are successful, commit the transaction
    await transaction.commit();

    res.send(pet);
  } catch (error) {
    // If there's an error, rollback the transaction
    await transaction.rollback();

    console.error('Failed to save image:', error);
    res.status(500).send({ error: 'Failed to save image' });
  }
};
