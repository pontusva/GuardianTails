import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  NextActionButtonOpenFileUpload: JSX.Element;
  handleSubmit: any;
  register: any;
  onSubmit: any;
  errors: any;
  isSubmitting: any;
  OpenMapButton: JSX.Element;
}

export default function FindLostPetForm({
  NextActionButtonOpenFileUpload,
  handleSubmit,
  onSubmit,
  register,
  errors,
  isSubmitting,
  OpenMapButton,
}: Props) {
  return (
    <div
      style={{ height: '100dvh', width: '100dvw' }}
      className="flex flex-col mt-24 justify-center items-center"
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
                  Vad är det för art?
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
              <FormControl isInvalid={!!errors.lastSeen}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Ladda upp bilder
                </FormLabel>
                {NextActionButtonOpenFileUpload}
                <FormErrorMessage>
                  {errors.lastSeen && errors.lastSeen.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastSeen}>
                <FormLabel margin={0} className="" htmlFor="password">
                  Vart sågs djuret senast?
                </FormLabel>
                {OpenMapButton}
                <FormErrorMessage>
                  {errors.lastSeen && errors.lastSeen.message}
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
            <Button
              width={80}
              className="mt-5"
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Skicka
            </Button>
          </div>
        </form>

        <div className="mt-5 ">
          <img src="/basicdragonfly.svg" />
        </div>
      </div>
    </div>
  );
}
