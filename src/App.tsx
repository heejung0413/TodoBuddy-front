import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './pages/home/login';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import theme from './styles/theme';
import HomePage from './pages';
import Layout from './components/Layout';
import LoginFindPage from './pages/home/login/find';
import SignUpPage from './pages/home/login/signUp';
import { FC, ReactElement, useEffect, useState } from 'react';
import { UserServices } from './api/Services/User';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const LoginStatus = async () => {
    try {
      await UserServices.get();
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    LoginStatus();
  }, []);

  if (isChecking) {
    return <div>로딩 중...</div>; // 로그인 상태 확인 중
  }

  return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        children: [
          { index: true, element: <LoginPage /> },
          {
            path: 'find',
            element: <LoginFindPage />,
          },
          {
            path: 'signUp',
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
