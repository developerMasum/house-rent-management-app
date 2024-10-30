import { USER_ROLE } from "@/constants/role";
import { ISidebarItem, UserRole } from "@/types";

import {
  UserCog,
  ClipboardPlus,
  BookOpenCheck,
  Home,
  FileKey,
  NotebookPen,
  Dumbbell,
  BadgeDollarSign,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import { GiTeacher, GiGymBag } from "react-icons/gi";

export const drawerItems = (role: UserRole): ISidebarItem[] => {
  // console.log(role);
  const roleMenus: ISidebarItem[] = [];
  const defaultMenus = [
    {
      title: "Change Password",
      path: `change-password`,
      icon: FileKey,
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: Home,
        },
        {
          title: "Houses",
          path: `${role}/houses`,
          icon: UsersRound,
        },
        {
          title: "Rooms",
          path: `${role}/Rooms`,
          icon: GiTeacher,
        },
        {
          title: "Tenants",
          path: `${role}/tenants`,
          icon: BadgeDollarSign,
        },
        {
          title: "Payments",
          path: `${role}/payments`,
          icon: BadgeDollarSign,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "My Report",
          path: `${role}/my-report`,
          icon: ClipboardPlus,
        },
        {
          title: "My Classes",
          path: `${role}/my-classes`,
          icon: BookOpenCheck,
        },
        {
          title: "My Diet Plan",
          path: `${role}/my-diet`,
          icon: NotebookPen,
        },
        {
          title: "My Workout",
          path: `${role}/my-workout`,
          icon: Dumbbell,
        },

        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: BadgeDollarSign,
        },
        {
          title: "My Profile",
          path: `${role}/my-profile`,
          icon: UserRoundPen,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
