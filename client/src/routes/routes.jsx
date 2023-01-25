import { createBrowserRouter, Link } from "react-router-dom";

// importing components
import {
  UserName,
  Password,
  UserProfile,
  Register,
  Reset,
  Recovery,
  PageNotFound,
} from "../components/index.js";
// import UserName from "../components/UserName.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <UserName></UserName>
        
      </>
    ),
  },

  {
    path: "/password",
    element: (
      <>
        <Password />
      </>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <>
        <UserProfile />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/recovery",
    element: (
      <>
        <Recovery />
      </>
    ),
  },
  
  {
    path: "/reset",
    element: (
      <>
        <Reset />
      </>
    ),
  },

  {
    path: "*",
    element: (
      <>
        <PageNotFound />
      </>
    ),
  },
  
]);
