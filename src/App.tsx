import { ChakraProvider } from '@chakra-ui/react';
import IndexPage from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './styles/theme';
import HomePage from './pages/home';
import Layout from './components/Layout';
import LoginFindPage from './pages/home/login/find';
import SignUpPage from './pages/home/login/signUp';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: 'home',
        element: <Layout />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        path: 'login',
        children: [
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
  {
    path: '/home',

    element: <HomePage />,
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
