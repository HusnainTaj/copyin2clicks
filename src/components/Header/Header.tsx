"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 lg:px-14 border-b border-gray-300">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/icon.png" alt="Not-Found" width={50} height={50} />
          <div className="ml-2 text-lg sm:text-xl lg:text-2xl font-bold">ClickIn2Clicks</div>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-4">
            <Link
              className="text-lg font-light hover:underline underline-offset-4"
              href="/download"
            >
              Download
            </Link>
            <Link
              className="text-lg font-light hover:underline underline-offset-4"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-lg font-light hover:underline underline-offset-4"
              href="/premium"
            >
              Premium
            </Link>
            {status === "authenticated" ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage
                        src={
                          session?.user?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>
                        {session?.user?.name || "User"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Link href="/premium">Subscription</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                className="text-lg font-light hover:underline underline-offset-4"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 z-10">
            <Link
              className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
              href="/download"
              onClick={toggleMenu}
            >
              Download
            </Link>
            <Link
              className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
              href="/about"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
              href="/premium"
              onClick={toggleMenu}
            >
              Premium
            </Link>
            {status === "authenticated" ? (
              <>
                <Link
                  className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
                  href="/profile"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
                  href="/premium"
                  onClick={toggleMenu}
                >
                  Subscription
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-lg font-light hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="block px-4 py-2 text-lg font-light hover:bg-gray-200"
                href="/login"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
