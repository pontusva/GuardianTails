import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
interface LostPet {
  id: number;
  name: string;
  type: string;
  breed: string;
  description: string;
  location: string;
  date: string;
  image: string;
  userId: number;
}
export default function MyLostPetsPage() {
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  console.log(Cookies.get('userId'));
  const getUsersLostPets = async () => {
    const response = await fetch(
      'http://localhost:8080/api/all-user-lost-pets',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ user_id: 1 }),
      }
    );
    const data = await response.json();
    setLostPets(data);
  };
  console.log(lostPets);

  useEffect(() => {
    getUsersLostPets();
  }, []);

  return (
    <div>
      <h1>My Lost Pets Page</h1>
    </div>
  );
}

// app.post(
//   '/api/all-user-lost-pets',
//   [authJwt.verifyToken],
//   controller.getAllLostPets
// );
