"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";

import { UserRole } from "@/types";
// import { getUserInfo } from "@/services/actions/auth.services";
import SidebarLink from "../Sidebar/SidebarLink";
import { drawerItems } from "../Sidebar/SidebarItems";
import Image from "next/image";
import assets from "@/assets";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
// import { useGetMyselfQuery } from "@/redux/api/userApi";
import Loading from "@/components/Common/Loading";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole | string>("");
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    role?: string;
    email?: string;
    plan?: string;
  } | null>(null);
  // const { data, isLoading } = useGetMyselfQuery({});
  // const userInfo = {
  //   name: "aa",
  //   role: "|",
  //   email: "|",
  // };

  useEffect(() => {
    // const user = getUserInfo();
    const user = {
      name: "aa",
      role: "admin",
      email: "admin@gmail.com",
    };
    if (user) {
      setUserRole(user.role);
      setUserInfo(user);
    }
  }, []);

  const sidebarItems = drawerItems(userRole as UserRole);
  const router = useRouter();
  // if (isLoading) {
  //   return <Loading />;
  // }

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#292E38]">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-[220px] lg:w-[280px] bg-[#18181B]">
        <div className="flex flex-col h-full">
          {/* Logo & Profile */}
          <div className="flex flex-col items-center gap-4 px-4 py-8 bg-transparent">
            <Image
              src={assets.trainer.trainer1}
              alt="Profile"
              width={50}
              height={50}
              className="h-28 w-28 rounded-full border-4 border-red-500 hover:bg-gradient-to-r from-red-500 to-amber-500"
            />
            <div className="text-center">
              {userInfo ? (
                <>
                  <p className="text-white font-semibold text-sm lg:text-base">
                    {userInfo.name || "Guest"}
                  </p>
                  <p className="text-white font-semibold text-sm lg:text-base">
                    {userInfo.email || "No email"}
                  </p>
                  {userInfo.role === "admin" ? (
                    <p className="text-white font-semibold text-sm lg:text-base">
                      <button className="mt-1 text-xs lg:text-sm px-2 py-1 text-white font-semibold bg-red-700 hover:bg-red-800 rounded-md">
                        {userInfo.role || "No role"}
                      </button>
                    </p>
                  ) : (
                    <button
                      disabled
                      className="mt-1 text-xs lg:text-sm px-2 py-1 text-white font-semibold bg-gradient-to-r from-amber-500 to-red-600 rounded-md"
                    >
                      Plan
                    </button>
                  )}
                </>
              ) : (
                <p className="text-white font-semibold text-sm lg:text-base">
                  Loading...
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto px-4">
            <nav className="grid gap-2 text-sm lg:text-base font-medium text-gray-300">
              {sidebarItems.map((item, index) => (
                <SidebarLink key={index} item={item} />
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <Button
              onClick={handleLogOut}
              variant="ghost"
              className="w-full text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header and Sidebar */}
      <div className="flex-1 flex flex-col md:ml-[220px] lg:ml-[280px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden "
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col bg-[#202124]">
            <nav className="grid gap-2 items-start px-4 text-sm font-medium text-gray-300">
              {sidebarItems.map((item, index) => (
                <SidebarLink key={index} item={item} />
              ))}
            </nav>
            <div className="mt-auto p-4">
              <Button
                onClick={handleLogOut}
                variant="ghost"
                className="text-white w-full"
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Section */}
        <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 bg-[#292E38]">
          {children}
        </main>
      </div>
    </div>
  );
}
