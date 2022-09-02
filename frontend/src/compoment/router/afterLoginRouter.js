import react from "react";
import { useRoutes } from "react-router-dom";
import Main from "../js/mainPage";
import Edit from "../js/editPage";
import Factor from "../js/factorPage";
import Income from "../js/incomePage";
import User from "../js/userPage";
import Client from "../js/clientPage";
import SingUp from "../js/singUp";
const AfterLoginRouter = () => {
  const Route = useRoutes([
    { path: "/", exact: true, element: <Main /> },
    { path: "/edit", element: <Edit /> },
    { path: "/factor", element: <Factor /> },
    { path: "/income", element: <Income /> },
    { path: "/user", element: <User /> },
    { path: "/client", element: <Client /> },
    { path: "/singup", element: <SingUp /> },

  ]);
 

  return Route;
};

export default AfterLoginRouter;
