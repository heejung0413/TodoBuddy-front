import { ChakraProvider } from '@chakra-ui/react';
import IndexPage from './pages';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './styles/theme';
import HomePage from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
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
