import { ChakraProvider } from '@chakra-ui/react';
import IndexPage from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './styles/theme';
import HomePage from './pages/home';
import Layout from './components/Layout';

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
