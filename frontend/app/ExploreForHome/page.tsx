"use client";

import Explore from "@/components/Explore";
import Tablist from "@/components/Tablist";

import React, { useState } from "react";
import Button from "@/components/Button";
import AllPost from "@/components/AllPost";
import Text from "@/components/Text";
import Video from "@/components/Video";
import Audio from "@/components/Audio";
import Images from "@/components/Images";
import Comment from "@/components/Comment";

export default function Page() {
  const [selectedButton, setSelectedButton] = useState("Explore");
  const [tabSelected, setTabSelected] = useState("Explore");

  const handleButtonSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleTablistSelect = (TabName: any) => {
    setTabSelected(TabName);
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-5">
      <Tablist handleTablistSelect={handleTablistSelect} />
      <Comment />

      <Button handleButtonSelect={handleButtonSelect} />
      {selectedButton === "All Post" ? <AllPost /> : null}
      {selectedButton === "Text" ? <Text /> : null}
      {selectedButton === "Video" ? <Video /> : null}
      {selectedButton === "Audio" ? <Audio /> : null}
      {selectedButton === "Images" ? <Images /> : null}
      {selectedButton === "Explore" || selectedButton === "" ? (
        <Explore />
      ) : null}
    </div>
  );
}
