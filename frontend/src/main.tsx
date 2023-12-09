import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage.tsx';
import App from './App.tsx';
import HomePageUser from './pages/AuthPages/UserPages/HomePageUser.tsx';
import AddMissingAnimalPageUser from './pages/AuthPages/UserPages/AddMissingAnimalPageUser.tsx';
import ImageUpload from './components/FileUpload/ImageUpload.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePageUser />,
      },
      { path: 'dashboard', element: '<Dashboard /> ' },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'report-missing-animal',
        element: <AddMissingAnimalPageUser />,
      },
      {
        path: 'upload',
        element: <ImageUpload />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
