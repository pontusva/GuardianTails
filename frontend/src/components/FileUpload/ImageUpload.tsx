import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import { Input, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
export default function imageUpload() {
  const [file, setFile] = useState<File | ''>('');

  const [imageName, setImageName] = useState('');
  const [srcImg, setSrcImg] = useState('');
  const token = Cookies.get('token');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);

    const result = await fetch('http://localhost:8080/api/images', {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'multipart/form-data',
      },
      method: 'POST',
      body: formData,
    });
    const data = await result.json();
    setImageName(data.imageName);
  };

  // console.log(imageName);

  const getImage = async () => {
    console.log(imageName);
    const result = await fetch(`http://localhost:8080/images/${imageName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await result.blob();
    console.log(blob);
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    setSrcImg(imageUrl);
  };
  useEffect(() => {
    getImage();
  }, [imageName]);
  return (
    <>
      <h1>Upload a picture of the missing animal</h1>
      <form onSubmit={submit}>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>

      {imageName && <img src={srcImg} />}
    </>
  );
}
