import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
interface LostPet {
  id: number;
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
  const [petInfo, setPetInfo] = useState<ImageGallery[]>([]);

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

    return data;
  };

  useEffect(() => {
    getUsersLostPets().then(async data => {
      const fetchPromises = data.map((pet: LostPet) =>
        fetch(
          `http://localhost:8080/images/${pet.ImageGalleries[0].image_url}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        )
          .then(response => response.blob())
          .then(blob => ({ pet, image_url: URL.createObjectURL(blob) }))
      );
      console.log(data);
      const petImages = await Promise.all(fetchPromises);

      setPetInfo(petImages);
    });
  }, []);

  useEffect(() => {
    console.log(petInfo);
    return () => {
      petInfo.forEach(petImage => URL.revokeObjectURL(petImage.image_url));
    };
  }, [petInfo]);

  return (
    <>
      {petInfo.map((petImage, index) => (
        <div className="flex flex-col items-center" key={index}>
          <h1 className="mt-8 text-2xl">{petImage.pet.name}</h1>
          <img className="object-fit w-96" src={petImage.image_url} alt="Pet" />
        </div>
      ))}
    </>
  );
}
