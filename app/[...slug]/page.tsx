import Post from "@/app/ui/Post";
import { getPostsSlugs } from "@/app/lib/posts";
import { getPostData } from "@/app/lib/post";

export const generateStaticParams = async () => {
  const allSlugs = await getPostsSlugs();
  return allSlugs.map((slug: string) => ({ slug: [slug] }));
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const postData = await getPostData(slug);
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
