import Link from "next/link";
import React from "react";

interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = (props) => {
  return (
    <div>
      <nav className="bg-gray-800">
        <Link href="#">Blog</Link>
      </nav>
    </div>
  );
};

export default TopNav;
