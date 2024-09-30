import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "weave",
  description: "perpost is a twitter clone in sway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa]">
        <main>
          <Header />
          <div className={inter.className}>{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={true}
          />
        </main>
      </body>
    </html>
  );
}
