import {
  Card,
  FormControl,
  FormErrorMessage,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  ButtonGroup,
  Heading,
  Button,
  Textarea,
} from '@chakra-ui/react';
import DefaultModal from '../../../components/Modals/DefaultModal';
import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
interface IFormInput {
  message: string;
  chatResponse?: string | null;
  loading?: boolean;
}

export default function PetQuestGuide() {
  const [chat, setChat] = useState<IFormInput[]>([]);
  const [thread, setThread] = useState<boolean>(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef(null);
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
    console.log(result);
    setThread(result.thread);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(chatResponse)();
    }
  };

  const chatResponse = async (data: IFormInput) => {
    setChat(prev => [
      {
        message: data.message,
        chatResponse: null,
        loading: true,
      },
      ...prev,
    ]);
    reset();
    const response = await fetch('http://localhost:8080/api/oai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
      body: JSON.stringify({
        user_id: Cookies.get('user_id'),
        chatMsg: data.message,
      }),
    });
    const result = await response.json();
    console.log(result.data[0].content[0].text.value);
    setChat(prev => {
      const updatedPrev = [...prev];
      updatedPrev[0].chatResponse = result.data[0].content[0].text.value;
      updatedPrev[0].loading = false;
      return updatedPrev;
    });
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

  useEffect(() => {
    isThreadEmpty();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">PetQuest Guide</Heading>
            <div className="relative h-80 overflow-scroll">
              {[...chat].reverse().map((message, idx) => {
                return (
                  <div key={idx}>
                    <p ref={chatEndRef} className="text-sm">
                      <span className=" text-orange-400 font-bold text-lg">
                        You:
                      </span>{' '}
                      {message.message}
                    </p>
                    {message.chatResponse && (
                      <p className="text-justify my-4  font-sans">
                        <span className="text-cyan-500 font-bold text-lg">
                          PetQuest:
                        </span>
                        {message.chatResponse}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Stack>
        </CardBody>
        <Divider />
        <form ref={formRef} onSubmit={handleSubmit(chatResponse)}>
          <FormControl isInvalid={!!errors.message}>
            <Textarea
              placeholder="Fråga något.."
              size="sm"
              rows={2}
              cols={50}
              borderColor="#3b444b"
              opacity={0.9}
              borderWidth={2}
              id="message"
              {...register('message')}
              onKeyDown={handleKeyPress}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                isLoading={isSubmitting || chat[0]?.loading}
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

      <DefaultModal
        title="PetQuest Chat"
        func={createThread}
        defaultOpen={thread}
        buttonTextLeave="Cancel"
        buttonTextContinue="Yes, continue..."
        body="Looks like this is your first time accessing the chat. Would you like to start? "
      />
    </div>
  );
}
