import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
export default function PetAlertsSpecific() {
  const location = useLocation().pathname.split('/')[2];

  console.log(location);

  const getSpecificPetAlert = async () => {
    const response = await fetch(
      `http://localhost:8080/api/public/specific-lost-pet/${location}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getSpecificPetAlert();
  }, []);

  return (
    <div>
      <p>hello</p>
    </div>
  );
}
