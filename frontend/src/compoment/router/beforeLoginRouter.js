import { useRoutes } from "react-router-dom";

import SingUp from "../js/singUp";
import Login from "../js/login";
import Home from "../js/home";

const BeforeLoginRouter = () => {
  const Route = useRoutes([
    { path: "/login", exact: true, element: <Login /> },
    { path: "/singup", element: <SingUp /> },
    { path: "/", exact: true, element: <Home /> },
  ]);
 

  return Route;
};

export default BeforeLoginRouter;
