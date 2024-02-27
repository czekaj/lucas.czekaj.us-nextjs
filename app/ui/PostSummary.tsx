import React from "react";
import { PostMetadata } from "../lib/post";
import Link from "next/link";

interface PostSummaryProps {
  key: string;
  metadata: PostMetadata;
}

const PostSummary: React.FC<PostSummaryProps> = ({ metadata }) => {
  return (
    <article>
      <div className="m-5 p-5">
        <div className="text-gray-400">{metadata.formattedDate}</div>
        <div className="text-2xl my-2 font-black">
          <Link href={"/" + metadata.slug}>{metadata.title}</Link>
        </div>
        <div className="text-sm text-gray-400">{metadata.summary}</div>
      </div>
      <hr className="m-5 border-gray-500" />
    </article>
  );
};

export default PostSummary;
