import Link from "next/link";

export default function ProfileDropDown({ profileData }) {
  return (
    <>
      <div className="w-64 bg-white">
        <div className="post flex flex-col border p-4 my-1 rounded-lg">
          <Link href={`/u/${profileData.handle}`}>
            <div className="post__avatarppd py-2 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full"
                src={profileData.token_uri}
                alt="Rounded avatarppd"
              />
            </div>
          </Link>
          <div className="post__body py-2">
            <div className="post__header">
              <div className="post__headerText">
                <h3 className="font-medium flex flex-col">
                  {profileData.handle.replace(/[^a-zA-Z0-9 ]/g, "")}
                  <span className="post__headerSpecial font-thin text-sm text-red-400">
                    @{profileData.handle.replace(/[^a-zA-Z0-9 ]/g, "")}
                  </span>
                </h3>
              </div>
              <div className="post__headerDescription break-words space-y-6">
                <p>this is bio</p>
              </div>
            </div>

            <div className="post__footer flex flex-row space-x-6"></div>
          </div>
          <div className="flex flex-row space-x-5 my-1 text-sm">
            <div className="font-semibold">
              {profileData.following_count} Following
            </div>
            <div className="font-semibold">
              {profileData.followers_count} Followers
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
