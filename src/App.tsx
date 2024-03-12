import { CreateAccount } from "./pages/createAccount";
import { Login } from "./pages/login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
    errorElement: <div>Not Found</div>,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
