import { Request, Response, NextFunction } from 'express';
import { main } from '../oai/init';
import { Model } from 'sequelize';
interface LostPet {
  pet_id?: number;
  owner_id?: number;
}
interface ILostPet extends Model {
  owner_id: number;
  // Add other properties of LostPet as needed
}

import dbInitFunction from '../models';
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

export const authorizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageName = req.params.pet_id;

  // Fetch the image from the database
  const image = await PetImageGallery!.findByPk(imageName);

  // Check if the image exists
  if (!image) {
    return res.status(404).json({ message: 'Image not found.' });
  }

  // Fetch the pet associated with the image
  const pet = await LostPet!.findOne({
    where: { pet_id: imageName },
  });

  // Check if the pet exists and if the user is authorized to view it
  if (!pet || pet.owner_id !== Number(req.body.user_id)) {
    return res
      .status(403)
      .json({ message: 'You are not authorized to view this image.' });
  }

  // If the user is authorized, proceed to the next middleware
  next();
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

export const getSpecificLostPet = async (req: Request, res: Response) => {
  const { pet_id } = req.params;

  const pet = await LostPet!.findOne({
    where: {
      pet_id,
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

  res.send(pet);
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
