import React from "react";
import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@/app/ui/highlight-js/styles/github-dark.css";

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
    <article>
      <section id="header">
        <h1 className="text-5xl my-5 text-center">{title}</h1>
        <h2 className="text-center text-gray-400">{date}</h2>
        <hr className="mx-4 mt-12 mb-16 border-gray-600" />
      </section>
      <section id="body" className="prose m-8 text-gray-200">
        <MDXRemote source={content} options={options as any} />
      </section>
      <section id="footer" className="text-center">
        {lastUpdated && (
          <h3 className="text-xs font-extralight text-gray-600">
            Last updated on {lastUpdated}
          </h3>
        )}
      </section>
    </article>
  );
};

export default Post;
