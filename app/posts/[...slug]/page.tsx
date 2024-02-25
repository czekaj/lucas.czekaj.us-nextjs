import { MDXRemote } from "next-mdx-remote/rsc";

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
  console.log(postData);
  const postContent = postData.content;
  return (
    <div>
      <p>one two three</p>
      <h1>Post: {slug}</h1>
      <h2>Content:</h2>
      <div className="wrapper">
        <MDXRemote source={postContent} />
      </div>
    </div>
  );
}
