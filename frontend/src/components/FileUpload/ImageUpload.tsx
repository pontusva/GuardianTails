import { useRef, Dispatch, SetStateAction } from 'react';

import { Button } from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  isOpenImage: boolean;
  onOpenImage: () => void;
  onCloseImage: () => void;
  file: File | '';
  setFile: Dispatch<SetStateAction<File | ''>>;
  NextActionButtonOpenMapCloseFileUpload: JSX.Element;
}

export default function imageUpload({
  isOpenImage,
  onCloseImage,
  file,
  setFile,
  NextActionButtonOpenMapCloseFileUpload,
}: Props) {
  const { onClose } = useDisclosure();

  const inputRef = useRef<HTMLButtonElement | null>(null);

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

                <div className="flex flex-col">
                  <input
                    className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700 border-0"
                    onChange={e => e.target.files && setFile(e.target.files[0])}
                    placeholder="Here is a sample placeholder"
                    type="file"
                  />
                </div>

                <div className="hidden">
                  <Button ref={inputRef} onClick={onClose}>
                    Stäng
                  </Button>
                </div>
                {file && <img src={URL.createObjectURL(file)} />}
                {NextActionButtonOpenMapCloseFileUpload}
              </>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
}
