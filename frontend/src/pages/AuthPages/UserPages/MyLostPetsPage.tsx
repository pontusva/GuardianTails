import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface LostPet {
  id: number;
  pet_id: number;
  name: string;
  type: string;
  breed: string;
  description: string;
  location: string;
  color: string;
  date: string;
  ImageGalleries: ImageGallery[];
  userId: number;
}

interface ImageGallery {
  pet: LostPet;
  image_url: string;
}

export default function MyLostPetsPage() {
  const [result, setResult] = useState<LostPet[]>([]);
  const navigation = useNavigate();

  const getUsersLostPets = async () => {
    const response = await fetch(
      'http://localhost:8080/api/all-user-lost-pets',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          user_id: Cookies.get('user_id'),
        }),
      }
    );
    const data = await response.json();
    setResult(data);
    return data;
  };

  useEffect(() => {
    getUsersLostPets();
  }, []);

  return (
    <>
      {result.map((petImage, index) => {
        console.log(result);
        return (
          <div className="flex flex-col items-center" key={index}>
            <h1
              onClick={() => navigation(`/pet/${petImage.pet_id}`)}
              className="mt-8 text-2xl">
              {petImage.name}
            </h1>
            <img
              src={`http://localhost:8080/images/${petImage.ImageGalleries[0].image_url}`}
              alt=""
            />
          </div>
        );
      })}
    </>
  );
}
