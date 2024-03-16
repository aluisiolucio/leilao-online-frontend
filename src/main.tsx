import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { CreateAccount } from "./pages/createAccount";
import { Login } from "./pages/login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/error.tsx';
import { Home } from './pages/home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage title='404' message='Página não encontrada.'/>,
    children: [
      { path: "/", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
      { path: "home", element: <Home />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
