import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { CreateAccount } from "./pages/createAccount";
import { Login } from "./pages/login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/error.tsx';
import { Home } from './pages/home.tsx';
import { Auctions } from './pages/auctions.tsx';
import { MyAuctions } from './pages/myAuctions.tsx';
import { CreateAuction } from './pages/createAuction.tsx';
import { Category } from './pages/category.tsx';
import { Inscriptions } from './pages/inscriptions.tsx';
import { Details } from './pages/details.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage title='404' message='Página não encontrada.'/>,
    children: [
      { path: "/", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
      { 
        path: "home",
        element: <Home />,
        children: [
          { path: "auctions", element: <Auctions /> },
          { path: "createAuction", element: <CreateAuction />},
          { path: "myAuctions", element: <MyAuctions /> },
          { path: "inscriptions", element: <Inscriptions /> },
          { path: "category/automoveis", element: <Category /> },
          { path: "details/:id", element: <Details /> },
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
