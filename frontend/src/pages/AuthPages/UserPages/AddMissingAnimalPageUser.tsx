import FindLostPetForm from '../../../components/forms/FindLostPetForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, useDisclosure } from '@chakra-ui/react';
import MapMissingAnimal from '../../../components/MapComponents/MapMissingAnimal';
import ImageUpload from '../../../components/FileUpload/ImageUpload';
import { preciseMapLatLng } from '../../../../zustand/MapHooks';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
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
  const [file, setFile] = useState<File | ''>('');
  const getPreciseMapLatLng = preciseMapLatLng(
    state => state.preciseMapLocation
  );
  console.log(getPreciseMapLatLng);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data);
    let formData = new FormData();
    formData.append('image', file);
    formData.append('name', data.name);
    formData.append('species', data.species);
    formData.append('breed', data.breed);
    formData.append('color', data.color);
    formData.append('age', data.age.toString());
    formData.append(
      'last_seen_location',
      JSON.stringify([{ ...getPreciseMapLatLng }])
    );
    formData.append('description', data.description);
    formData.append('owner_id', '1');
    formData.append('status', 'lost');

    const response = await fetch('http://localhost:8080/api/lost-pet', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: formData,
    });
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
        setFile={setFile}
        file={file}
        isOpenImage={isOpenImage}
        onOpenImage={onOpenImage}
        onCloseImage={onCloseImage}
      />
    </>
  );
}

export default AddMissingAnimalPageUser;
