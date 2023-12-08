import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import MapConfirmLocationModal from './MapConfirmLocationModal';
import { Input } from '@chakra-ui/react';

interface Inputs {
  test: string;
}
interface Props {
  mapToken: string;
  token: string | undefined;
}

export default function MapSearch({ mapToken }: Props) {
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
      <MapConfirmLocationModal result={result} />
      <form onSubmit={handleSubmit(searchFunctionSubmit)}>
        <Controller
          control={control}
          name="test"
          render={({
            field: { onChange, onBlur },
            // fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
            />
          )}
        />
      </form>
    </div>
  );
}
