import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface LostPet {}

export default function SpecificPetPage() {
  const [pet, setPet] = useState<LostPet[]>([]);
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
      // const fetchPromises = data.map((pet: LostPet) =>
      //   fetch(
      //     `http://localhost:8080/images/${pet.ImageGalleries[0].image_url}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${Cookies.get('token')}`,
      //       },
      //     }
      //   )
      //     .then(response => response.blob())
      //     .then(blob => ({ pet, image_url: URL.createObjectURL(blob) }))
      // );
      // const petImages = await Promise.all(fetchPromises);
      // setPet(petImages);
    });
  }, []);

  console.log(pet);
  return (
    <div>
      <h1>SpecificPetPage</h1>
    </div>
  );
}
