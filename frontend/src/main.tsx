import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterPage />,
    children: [
      {
        path: '/',
        element: '<Login />',
      },
      { path: 'dashboard', element: '<Dashboard /> ' },
      {
        path: 'register',
        element: '<Register />',
      },
      {
        path: 'login',
        element: ' <Login />',
      },
      {
        path: 'tasks',
        element: '<TaskManagement />',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-hbumyfwxrbg3lbit.uk.auth0.com"
      clientId="2xRYiSztHydC7KQUa6IXpJ1NBfhFkc1a"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/dashboard',
      }}>
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
