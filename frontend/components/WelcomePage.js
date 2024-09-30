import React from "react";
import Link from "next/link";
import Image from "next/image";

const WelcomePage = () => {
  return (
    <div className="">
      <div className="nav bg-green-700 h-16">
        <div className="p-5 ">
          <Image
            height={50}
            width={50}
            className=""
            src="./timthumb.svg"
          ></Image>
        </div>
      </div>
      <div className="middle bg-green-700 h-[70vh] flex flex-col items-center justify-center md:h-screen">
        <div className="text-yellow-200 text-2xl translate-x-2 font-bold">
          FUEL NETWORK{" "}
        </div>
        <div className="text-white text-3xl ">CLAIM YOUR HANDLE</div>
        <div className="mt-5 text-yellow-200">
          Check to see if you’re eligible to claim your handle <br /> to use
          across all the apps powered by Fuel Network.
        </div>
        <div className="mt-5 text-yellow-200">Please connect your wallet</div>
        <div className="mt-9">
          <Link href={"/LoginPageWelcome"}>
            {" "}
            <button className="rounded-full bg-gray-300 p-4 text-green-900">
              Connect Wallet
            </button>
          </Link>
        </div>
      </div>
      <div className="bottom bg-white h-96 md:h-screen flex flex-col items-center justify-center">
        <div className="image">
          <Image height={400} width={400} src="./2d.svg"></Image>
        </div>
        <div className="term mt-10 translate-y-10 underline">
          Terms & Conditions | Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
