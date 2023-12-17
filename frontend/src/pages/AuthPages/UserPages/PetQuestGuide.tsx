import {
  Card,
  CardHeader,
  FormLabel,
  FormControl,
  FormErrorMessage,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Heading,
  Button,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
interface IFormInput {
  message: string;
}

export default function PetQuestGuide() {
  const [chat, setChat] = useState<IFormInput[]>([]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const isThreadEmpty = async () => {
    const response = await fetch('http://localhost:3000/user-ai-thread', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    const result = await response.json();
    console.log(result);
  };

  const onSubmit = (data: IFormInput) => {
    setChat(prev => [{ message: data.message }, ...prev]);
    reset();
  };

  useEffect(() => {
    // isThreadEmpty();
  }, []);

  useEffect(() => {
    // console.log(chat);
    console.log(chat);
  }, [chat]);

  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">PetQuest Guide</Heading>
            <Text>
              <div className="relative h-80 overflow-scroll">
                {[...chat].reverse().map((message, index) => {
                  return (
                    <div>
                      <p className="text-sm">You: {message.message}</p>
                    </div>
                  );
                })}
              </div>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.message}>
            <Input
              placeholder="Fråga något.."
              size="sm"
              borderColor="#3b444b"
              opacity={0.9}
              borderWidth={2}
              id="message"
              {...register('message')}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button type="submit" variant="solid" colorScheme="blue">
                Send
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Leave chat
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
