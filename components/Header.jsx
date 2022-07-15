import React, { useState, useContext } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
// import mentee from "../assets/mentee.png";
import { TokenContext } from "../utils/context";
import Button from "../components/button";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setToken("0");
    localStorage.removeItem("token");
    setShowModal(!showModal);
    router.push("/");
    alert("You have been logged out");
  };

  const handleCreate = () => {
    router.push("/createEvent");
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="sticky top-0 w-full px-2 py-2.5 bg-white flex justify-between drop-shadow-2xl z-10">
        <div className="flex items-center font-bold text-2xl text-black">
          <Link id="to-homepage" href="/">
            MN Room
          </Link>
        </div>
        {token === "0" && (
          <div className="flex rounded">
            <Button className="bg-sky-900 hover:bg-sky-600 text-white rounded mr-2 py-1 px-3" label='Login'>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-sky-900 hover:bg-sky-600 text-white rounded mr-2 py-1 px-3" label='Register'>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
        {token !== "0" && (
          <div className="flex flex-row items-center justify-center ">
            <Button type="button">
              <div className="text-white mr-3" onClick={handleCreate}>
                <FaPlus />
              </div>
            </Button>
            <Button type="button">
              <div className="mr-3" onClick={handleModal}>
                {/* <Image
                  src={mentee}
                  alt="Picture of the author"
                  width={30}
                  height={30}
                /> */}
              </div>
            </Button>
          </div>
        )}
      </nav>
      {showModal && (
        <div
          id="dropdownDivider"
          className="z-10 bg-sky-900 divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-7 top-16"
        >
          <ul
            className="py-1 text-sm text-white dark:text-black"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link href="/historyEvent">
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  History Event
                </a>
              </Link>
            </li>
            <li>
              <Link href="/updateEvent">
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Edit Event
                </a>
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </>
  );
}
