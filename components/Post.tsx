import React from "react";
import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@/styles/highlight-js/styles/github-dark.css";

interface PostProps {
  title: string;
  date?: string;
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

const Post: NextPage<PostProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl m-10 p-10 bg-gray-900">
        <h1 className="text-5xl my-5">{title}</h1>
        <hr className="mx-4 my-16" />
        <article className="prose">
          <MDXRemote source={content} options={options as any} />
        </article>
      </div>
    </div>
  );
};

export default Post;
