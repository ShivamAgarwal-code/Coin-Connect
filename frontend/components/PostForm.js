"use client";

import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { config } from "@/config";
import { Web3Storage } from "web3.storage";
import { getContract } from "./utils";

const PostForm = ({ onCancel, imageComponent }) => {
  const [formData, setFormData] = useState({ text: "" });
  const [imagesURL, setImagesURL] = useState();
  const [images, setImages] = useState();

  function getFiles(e) {
    if (e.target.files && e.target.files.length) {
      const files = e.target.files;
      // console.log(files);
      // if (file.size < 2e7) {
      // setImagesURL(URL.createObjectURL(files));
      // console.log(files);
      setImages(e.target.files);
      // } else {
      //   alert("file size should not exceed 20 mb");
      // }
    }
  }

  const storeImages = async (files) => {
    const client = new Web3Storage({ token: config.web3StorageToken });
    const cid = await client.put(files, {});
    return cid;
  };

  const storeFile = async (files) => {
    const client = new Web3Storage({ token: config.web3StorageToken });
    const cid = await client.put(files, {
      wrapWithDirectory: false,
    });
    return cid;
  };

  function makeFileObjects(data) {
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    return [new File([blob], "post.json")];
  }

  const upload = async (formData) => {
    let uploadimages = [];
    if (images) {
      const cid = await storeImages(images);
      for (const img of images) {
        uploadimages.push("https://" + cid + ".ipfs.w3s.link/" + img.name);
      }
    }
    const MetaData = {
      name: "post",
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

  const create_post = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const uri = await upload(formData.text);
      // const uri =
      //   "https://bafkreidnxkfbvn5nhpolu4hitqvvntdwmnz6su4wjvbvqie7vkspwz4hpi.ipfs.w3s.link";
      console.log("lol", uri);
      console.log("create_post start");
      const contract = await getContract();
      console.log(contract.id.toB256());
      const create_post = await contract.functions
        .create_post(uri, 10)
        .txParams({ gasPrice: 1 })
        .call();
      console.log("create_post", create_post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-black p-9 rounded-2xl -mt-36 flex flex-col justify-between w-[800px]">
      <div className="flex justify-between">
        <div className="post__avatarppd p-2 border-double">
          <img
            className="w-10 h-10 rounded-full mb-3 cursor-pointer ring-4 ring-purple-400"
            src={imageComponent}
            alt="Rounded avatarppd"
          />
        </div>
        <button className="-mt-10" onClick={handleCancel}>
          <GiCancel className="text-white h-9 w-5" />
        </button>
      </div>
      <label
        htmlFor="message"
        className="block mb-2 font-medium text-white text-xl"
      >
        {"What's on your mind"}
      </label>
      <form action="#">
        <h4 className="title-create-item">Upload file</h4>
        <label className="uploadFile">
          <span className="filename">
            PNG, JPG, GIF, WEBP or MP4. Max 20mb.
          </span>
          <input
            accept="image/*"
            type="file"
            name="file"
            className="inputfile form-control"
            multiple
            onChange={getFiles}
          />
        </label>
      </form>
      <div className="card-media">
        {/* {images ? (
          images.map((image) => (
            <img src={URL.createObjectURL(image)} alt="Fuelart" />
          ))
        ) : (
          <></>
        )} */}
        {/* <img src={get_url(images)} alt="Fuelart" /> */}
      </div>
      <form
        onSubmit={create_post}
        className="flex flex-col justify-between items-center flex-grow"
      >
        <textarea
          id="message"
          name="text"
          value={formData.text || ""}
          onChange={handlechange}
          rows="3"
          className="block p-2.5 w-full text-xl text-white bg-black rounded-lg focus:outline-none"
          placeholder="Leave a comment..."
        ></textarea>
        <div className="h-px bg-gray-400 w-full my-2"></div>
        <div className="flex justify-end sm:w-[700px] ">
          <button className="button m-4 px-10 py-1 rounded-full bg-purple-500 text-white">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
