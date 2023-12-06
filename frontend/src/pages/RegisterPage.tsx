import { useAuth0 } from '@auth0/auth0-react';

const RegisterPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  console.log({ isAuthenticated, isLoading });
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>;
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};

export default RegisterPage;
