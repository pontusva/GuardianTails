import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MapSearchResultDropdown from './MapSearchResultDropdown';

import { Input } from '@chakra-ui/react';

interface Inputs {
  test: string;
}
interface Props {
  mapToken: string;
  token: string | undefined;
  onSelectCity: (ev: number[]) => void;
}

export default function MapSearch({ mapToken, onSelectCity }: Props) {
  const [result, setResult] = useState<unknown[]>();

  const { handleSubmit, control } = useForm<Inputs>({
    mode: 'onChange',
  });
  const searchFunctionSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.test}.json?access_token=${mapToken}`
    );
    const result = await response.json();
    setResult(result.features);
  };

  return (
    <div>
      <MapSearchResultDropdown onSelectCity={onSelectCity} result={result} />
      <form onSubmit={handleSubmit(searchFunctionSubmit)}>
        <Controller
          control={control}
          name="test"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              placeholder="Sök på område"
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
      </form>
    </div>
  );
}
