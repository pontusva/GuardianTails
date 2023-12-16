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
        path: 'my-searches',
        element: <MyLostPetsPage />,
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
