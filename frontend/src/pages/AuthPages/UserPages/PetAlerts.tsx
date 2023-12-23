import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
                <div className="flex flex-col items-center ">
                  <div className="flex text-xl mt-10 justify-between">
                    <h1 className="">{lostPet.name}</h1>
                  </div>

                  <img
                    width={300}
                    src={`http://localhost:8080/images/${lostPet.ImageGalleries[0].image_url}`}
                  />
                  <NavLink to={`/pet-alerts/${lostPet.pet_id}`}>
                    <span className="text-sm">more info...</span>
                  </NavLink>
                </div>
              </>
            );
          })}
      </p>
    </div>
  );
}
