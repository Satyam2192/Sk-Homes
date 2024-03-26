import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "./pages/dashboard";

import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SignOut from "./pages/auth/sign-out";
import DeleteAccount from "./pages/auth/DeleteAccoutn";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Properties",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      
    ],
  },
  {
    title: "Profile Settings",
    layout: "dashboard",
    pages: [
      {
        icon: <FaSignOutAlt {...icon} />,
        name: "sign out",
        path: "/signout",
        element: <SignOut />,
      },
      {
        icon: <MdDelete {...icon} />,
        name: "Delete Acount",
        path: "/sign-up",
        element: <DeleteAccount />,
      },
    ],
  },
];

export default routes;
