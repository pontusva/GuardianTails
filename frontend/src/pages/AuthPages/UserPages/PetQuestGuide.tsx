import {
  Card,
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
  Input,
} from '@chakra-ui/react';
import DefaultModal from '../../../components/Modals/DefaultModal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
interface IFormInput {
  message: string;
}

export default function PetQuestGuide() {
  const [chat, setChat] = useState<IFormInput[]>([]);
  const [thread, setThread] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const isThreadEmpty = async () => {
    const response = await fetch(
      'http://localhost:8080/api/oai/is-user-thread',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
        body: JSON.stringify({
          user_id: Cookies.get('user_id'),
        }),
      }
    );
    const result = await response.json();
    setThread(result.thread);
  };

  const createThread = async () => {
    const response = await fetch('http://localhost:8080/api/oai/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
      body: JSON.stringify({
        user_id: Cookies.get('user_id'),
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  const onSubmit = (data: IFormInput) => {
    setChat(prev => [{ message: data.message }, ...prev]);
    reset();
  };

  useEffect(() => {
    isThreadEmpty();
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
            <div className="relative h-80 overflow-scroll">
              <Text>
                {[...chat].reverse().map(message => {
                  return (
                    <div>
                      <p className="text-sm">You: {message.message}</p>
                    </div>
                  );
                })}
              </Text>
            </div>
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
              <Button
                isLoading={isSubmitting}
                type="submit"
                variant="solid"
                colorScheme="blue">
                Send
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Leave chat
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </Card>
      {/* {!thread && ( */}
      <DefaultModal
        title="PetQuest Chat"
        func={createThread}
        defaultOpen={thread}
        buttonTextLeave="Cancel"
        buttonTextContinue="Yes, continue..."
        body="Looks like this is your first time accessing the chat. Would you like to start? "
      />
      {/* )} */}
    </div>
  );
}
