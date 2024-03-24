import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { CreateAccount } from "./pages/createAccount";
import { Login } from "./pages/login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/error.tsx';
import { RootAuctions } from './pages/rootAuctions.tsx';
import { HighlightsAuctions } from './pages/highlightsAuctions.tsx';
import { MyAuctions } from './pages/myAuctions.tsx';
import { CreateAuction } from './pages/createAuction.tsx';
import { CategoryAuctions } from './pages/categoryAuctions.tsx';
import { RegisteredAuctions } from './pages/registeredAuctions.tsx';
import { AuctionDetails } from './pages/auctionDetails.tsx';
import { BatchDetails } from './pages/batchDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage title='404' message='Página não encontrada.'/>,
    children: [
      { path: "/", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
      { 
        path: "auction",
        element: <RootAuctions />,
        children: [
          { path: "highlights", element: <HighlightsAuctions /> },
          { path: "create", element: <CreateAuction />},
          { path: "mine", element: <MyAuctions /> },
          { path: "registered", element: <RegisteredAuctions /> },
          { path: "categories/:category", element: <CategoryAuctions /> },
          { path: "details/:id", element: <AuctionDetails /> },
          { path: "batch/details/:id", element: <BatchDetails /> }
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
