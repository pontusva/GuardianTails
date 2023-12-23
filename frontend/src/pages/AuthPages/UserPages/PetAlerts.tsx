import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface PetAlerts {
  ImageGalleries: {
    image_url: string;
  }[];
  pet_id: number;
  name: string;
  age: number;
  color: string;
  createdAt: string;
  description: string;
  last_seen_location: string;
  owner_id: number;
  species: string;
  updatedAt: string;
  user: {
    username: string;
    email: string;
  };
}

export default function PetAlerts() {
  const [result, setResult] = useState<PetAlerts[]>([]);
  const getAllPetAlerts = async () => {
    const response = await fetch('http://localhost:8080/api/all-lost-pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await response.json();
    setResult(data);
  };

  useEffect(() => {
    getAllPetAlerts();
  }, []);

  console.log(result);

  return (
    <div>
      <p>
        {result &&
          result.map((lostPet: PetAlerts) => {
            return (
              <>
                <h1>{lostPet.user.username}</h1>
                <img
                  src={`http://localhost:8080/images/${lostPet.ImageGalleries[0].image_url}`}
                />
                <p>{lostPet.name}</p>
                <p>{lostPet.species}</p>
                <p>{lostPet.description}</p>
                <p>{lostPet.age}</p>
                <p>{lostPet.color}</p>
                <p>{lostPet.createdAt}</p>
                <p>{lostPet.last_seen_location}</p>
                <p>{lostPet.updatedAt}</p>
              </>
            );
          })}
      </p>
    </div>
  );
}
