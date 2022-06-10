import React from "react";
import {
  AcademicCapIcon,
  DocumentTextIcon,
  MenuAlt1Icon,
  SearchIcon,
  ViewBoardsIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <MenuAlt1Icon className="h-5 w-5 text-gray-500 border-0 cursor-pointer" />
      <DocumentTextIcon className="h-5 w-5 ml-2 text-blue-700" />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">
        Docs
      </h1>

      <div
        className="mx-5 md:mx-20 flex items-center flex-grow px-5 py-2 bg-gray-100
       text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
      >
        <SearchIcon className="h-5 w-5 text-2xl" />
        <input
          type="text"
          className="flex-grow px-5 text-base  bg-transparent outline-none"
          placeholder="Search..."
        />
      </div>

      <ViewGridAddIcon className="h-5 w-5 ml-5 mr-5 text-gray-500 border-0 cursor-pointer" />
      <img
        src={session?.user?.image}
        alt=""
        loading="lazy"
        onClick={signOut}
        className="cursor-pointer h-12 w-12 rounded-full ml-2 object-cover"
      />
    </header>
  );
}

export default Header;
