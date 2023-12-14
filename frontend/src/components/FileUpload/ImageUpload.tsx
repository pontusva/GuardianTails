import { useEffect, useState, useRef } from 'react';

import { FormEvent } from 'react';
import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  // nextAction: JSX.Element;
  isOpenImage: boolean;
  onOpenImage: () => void;
  onCloseImage: () => void;
  NextActionButtonOpenMapCloseFileUpload: JSX.Element;
}

export default function imageUpload({
  isOpenImage,
  onCloseImage,
  NextActionButtonOpenMapCloseFileUpload,
}: Props) {
  const [file, setFile] = useState<File | ''>('');
  const [imageName, setImageName] = useState('');
  const [srcImg, setSrcImg] = useState('');
  const [closeAndNextAction, setCloseAndNextAction] = useState(false);
  const { onClose } = useDisclosure();

  const token = Cookies.get('token');
  const inputRef = useRef<HTMLButtonElement | null>(null);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    const petId = 17;
    formData.append('pet_id', String(petId));
    try {
      const result = await fetch('http://localhost:8080/api/images', {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'multipart/form-data',
        },
        method: 'POST',
        body: formData,
      });
      if (!result.ok) {
        throw new Error('Error uploading image');
      }
      const data = await result.json();
      setImageName(data.imageName);
    } catch (error) {
      console.error({ error });
    } finally {
      setCloseAndNextAction(true);
    }
  };

  const getImage = async () => {
    try {
      const result = await fetch(`http://localhost:8080/images/${imageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await result.blob();
      const imageUrl = URL.createObjectURL(blob);
      setSrcImg(imageUrl);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    URL.revokeObjectURL(srcImg);
    imageName && getImage();
  }, [imageName]);

  useEffect(() => {}, [closeAndNextAction]);

  return (
    <>
      <>
        {' '}
        <Drawer placement="left" onClose={onCloseImage} isOpen={isOpenImage}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Ladda upp bilder
            </DrawerHeader>
            <DrawerBody>
              <>
                <h1>Ladda upp en bild på djuret ni söker efter.</h1>
                <form onSubmit={submit}>
                  <div className="flex flex-col">
                    <input
                      className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700 border-0"
                      onChange={e =>
                        e.target.files && setFile(e.target.files[0])
                      }
                      placeholder="Here is a sample placeholder"
                      type="file"
                    />
                    <Button type="submit">Ladda upp bild</Button>
                  </div>
                </form>

                {/* <ButtonProp /> */}
                <div className="hidden">
                  <Button ref={inputRef} onClick={onClose}>
                    Stäng
                  </Button>
                </div>
                {NextActionButtonOpenMapCloseFileUpload}
                {imageName && <img src={srcImg} />}
              </>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
}
