import FindLostPetForm from '../../../components/forms/FindLostPetForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, useDisclosure } from '@chakra-ui/react';
import MapMissingAnimal from '../../../components/MapComponents/MapMissingAnimal';
import ImageUpload from '../../../components/FileUpload/ImageUpload';
import { preciseMapLatLng } from '../../../../zustand/MapHooks';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
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

  const getPreciseMapLatLng = preciseMapLatLng(
    state => state.preciseMapLocation
  );
  console.log(getPreciseMapLatLng);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data);
    const response = await fetch(
      'http://localhost:8080/api/lost-pet-description',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          name: data.name,
          species: data.species,
          breed: data.breed,
          color: data.color,
          age: data.age,
          last_seen_location: [{ ...getPreciseMapLatLng }],
          description: data.description,
          owner_id: 1,
          status: 'lost',
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  };
  useEffect(() => {}, [getPreciseMapLatLng]);
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
