import ProfileDropdownForLeft from "@/components/ProfileDropDownForLEft";

export default function Left({ data }: any) {
  return (
    <>
      <div className="flex flex-row container  mx-auto max-w-screen-xl px-5">
        <div>
          {data && (
            <ProfileDropdownForLeft
              profileID={data.profile.profile_id}
              displayName={data.profile.handle.replace(/[^a-zA-Z0-9 ]/g, "")}
              userName={data.profile.handle.replace(/[^a-zA-Z0-9 ]/g, "")}
              text="I am the ghost"
              avatarppd={data.profile.token_uri}
              follower={data.profile.followers_count}
              following={data.profile.following_count}
            />
          )}
        </div>
      </div>
    </>
  );
}
