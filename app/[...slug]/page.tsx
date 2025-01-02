import Post from "@/app/ui/Post";
import { getPostsSlugs } from "@/app/lib/posts";
import { getPostData } from "@/app/lib/post";

export const generateStaticParams = async () => {
  const allSlugs = await getPostsSlugs();
  return allSlugs.map((slug: string) => ({ slug: [slug] }));
};

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const slug = decodeURI((await params).slug.join("/"));
  const postData = await getPostData(slug);
  const metadata = postData.metadata;

  const title = metadata.title;
  const content = postData.content;
  const draft = metadata.draft;
  const date = metadata.formattedDate;
  const lastUpdated = metadata.formattedLastUpdated;

  return (
    <>
      <Post
        title={title}
        content={content}
        draft={draft}
        date={date}
        lastUpdated={lastUpdated}
      ></Post>
    </>
  );
}
