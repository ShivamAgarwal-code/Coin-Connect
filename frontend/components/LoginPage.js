import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="flex min-h-screen items-center justify-center fixed inset-0 bg-gray-500/75 transition-opacity opacity-100"
          onClick={handleClose}
        >
          <div className="bg-white shadow rounded 2xl:w-1/3 md:w-1/2 w-full p-10 mt-16">
            <p
              tabIndex="0"
              className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
            >
              Connect your wallet.
            </p>
            <p
              tabIndex="0"
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Connect with one of our available wallet providers or create a new
              one.
            </p>
            <Link href={"/contact"}>
              {" "}
              <button
                aria-label="Browse Wallet"
                role="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
              >
                <p className="text-base font-medium ml-4 text-gray-700">
                  Browser Wallet
                </p>
              </button>
            </Link>
            <button
              aria-label="Browse Wallet"
              role="button"
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
            >
              <p className="text-base font-medium ml-4 text-gray-700">
                Wallet Connect
              </p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
