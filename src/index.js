import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './Constant/theme';
import Home from './Pages/Kanban/Home';
import { Provider } from 'react-redux'
import Store from './Redux/Store';
import store from './Redux/Store';
import { fetchData } from './Redux/Slice/couterSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

