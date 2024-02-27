import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import TopNav from "./ui/TopNav";

const dmSans = DM_Sans({ subsets: ["latin"], weight: "300", display: "swap" });

export const metadata: Metadata = {
  title: "Lucas Czekaj - blog",
  description: "Lucas Czekaj - personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={dmSans.className}>
        <div
          id="background"
          className="fixed h-full w-full bg-gray-900"
          style={{
            background: "url('/bg-vegas.jpg') no-repeat center center fixed",
            backgroundSize: "cover",
          }}
        ></div>
        <div id="root-container" className="relative text-gray-200">
          <main className="flex flex-col max-w-6xl w-4/5 m-auto">
            <section id="nav" className="">
              <TopNav />
            </section>
            <section id="content">{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}
