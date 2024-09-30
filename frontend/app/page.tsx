import TopBanner from "@/components/TopBanner";
import Explore from "@/components/Explore";

export default function Page() {
  return (
    <>
      <TopBanner />
      <section className="container mx-auto max-w-screen-xl grow px-0 pb-2 pt-8 sm:px-5 ">
        <Explore />
      </section>
    </>
  );
}
