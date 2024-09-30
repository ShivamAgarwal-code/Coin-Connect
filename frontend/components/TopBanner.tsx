export default function TopBanner() {
  return (
    <div
      className="divider bg-hero mx-auto flex w-full  items-stretch px-5 py-12 text-center sm:py-12 sm:text-left bg-gradient-to-r from-white to-fuchsia-300
    "
    >
      <div className="flex-1 space-y-3 container mx-auto max-w-screen-xl px-5 py-8 sm:py-12">
        <div className="font-serif text-2xl font-extrabold sm:text-4xl">
          Welcome to Weave 👋
        </div>
        <div className="leading-7 text-black">
          Weave is a decentralized, and permissionless social media <br />
          app powered by Fuel Network
        </div>
      </div>
    </div>
  );
}
