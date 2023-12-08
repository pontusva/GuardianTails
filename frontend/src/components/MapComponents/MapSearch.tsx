import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface Inputs {
  test: string;
}
interface Props {
  mapToken: string;
  token: string | undefined;
}

export default function MapSearch({ mapToken, token }: Props) {
  const [result, setResult] = useState<unknown[]>();
  const [userChosenLocation, setUserChosenLocation] = useState<unknown[]>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
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
  console.log(userChosenLocation);
  return (
    <div>
      <form onSubmit={handleSubmit(searchFunctionSubmit)}>
        <Controller
          control={control}
          name="test"
          render={({
            field: { onChange, onBlur, value, name, ref },
            // fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <input
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
            />
          )}
        />
      </form>
      {result &&
        result.map((item: any) => (
          <p onClick={() => setUserChosenLocation(item)}>{item.place_name}</p>
        ))}
    </div>
  );
}
