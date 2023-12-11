import FindLostPetForm from '../../../components/forms/FindLostPetForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, useDisclosure } from '@chakra-ui/react';
import MapMissingAnimal from '../../../components/MapComponents/MapMissingAnimal';
import ImageUpload from '../../../components/FileUpload/ImageUpload';

type ButtonPropProps = {
  onCloseImage: () => void;
  onOpenMap: () => void;
};

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

interface OpenMapButtonProps {
  onOpenMap: () => void;
}

const ButtonProp = ({ onCloseImage, onOpenMap }: ButtonPropProps) => {
  return (
    <Button
      className="w-full"
      colorScheme="blue"
      onClick={() => {
        onOpenMap();
        onCloseImage();
      }}>
      Öppna karta
    </Button>
  );
};

const OpenMapButton = ({ onOpenMap }: OpenMapButtonProps) => {
  return (
    <Button className="w-full" colorScheme="blue" onClick={onOpenMap}>
      Öppna karta
    </Button>
  );
};

interface NextActionButtionProps {
  onOpenImage: () => void;
}

const NextActionButtion = ({ onOpenImage }: NextActionButtionProps) => {
  return (
    <Button className="w-full" colorScheme="blue" onClick={onOpenImage}>
      Filuppladdning
    </Button>
  );
};

function AddMissingAnimalPageUser() {
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();

  const {
    isOpen: isOpenMap,
    onOpen: onOpenMap,
    onClose: onCloseMap,
  } = useDisclosure();

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
    <>
      <FindLostPetForm
        NextActionButtonOpenFileUpload={
          <NextActionButtion onOpenImage={onOpenImage} />
        }
        OpenMapButton={<OpenMapButton onOpenMap={onOpenMap} />}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />

      <MapMissingAnimal isOpenMap={isOpenMap} onCloseMap={onCloseMap} />

      <ImageUpload
        NextActionButtonOpenMapCloseFileUpload={
          <ButtonProp onOpenMap={onOpenMap} onCloseImage={onCloseImage} />
        }
        isOpenImage={isOpenImage}
        onOpenImage={onOpenImage}
        onCloseImage={onCloseImage}
      />
    </>
  );
}

export default AddMissingAnimalPageUser;
