"use client";

import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import ProfileDropDown from "@/components/ProfileDropDown";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getContract } from "./utils";

export default function Post(props: any) {
  const [totalLikes, setTotalLikes] = useState(props.post.total_likes);
  const [isLikedByMe, setIsLikedByMe] = useState(props.post.is_liked_by_me);
  const router = useRouter();

  const formatTimestamp = (timestamp: number) => {
    const hoursAgo = Math.floor(
      (Date.now() - timestamp * 1000) / (1000 * 60 * 60)
    );
    if (hoursAgo >= 24) {
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo}d`;
    } else {
      return `${hoursAgo}h`;
    }
  };

  const like_post = async (event: any) => {
    event.stopPropagation();
    try {
      console.log("like_post start");
      const contract = await getContract();
      const like_post = await contract.functions
        .like_post(props.post.post_id)
        .txParams({ gasPrice: 1 })
        .call();
      console.log("like_post", like_post);
      setTotalLikes(totalLikes + 1);
      setIsLikedByMe(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unlike_post = async (event: any) => {
    event.stopPropagation();
    try {
      console.log("unlike_post start");
      const contract = await getContract();
      const unlike_post = await contract.functions
        .unlike_post(props.post.post_id)
        .txParams({ gasPrice: 1 })
        .call();
      console.log("unlike_post", unlike_post);
      setTotalLikes(totalLikes - 1);
      setIsLikedByMe(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5 px-7">
      <div className="post__body w-full">
        <div className="post__header flex gap-2">
          <div className="dropdown relative group">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`/u/${props.profile.handle}`}
              className="dropdown-button"
            >
              <img
                className="w-10 h-10 border bg-gray-600 rounded-full cursor-pointer"
                src={props.profile.token_uri}
                alt="Rounded avatar"
              />
            </Link>
            <div className="absolute invisible group-hover:visible">
              <ProfileDropDown profileData={props.profile} />
            </div>
          </div>
          <Link
            onClick={(e) => e.stopPropagation()}
            className="post__headerText inline-block cursor-pointer"
            href={`/u/${props.profile.handle}`}
          >
            <h3 className="font-medium flex flex-col">
              {props.profile.handle.replace(/[^a-zA-Z0-9 ]/g, "")}

              <span className="post__headerSpecial font-thin text-sm text-red-400">
                @{props.profile.handle.replace(/[^a-zA-Z0-9 ]/g, "")}
                <span className="text-black">
                  - {formatTimestamp(props.post.timestamp)}
                </span>
              </span>
            </h3>
          </Link>
        </div>
        <div className="ml-[48px]">
          <div className="post__headerDescription break-words my-5 space-y-6">
            <div>
              {props.post.data.content
                .split("\\n")
                .map((line: any, index: number) => {
                  const regex = /@\w+/g;
                  const words = line
                    .split(" ")
                    .map((word: string, i: number) => {
                      if (regex.test(word)) {
                        return (
                          <Link
                            className="text-red-400"
                            key={i}
                            href={`/u/${word.slice(1)}`}
                          >
                            {word}
                          </Link>
                        );
                      } else {
                        return word;
                      }
                    });

                  return (
                    <p key={index} className="my-5">
                      {words.reduce(
                        (prev: any, curr: any, i: number) => [
                          ...prev,
                          i > 0 ? " " : "",
                          curr,
                        ],
                        []
                      )}
                      <br />
                    </p>
                  );
                })}
            </div>
          </div>
          <div
            className={`grid gap-2 grid-cols-${
              props.post.data.images.length > 1 ? 2 : 1
            } pb-2`}
          >
            {props.post.data.images.map((image: string, index: number) => (
              <img key={index} src={image} alt="" className="h-auto w-auto " />
            ))}
          </div>
          <div className="post__footer flex flex-row space-x-6 ">
            <div className="hover:bg-blue-200 rounded-full p-1.5 flex flex-row items-center">
              <BiChat className=" h-5 w-10" />
              <span className="-mt-1 p-2">{props.post.total_comments}</span>
            </div>
            <div
              className={`${
                isLikedByMe && "bg-red-200"
              } hover:bg-red-200 cursor-pointer rounded-full p-1.5 flex flex-row items-center`}
            >
              {isLikedByMe ? (
                <AiFillHeart onClick={unlike_post} className="h-5 w-10" />
              ) : (
                <AiOutlineHeart onClick={like_post} className="h-5 w-10" />
              )}
              {/* <AiOutlineHeart onClick={addLike} className="h-5 w-10" /> */}
              <span className="-mt-1 p-2">{totalLikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
