"use client";

import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import ProfileDropDown from "@/components/ProfileDropDown";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostComponentForComments({
  postID,
  userName,
  text,
  avatar,
  timestamp,
  profileData,
  comments,
  likes,
}: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const notify = () => toast.error("Please Sign In Your Wallet");

  return (
    <div className="p-4 hover:bg-slate-100 first:rounded-t-xl last:rounded-b-xl border">
      <div className="flex gap-2">
        <div className="dropdown relative group">
          <Link href={`/u/${userName}`} className="dropdown-button">
            <img
              className="w-10 h-10 border bg-gray-600 rounded-full cursor-pointer"
              src={avatar}
              alt="Rounded avatar"
            />
          </Link>
          <div className="absolute hidden group-hover:block">
            <ProfileDropDown profileData={profileData} />
          </div>
        </div>
        <Link
          className="post__headerText inline-block cursor-pointer"
          href={`/u/${userName}`}
        >
          <h3 className="font-medium flex flex-col">
            {userName}

            <span className="post__headerSpecial font-thin text-sm text-red-400">
              @{userName}
              <span className="text-black">- {timestamp}</span>
            </span>
          </h3>
        </Link>
      </div>

      <div className="ml-[48px]">
        <div className="post__headerDescription break-words my-5 space-y-6">
          <p>{text}</p>
        </div>
        <div className="post__footer flex flex-row space-x-6 ">
          <div className="hover:bg-blue-200 rounded-full p-1.5 flex flex-row items-center">
            <button>
              <BiChat className=" h-5 w-10" />
            </button>
            <span className="-mt-1 py-2">{comments}</span>
          </div>
          <div className="hover:bg-red-200 rounded-full p-1.5 flex flex-row items-center">
            <AiOutlineHeart onClick={notify} className="h-5 w-10" />
            <span className="-mt-1 py-2">{likes}</span>
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
