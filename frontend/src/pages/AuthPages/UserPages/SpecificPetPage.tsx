import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface LostPet {
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
  ImageGalleries: {
    image_url: string;
  }[];
  image_url: string;
}

export default function SpecificPetPage() {
  const [result, setResult] = useState<LostPet | {}>({});
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const getPet = async () => {
    const response = await fetch(
      `http://localhost:8080/api/specific-lost-pet/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ user_id: Cookies.get('user_id') }),
      }
    );
    const data = await response.json();
    setResult(data);
    return data;
  };

  useEffect(() => {
    getPet();
  }, []);

  return (
    <div>
      {'status' in result && (
        <div className="flex flex-col items-center">
          <div>
            <div className="flex justify-center ">
              <div
                className="w-10 h-10 rounded-full self-start"
                style={{
                  backgroundColor: `${result.color}`,
                }}
              />
              <h1 className="text-4xl">{result.name}</h1>
            </div>
            <img
              src={`http://localhost:8080/images/${result.ImageGalleries[0].image_url}`}
              alt=""
            />
            <div>
              <p>{result.status}</p>
              <p>{result.description}</p>
              <p>{result.breed}</p>
              <p>{result.last_seen_location}</p>
              <p>{result.type}</p>
              <p>{result.updatedAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
