import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';

interface IFormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values: IFormInput) => {
    console.log(values);

    const respons = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    });
    const result = await respons.json();

    console.log(result);
    console.log(errors);
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
            <FormControl isInvalid={!!errors.email}>
              <div>
                <FormLabel margin={0} htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="email"
                  type="emal"
                  placeholder="example@email.com"
                  {...register('email', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </div>
            </FormControl>
            <div>
              <FormControl isInvalid={!!errors.username}>
                <div>
                  <FormLabel margin={0} className="" htmlFor="username">
                    Username
                  </FormLabel>
                  <Input
                    borderColor="#3b444b"
                    opacity={0.9}
                    borderWidth={2}
                    id="username"
                    type="username"
                    placeholder="Enter username"
                    {...register('username', {
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
            <FormControl isInvalid={!!errors.password}>
              <div>
                <FormLabel margin={0} htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register('password', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </div>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <div>
                <FormLabel margin={0} htmlFor="confirmPassword">
                  Type password again
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="confirm-password"
                  type="password"
                  placeholder="confirm password"
                  {...register('confirmPassword', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </div>
            </FormControl>
          </Stack>

          <div>
            <p className="text-right my-2 cursor-pointer italic">
              Already have an account?
            </p>
            <Button
              width={80}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Register
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
