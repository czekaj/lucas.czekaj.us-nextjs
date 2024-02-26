import React from "react";
import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@/styles/highlight-js/styles/github-dark.css";

interface PostProps {
  title: string;
  date?: string;
  lastUpdated?: string;
  draft: boolean;
  summary?: string;
  content: string;
}

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

const Post: NextPage<PostProps> = ({ title, content, date, lastUpdated }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl m-10 p-10 bg-gray-900 bg-opacity-90 rounded-lg">
        <h1 className="text-5xl my-5 text-center">{title}</h1>
        <h2 className="text-center">{date}</h2>
        <hr className="mx-4 my-8" />
        <article className="prose m-8 text-gray-200">
          <MDXRemote source={content} options={options as any} />
        </article>
        {lastUpdated && (
          <h3 className="text-xs font-extralight text-gray-500 italic text-center">
            Last updated on {lastUpdated}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Post;
