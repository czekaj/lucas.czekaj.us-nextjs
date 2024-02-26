import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@/styles/highlight-js/styles/github-dark.css";

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

export const generateStaticParams = async () => {
  return [{ slug: ["hello-blog"] }];
};

const getPostData = (slug: String) => {
  const fullPath = path.join(process.cwd(), "data/posts", slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata["slug"] = slug;

  return { metadata: metadata, content: content };
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const postData = getPostData(slug);
  const postContent = postData.content;
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl m-10 p-10 bg-gray-900">
        <h1 className="text-5xl my-5">{postData.metadata.title}</h1>
        <hr className="mx-4 my-16" />
        <article className="prose">
          <MDXRemote source={postContent} options={options} />
        </article>
      </div>
    </div>
  );
}
