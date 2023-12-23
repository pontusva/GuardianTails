import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function PetAlerts() {
  const getAllPetAlerts = async () => {
    const response = await fetch('http://localhost:5000//api/all-lost-pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getAllPetAlerts();
  }, []);
  return (
    <div>
      <p>PetAlerts</p>
    </div>
  );
}
