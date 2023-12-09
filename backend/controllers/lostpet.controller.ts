import dbInitFunction from '../models';
import { Request, Response } from 'express';
const db = dbInitFunction();

const LostPet = db?.pet;

export const createLostPet = (req: Request, res: Response) => {
  const { name, species, breed, color, age, description, owener_id, status } =
    req.body;

  const pet = {
    name,
    species,
    breed,
    color,
    age,
    description,
    owener_id,
    status,
  };
  LostPet!
    .create(pet)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the LostPet.',
      });
    });
};
