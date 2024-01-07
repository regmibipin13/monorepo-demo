"use client";

import { auth } from "@backend";
import { useAuth } from "@context";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@ui-kit/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function Navbar() {
  return (
    <div>
      <div className="container pt-5 pb-5 flex justify-between">
        <Logo />
        <NavItems />
        <Profile />
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <span className="lg:w-1/3 md:w-1/3 sm:w-2/2 text-primary text-[1.5rem] md:text-[2rem] font-bold">
      Inline Job
    </span>
  );
};

const NavItems = () => {
  return (
    <div className="w-1/2 flex items-center text-base w-100 text-black font-medium">
      <NavigationMenu className="w-full flex">
        <NavigationMenuList className="w-full flex items-center justify-between">
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>About</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>Employers</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>Sponsors</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>FAQ</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-10">
            <Link href="/dashboard">
              <NavigationMenuLink>Contact</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();

  const onLogout = async () => {
    try {
      await auth.signOut().then(() => {
        router.push("/login");
        toast.success("Logged out successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:w-1/2 md:w-1/2 sm:w-2/2 flex items-center gap-2 md:gap-5 justify-end">
      <div className="flex flex-col">
        <span className="font-bold text-sm md:text-lg">
          {user?.displayName?.toUpperCase() ?? "User"}
        </span>
        <span className="text-xs md:text-md text-gray-500">{user?.email}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer w-[2rem] md:w-[3rem] h-[2rem] md:h-[3rem] font-bold text-[0.9rem] md:text-[1.2rem]">
            <AvatarImage
              src={user?.photoURL ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {user?.displayName?.slice(0, 1)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mx-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <span onClick={onLogout}>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </span>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
