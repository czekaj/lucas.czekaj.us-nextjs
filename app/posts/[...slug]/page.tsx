import Post from "@/components/Post";
import { postsSlugs } from "@/lib/getPostsMetadata";

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

export const generateStaticParams = async () => {
  const allSlugs = await postsSlugs();
  return allSlugs.map((slug: string) => ({ slug: [slug] }));
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
  const metadata = postData.metadata;

  const title = metadata.title;
  const content = postData.content;
  const draft = metadata.draft;

  return (
    <>
      <Post title={title} content={content} draft={draft}></Post>
    </>
  );
}
