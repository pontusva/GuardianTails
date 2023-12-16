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

// export const uploadImage = (req: Request, res: Response) => {
//   const imageName = req.file && req.file.filename;
//   const description = req.body.description;

//   const pet_id = req.body.pet_id; // You need to get the pet_id from somewhere

//   // Create a new instance of the ImageGallery model
//   PetImageGallery!.create({
//     pet_id,
//     image_url: imageName,
//     description,
//   });

//   // Save the instance to the database
//   try {
//     console.log('Image saved successfully');
//     res.send({ description, imageName });
//   } catch (error) {
//     console.error('Failed to save image:', error);
//     res.status(500).send({ error: 'Failed to save image' });
//   }

//   console.log(description, imageName);
//   res.send({ description, imageName });
// };

export const uploadImageTest = async (req: Request, res: Response) => {
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
