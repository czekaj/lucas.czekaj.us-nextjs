import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Actor } from "next/font/google";

const actor = Actor({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = (props) => {
  return (
    <nav
      className={`flex justify-between items-center my-10 mx-2 h-20 ${actor.className}`}
    >
      <Link className="flex" key="home" href="/">
        <div className="mr-3">
          <Image
            src={"/lucas_czekaj.jpg"}
            alt="lucas czekaj"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className={`self-center text-4xl`}>lucas czekaj</div>
      </Link>
      <Link className="" key="blog" href="#">
        blog
      </Link>
    </nav>
  );
};

export default TopNav;
