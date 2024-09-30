import React from "react";
import { useRouter } from "next/router";
import PPD from "./ProfileDropDown";
import Footer from "@/components/Footer";
import Post from "./Post";
import Comment from "./Comment";

const CommentsPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col  lg:flex-row items-start justify-center container mx-auto max-w-screen-xl px-5  ">
        <div className="flex flex-col ">
          <div>
            <Post
              id={1}
              displayName="Mr X"
              userName="MR X"
              text="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.."
              avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              image="https://media.istockphoto.com/id/1413150175/photo/panorama-60-mpix-xxxxl-size-of-beautiful-mount-ama-dablam-in-himalayas-nepal.jpg?s=1024x1024&w=is&k=20&c=mWvUbQuHUNOMda4WacL-q6GK5J8n-S85K6Gt-HrgHww="
              timestamp="13h"
            />
          </div>
          <div className="border-2 shadow-xl py-10">
            <Comment />
          </div>
        </div>
        <div>
        <div className="items-center justify-center sm:m-8  ">
          <PPD />
        </div>
        <div className="sticky mt-20 container ">
          <Footer />
        </div>
        </div>
      </div>
    </>
  );
};

export default CommentsPage;
