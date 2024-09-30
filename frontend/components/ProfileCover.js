import React from "react";
import Link from "next/link";

const ProfileCover = () => {
  return (
    <div
      className=" mx-auto flex w-screen h-52  items-stretch px-5 py-8 text-center sm:py-12 sm:text-left bg-gradient-to-r from-purple-300 to-fuchsia-900
    "
    >
      <div className="flex-1 space-y-3 container mx-auto max-w-screen-xl px-5">
        <div className="font-serif text-2xl font-extrabold sm:text-4xl">
          Weave Cover Photo👋
        </div>
        <div className="leading-7 text-black"></div>
      </div>
    </div>
  );
};

export default ProfileCover;
