"use client";

import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Modal } from "./Modal";
import { ModalforPost } from "./ModalforPost";
import { SlUserFollow } from "react-icons/sl";
import { useFetch } from "@/hooks/useFetch";

const ProfileDropdownForLeft = ({
  displayName,
  userName,
  text,
  avatarppd,
  follower,
  following,
  profileID,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);

  const { data } = useFetch({
    url: "follow/isFollowedByMe",
    method: "post",
    body: { request: profileID, who: 0 },
  });

  return (
    <div className="flex flex-row items-center justify-center h-96 w-64 bg-white">
      <div className="post flex flex-col  p-4 my-1 rounded-lg h-full w-full">
        <div className="post__avatarppd p-2 border-double border-red-500">
          <img
            className="w-52 h-52 -mt-36  bg-white rounded-lg cursor-pointer ring-8 ring-purple-400"
            src={avatarppd}
            alt="Rounded avatarppd"
          />
        </div>
        <div className="post__body p-2 ">
          <div className="post__header">
            <div className="post__headerText flex space-x-32">
              <h3 className="font-medium flex flex-col">
                {displayName}
                <span className="post__headerSpecial font-thin text-sm text-red-400">
                  @{userName}{" "}
                </span>
              </h3>
              <button onClick={() => setIsOpen(true)}>
                <FiEdit2 />
              </button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
            </div>
            <div className="post__headerDescription break-words space-y-6">
              <p>{text}</p>
            </div>
          </div>

          <div className="post__footer flex flex-row space-x-6"></div>
        </div>
        <div className="flex flex-row space-x-5 my-1 text-sm Fixed-bottom-14 left-2 ">
          <div className="font-semibold">{following} Following</div>
          <div className="font-semibold">{follower} Followers</div>
        </div>
        <div className="follow mt-6 mb-6 flex space-x-2 ring-2 rounded-md ring-purple-400 items-center  justify-center p-1">
          <button className="fill-purple-400 font-bold text-purple-500 text-sm flex items-center">
            <SlUserFollow className="mr-2" />
            {data ? "Following" : "Follow"}
          </button>
        </div>
        <div className="border border-gray-100 w-72 mb-2 "></div>
        <div className="">
          <ul className="space-y-2">
            <li>Intagram</li>
            <li>Twitter</li>
            <li>Github</li>
          </ul>
        </div>
        <div className="border border-gray-100 w-72 mb-2 mt-2 "></div>
        <div>
          <button
            onClick={() => {
              setPostOpen(true);
            }}
            className="button m-4 px-10 py-3 rounded-full bg-purple-500 text-white items-center justify-center"
          >
            Post
          </button>
          {postOpen && (
            <ModalforPost
              onClose={() => setPostOpen(false)}
              imageComponent={avatarppd}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdownForLeft;
