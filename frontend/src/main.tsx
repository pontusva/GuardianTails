import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
