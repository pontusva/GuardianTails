import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function SpecificPetPage() {
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
    console.log(data);
    return data;
  };

  useEffect(() => {
    getPet();
  }, []);
  return (
    <div>
      <h1>SpecificPetPage</h1>
    </div>
  );
}
