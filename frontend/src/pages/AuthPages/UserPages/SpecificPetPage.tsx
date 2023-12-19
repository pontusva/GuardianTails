import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface LostPet {
  data: {
    id: number;
    pet_id: number;
    name: string;
    type: string;
    breed: string;
    description: string;
    last_seen_location: string;
    color: string;
    userId: number;
    updatedAt: string;
    status: string;
  };
  image_url: string;
}

export default function SpecificPetPage() {
  const [pet, setPet] = useState<LostPet | {}>({});
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const getPet = async () => {
    const response = await fetch(
      `http://localhost:8080/api/specific-lost-pet/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    getPet().then(async data => {
      console.log(data.ImageGalleries[0].image_url);
      const response = fetch(
        `http://localhost:8080/images/${data.ImageGalleries[0].image_url}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
        .then(response => response.blob())
        .then(blob => ({ data, image_url: URL.createObjectURL(blob) }));
      const singlePet = await response;
      setPet(singlePet);
    });
  }, []);

  console.log(pet);
  return (
    <div>
      {pet && 'data' in pet && (
        <div className="flex flex-col items-center">
          <div>
            <div className="flex justify-center ">
              <div
                className="w-10 h-10 rounded-full self-start"
                style={{
                  backgroundColor: `${pet.data.color}`,
                }}
              />
              <h1 className="text-4xl">{pet.data.name}</h1>
            </div>
            <img src={pet.image_url} alt="" />
            <div>
              <p>{pet.data.status}</p>
              <p>{pet.data.description}</p>
              <p>{pet.data.breed}</p>

              <p>{pet.data.last_seen_location}</p>
              <p>{pet.data.type}</p>
              <p>{pet.data.updatedAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
