"use client";

import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import ProfileDropDown from "@/components/ProfileDropDown";
import PostComponentForComments from "@/components/PostComponetForComments";
import { toast } from "react-toastify";
import { getContract } from "@/components/utils";
import { useFetch } from "@/hooks/useFetch";
import { comment } from "postcss";
import { Web3Storage } from "web3.storage";
import { config } from "@/config";

export default function Page({ params }: any) {
  const { postId } = params;

  let user: any;
  // window is not accessable on server
  if (typeof window !== "undefined") {
    user = sessionStorage.getItem("user");
    if (user) user = JSON.parse(user);
  }

  const { data: postData, refetch } = useFetch({
    url: `post/details/${postId}`,
  });

  const [data, setData] = useState(postData);

  useEffect(() => {
    setData(postData);
  }, [postData]);

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

  // function getFiles(e) {
  //   if (e.target.files && e.target.files.length) {
  //     const files = e.target.files;
  //     // console.log(files);
  //     // if (file.size < 2e7) {
  //     // setImagesURL(URL.createObjectURL(files));
  //     // console.log(files);
  //     setImages(e.target.files);
  //     // } else {
  //     //   alert("file size should not exceed 20 mb");
  //     // }
  //   }
  // }

  const storeImages = async (files: any) => {
    const client = new Web3Storage({ token: config.web3StorageToken });
    const cid = await client.put(files, {});
    return cid;
  };

  const storeFile = async (files: any) => {
    const client = new Web3Storage({ token: config.web3StorageToken });
    const cid = await client.put(files, {
      wrapWithDirectory: false,
    });
    return cid;
  };

  function makeFileObjects(data: {}) {
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    return [new File([blob], "post.json")];
  }

  const upload = async (formData: String) => {
    let uploadimages: string[] = [];
    // if (images) {
    //   const cid = await storeImages(images);
    //   for (const img of images) {
    //     uploadimages.push("https://" + cid + ".ipfs.w3s.link/" + img.name);
    //   }
    // }
    const MetaData = {
      name: "comment",
      image: "",
      description: "description",
      attributes: [],
      images: uploadimages,
      content: formData,
    };

    const cid2 = await storeFile(makeFileObjects(MetaData));

    const token_uri = "https://" + cid2 + ".ipfs.w3s.link";
    return token_uri;
  };

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    if (!user) return toast.error("Please Sign In Your Wallet");
    if (!comment) return toast.error("Comment can not be empty");
    console.log(comment);
    try {
      const uri = await upload(comment);
      console.log("lol", uri);
      console.log("comment_post start");
      const contract = await getContract();
      const comment_post = await contract.functions
        .comment_post(postId, uri)
        .txParams({ gasPrice: 1 })
        .call();
      console.log("comment_post", comment_post);
      // setTimeout(() => {
      //   refetch();
      // }, 100);
      // const { data: postData } = useFetch({ url: `post/details/${postId}` });
      // setData(postData);
    } catch (error) {
      console.log(error);
    }
    event.target.reset();
  };

  return (
    <section className="container mx-auto max-w-screen-xl grow px-0 pb-2 pt-8 sm:px-5">
      <div className="grid grid-cols-12 lg:gap-8">
        {data ? (
          <>
            <div className="col-span-12 mb-5 md:col-span-12 lg:col-span-8 space-y-5">
              <div className="rounded-xl border border-solid bg-white">
                <Post
                  post={{
                    post_id: data.post.post_id,
                    data: data.post.data,
                    timestamp: data.post.timestamp,
                    total_likes: data.likes.length,
                    total_comments: data.comments.length,
                    is_liked_by_me: data.likes.filter(
                      (like: any) => like.profile_id === user?.profile_id
                    ).length,
                  }}
                  profile={data.post.profile}
                />
                <div className="">
                  <form onSubmit={handleCommentSubmit} className="w-full p-4">
                    <div className="mb-2">
                      <label
                        htmlFor="comment"
                        className="text-lg text-gray-600"
                      >
                        Add a comment
                      </label>
                      <textarea
                        className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        name="comment"
                        placeholder="Enter your comment"
                      ></textarea>
                    </div>
                    <button className="px-3 py-2 text-sm text-purple-100 bg-purple-600 rounded">
                      Comment
                    </button>
                  </form>
                </div>
              </div>
              <div className="first:rounded-t-xl last:rounded-b-xl">
                {data.comments.map((comment: any) => (
                  <PostComponentForComments
                    key={comment.comment_id}
                    postId={comment.comment_id}
                    displayName={comment.profile.handle.replace(
                      /[^a-zA-Z0-9 ]/g,
                      ""
                    )}
                    userName={comment.profile.handle.replace(
                      /[^a-zA-Z0-9 ]/g,
                      ""
                    )}
                    text={comment.data.content}
                    avatar={comment.profile.token_uri}
                    timestamp={formatTimestamp(comment.timestamp)}
                    profileData={comment.profile}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-12 lg:col-span-4 space-y-5">
              <ProfileDropDown profileData={data.post.profile} />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-12 md:col-span-12 lg:col-span-8 rounded-xl border border-solid">
              <div
                role="status"
                className="rounded animate-pulse md:p-6 items-center justify-center "
              >
                <div className="flex flex-row space-x-2">
                  <div className=" bg-gray-200 rounded-full w-7 h-7 mb-4"></div>
                  <div>
                    <div className=" bg-gray-200 rounded-full w-28 h-1.5 mb-4"></div>
                    <div className=" bg-gray-200 rounded-full w-28 h-1.5 mb-4"></div>
                  </div>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                  <svg
                    className="w-12 h-12 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-4 mx-auto border h-60 rounded-md w-60 p-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mb-4"></div>
              <div className="flex flex-col gap-4 h-full animate-pulse">
                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-300 rounded-md w-36"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-36"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
