import Post from "@/app/ui/Post";
import { postsSlugs } from "@/app/lib/getPostsMetadata";

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

export const generateStaticParams = async () => {
  const allSlugs = await postsSlugs();
  return allSlugs.map((slug: string) => ({ slug: [slug] }));
};

const getPostData = (slug: string) => {
  const fullPath = path.join(process.cwd(), "data", slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata["slug"] = slug;
  metadata["lastUpdated"] = fs.statSync(fullPath).mtime;

  return { metadata: metadata, content: content };
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const postData = getPostData(slug);
  const metadata = postData.metadata;

  const title = metadata.title;
  const content = postData.content;
  const draft = metadata.draft;
  const formattedDate = new Date(metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  let formattedLastUpdated = null;
  if (metadata.lastUpdated) {
    formattedLastUpdated = new Date(metadata.lastUpdated).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
    );
  }

  return (
    <>
      <Post
        title={title}
        content={content}
        draft={draft}
        date={formattedDate}
        lastUpdated={formattedLastUpdated || undefined}
      ></Post>
    </>
  );
}
