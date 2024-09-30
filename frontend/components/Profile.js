import React from "react";
import ProfileCover from "./ProfileCover";
import Right from "./Right";
import ButtonForProfile from "./ButtonForProfile";
import Left from "./Left";
import { useFetch } from "@/hooks/useFetch";

function Profile() {
  const { data } = useFetch({
    url: "profile/details",
    method: "post",
    body: { profile_id: 1 },
  });

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="coverPage">
        <ProfileCover />
      </div>
      <div className="flex flex-col md:flex-row mt-[2rem] container mx-auto max-w-screen-xl space-y-6">
        <div className="left items-center md:w-1/3">
          <Left />
        </div>
        <div className="right w-full md:w-2/3 ">
          <ButtonForProfile />
          <Right profiledetails={data} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
