import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Cookies from 'js-cookie';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import MapMissingAnimal from '../MapComponents/MapMissingAnimal';
import ImageUpload from '../FileUpload/ImageUpload';

type status = 'lost' | 'found';

interface IFormInput {
  name: string; // required field
  species: string; // required field
  breed: string;
  color: string;
  age: number;
  lastSeen: string;
  description: string;
  owner_id: number;
  status: status; // required field
}
type ButtonPropProps = {
  onOpenMap: () => void;
  onCloseMap: () => void;
};

const ButtonProp = ({ onOpenMap, onCloseMap }: ButtonPropProps) => {
  return (
    <Button
      className="w-full"
      colorScheme="blue"
      onClick={() => {
        onCloseMap();
        onOpenMap();
      }}>
      From PetForm (next)
    </Button>
  );
};

export default function FindLostPetForm() {
  const navigate = useNavigate();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const {
    isOpen: isOpenMap,
    onOpen: onOpenMap,
    onClose: onCloseMap,
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const token = Cookies.get('token');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <div
      style={{ height: '100dvh', width: '100dvw' }}
      className="flex flex-col justify-center items-center"
      // className="bg-contain  bg-no-repeat bg-bottom object-contain bg-[url('/basicdragonfly.svg')]"
    >
      <div className="relative top-28 w-80">
        <h1 className=" text-center mb-1 font-mono text-3xl">GuradianTails</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel margin={0} htmlFor="email">
                  Djurets namn
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="pet-name"
                  type="text"
                  placeholder="Findus"
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.species}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Djurets art
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="species"
                  type="species"
                  placeholder="Katt"
                  {...register('species', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.species && errors.species.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.breed}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Vad är det för ras?
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="breed"
                  type="breed"
                  placeholder="Blandras"
                  {...register('breed')}
                />
                <FormErrorMessage>
                  {errors.breed && errors.breed.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.color}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Vad har djuret för färg?
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="color"
                  type="color"
                  placeholder="svart och vit..."
                  {...register('color')}
                />
                <FormErrorMessage>
                  {errors.color && errors.color.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastSeen}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Vart sågs djuret senast?
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="lastSeen"
                  type="text"
                  placeholder="Vänersborg, Gatgatan"
                  {...register('lastSeen')}
                />
                <FormErrorMessage>
                  {errors.lastSeen && errors.lastSeen.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.age}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Hur gammal är djuret?
                </FormLabel>
                <Input
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="age"
                  type="text"
                  placeholder="11"
                  {...register('age')}
                />
                <FormErrorMessage>
                  {errors.age && errors.age.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Beskriv närmare hur djuret ser ut och annan relevant info.
                </FormLabel>
                <Textarea
                  placeholder="Gråvit katt med svarta fläckar på ryggen..."
                  size="sm"
                  borderColor="#3b444b"
                  opacity={0.9}
                  borderWidth={2}
                  id="description"
                  {...register('description')}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </div>

          <div>
            {showSubmitButton && (
              <Button
                width={80}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit">
                Nästa
              </Button>
            )}
          </div>
        </form>
        <MapMissingAnimal
          onOpenMap={onOpenMap}
          isOpenMap={isOpenMap}
          onCloseMap={onCloseMap}
        />
        <ImageUpload
          nextAction={
            <ButtonProp onCloseMap={onCloseImage} onOpenMap={onOpenMap} />
          }
        />
        <div className="mt-5">
          <img src="/basicdragonfly.svg" />
        </div>
      </div>
    </div>
  );
}
