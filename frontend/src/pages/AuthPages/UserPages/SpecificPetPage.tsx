import { useLocation } from 'react-router-dom';

export default function SpecificPetPage() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  // const getPet = async () => {
  //   const response = await fetch(
  //     `http://localhost:8080/api/pet/${id}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };
  return (
    <div>
      <h1>SpecificPetPage</h1>
    </div>
  );
}
