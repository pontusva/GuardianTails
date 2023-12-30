import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values: IFormInput) => {
    console.log(values);

    const respons = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });
    const result = await respons.json();
    const token = result.accessToken;
    Cookies.set('token', token, { expires: 7, secure: false });
    Cookies.set('user_id', result.id, { expires: 7, secure: false });
    Cookies.set('username', result.username, { expires: 7, secure: false });

    navigate('/');
  };

  return (
    <div
      style={{ height: '100dvh', width: '100dvw' }}
      className="flex flex-col justify-center items-center"
      // className="bg-contain  bg-no-repeat bg-bottom object-contain bg-[url('/basicdragonfly.svg')]"
    >
      <div className="mt-20 w-80">
        <h1 className=" text-center mb-1 font-mono text-3xl">GuradianTails</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.username}>
              <div>
                <FormLabel margin={0} htmlFor="email">
                  Enter your username
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="username"
                  type="text"
                  placeholder="username"
                  {...register('username', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </div>
            </FormControl>
            <div>
              <FormControl isInvalid={!!errors.password}>
                <div>
                  <FormLabel margin={0} className="" htmlFor="password">
                    password
                  </FormLabel>
                  <Input
                    borderColor="#3b444b"
                    opacity={0.9}
                    borderWidth={2}
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 2,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                </div>
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
            </div>
          </Stack>

          <div>
            <p className="text-right my-2 cursor-pointer italic">
              Dont have an account?
            </p>
            <Button
              width={80}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-5">
          <img src="/basicdragonfly.svg" />
        </div>
      </div>
    </div>
  );
}
