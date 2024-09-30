"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineAppstore,
  AiFillHome,
} from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { GrMailOption } from "react-icons/gr";
import { config } from "@/config";
import { Address } from "fuels";
import logo from "@/media/images/logo.png";
import { usePathname } from "next/navigation";

const bottomMenus = [
  { id: 1, iconJsx: <AiFillHome />, link: "/" },
  { id: 2, iconJsx: <AiOutlineAppstore />, link: "/ExploreForHome" },
  { id: 3, iconJsx: <AiOutlineBell />, link: "/notifications" },
  { id: 4, iconJsx: <GrMailOption />, link: "/messages" },
];

export default function Header() {
  const [searchOpen, setSeachOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selectedButton, setSelectedButton] = useState("home");
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // useEffect(() => {
  //   connectWallet();
  // }, []);

  const connectWallet = async () => {
    try {
      let w: any;
      if (typeof window !== "undefined") {
        w = window;
        const isConnected = await w.fuel.connect();
        console.log("Connection response", isConnected);
        if (isConnected) {
          const accounts = await w.fuel.accounts();
          console.log(
            Address.fromAddressOrString(accounts[0]).toB256().slice(2)
          );
          const response = await fetch(`${config.baseUrl}/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              owner: Address.fromAddressOrString(accounts[0]).toB256().slice(2),
            }),
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data);
            sessionStorage.setItem("user", JSON.stringify(data));
          } else {
            await w.fuel.disconnect();
            alert("No Handle Found");
          }
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const isButtonSelected = (buttonName: string) => {
    return selectedButton === buttonName
      ? "bg-gray-200 text-black"
      : "text-gray-700";
  };

  const toggleSearch = () => {
    setSeachOpen((prev) => !prev);
  };

  return (
    <header className="divider sticky top-0 z-10 w-full bg-white">
      <div className="container mx-auto max-w-screen-xl px-5">
        <div className="relative flex h-14 items-center justify-between sm:h-16">
          <div className="flex items-center justify-start">
            <button className="text-3xl md:hidden inline-flex items-center justify-center rounded-md text-gray-500 focus:outline-none">
              {!searchOpen ? (
                <AiOutlineSearch onClick={toggleSearch} />
              ) : (
                <MdClose onClick={toggleSearch} />
              )}
            </button>
            <Link href={"/"} className="hidden md:block">
              <Image width={32} height={32} src={logo} alt="logo" />
            </Link>
            <div className="hidden sm:ml-6 md:block">
              <div className="flex items-center space-x-4">
                <div className="search space-x-10 invisible md:visible">
                  <form>
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className=" focus:ring-purple-700 focus:outline-purple-400 block w-full rounded-xl p-2 pl-10 text-sm text-gray-900 border   bg-transparent"
                        placeholder="Search .."
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="nav invisible md:visible">
                  <ul className="flex items-center space-x-2">
                    <Link href="/">
                      <li
                        className={`w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm font-bold tracking-wide md:px-3 ${isButtonSelected(
                          "home"
                        )}`}
                      >
                        Home
                      </li>
                    </Link>
                    {/* <Link href={"/ExploreForHome"}>
              <li
                onClick={() => handleButtonClick("explore")}
                className={`w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm font-bold tracking-wide md:px-3 ${isButtonSelected(
                  "explore"
                )} hover:bg-gray-200 hover:text-black`}
              >
                Explore
              </li>
            </Link> */}

                    {/* <li
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className={`w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm font-bold tracking-wide md:px-3 ${isButtonSelected(
                "more"
              )} hover:bg-gray-200 hover:text-black`}
            >
              More
            </li> */}

                    {dropdown && (
                      <div
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setDropdown(false);
                          }, 1000);
                        }}
                        className="dropdown absolute left-[30rem] top-14 shadow-xl "
                      >
                        <div
                          id="dropdown"
                          className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                        >
                          <ul className="py-2 font-semibold text-sm text-gray-700 ">
                            <Link
                              className="block px-4 py-2 hover:bg-gray-100"
                              href={"/contact"}
                            >
                              <li>Contacts</li>
                            </Link>
                            <Link
                              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              href={
                                "https://github.com/lensterxyz/Weave/issues/new?assignees=bigint&labels=needs+review&template=bug_report.yml"
                              }
                            >
                              {" "}
                              <li>Report a Bug</li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link href={"/"} className="md:hidden">
            <Image width={32} height={32} src={logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="button">
              {user ? (
                <Link
                  className="bg-purple-500 hover:bg-purple-600 border-purple-600 focus:ring-purple-400 border text-white px-3 py-1 inline-flex items-center space-x-1.5 rounded-lg font-bold shadow-sm outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 disabled:opacity-50"
                  href={`/u/${user.handle}`}
                >
                  <Image
                    className=""
                    width={16}
                    height={16}
                    src={logo}
                    alt="login"
                  />
                  <div>{user.handle}</div>
                </Link>
              ) : (
                <button
                  className="bg-purple-500 hover:bg-purple-600 border-purple-600 focus:ring-purple-400 border text-white px-3 py-1 inline-flex items-center space-x-1.5 rounded-lg font-bold shadow-sm outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 disabled:opacity-50"
                  onClick={connectWallet}
                >
                  <Image
                    className=""
                    width={16}
                    height={16}
                    src={logo}
                    alt="login"
                  />
                  <div>Login</div>
                </button>
              )}
            </div>
          </div>

          <div className="sm:visible md:invisible fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200  ">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium items-center justify-center">
              {bottomMenus.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.link}
                  className={`mx-auto py-3 text-2xl ${
                    pathname.startsWith(menu.link) && "text-brand-color"
                  } `}
                >
                  {menu.iconJsx}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {searchOpen && (
        <div className="md:hidden search">
          <div className="m-3">
            <div
              aria-hidden="true"
              className="w-full"
              data-testid="global-search"
            >
              <form>
                <label className="w-full" htmlFor=":r1m:">
                  <div className="flex">
                    <div className="focus-within:ring-1 rounded-xl focus-within:border-brand-500 focus-within:ring-brand-400 flex w-full items-center border border-gray-300 bg-white">
                      <input
                        id=":r1m:"
                        className="rounded-xl peer w-full border-none bg-transparent outline-none focus:ring-0 px-3 py-2 text-sm"
                        type="text"
                        placeholder="Search…"
                        value=""
                      />
                      <span
                        tabIndex={-1}
                        className="order-first pl-3 text-2xl text-gray-500"
                      >
                        <AiOutlineSearch />
                      </span>
                    </div>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
