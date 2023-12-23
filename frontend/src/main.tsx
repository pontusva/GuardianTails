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
import MyLostPetsPage from './pages/AuthPages/UserPages/MyLostPetsPage.tsx';
import PetQuestGuide from './pages/AuthPages/UserPages/PetQuestGuide.tsx';
import SpecificPetPage from './pages/AuthPages/UserPages/SpecificPetPage.tsx';
import CommunitySearchesPage from './pages/AuthPages/UserPages/CommunitySearchesPage.tsx';
import PetAlerts from './pages/AuthPages/UserPages/PetAlerts.tsx';
const key = '01431av-fbfrhq-o0iqjweu';
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
        path: 'find-a-lost-pet',
        element: <AddMissingAnimalPageUser />,
      },
      {
        path: 'my-lost-pets',
        element: <MyLostPetsPage />,
      },
      {
        path: 'petbuddy',
        element: <PetQuestGuide />,
      },
      {
        path: 'pet/:pet_id',
        element: <SpecificPetPage />,
      },
      {
        path: 'community-searches',
        element: <CommunitySearchesPage />,
      },
      {
        path: 'pet-alerts',
        element: <PetAlerts />,
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
