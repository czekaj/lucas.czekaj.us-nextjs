import { getPostsMetadata } from "./lib/posts";
import PostSummary from "./ui/PostSummary";

export default function Home() {
  const mostRecentPosts = getPostsMetadata();
  return (
    <>
      <h1 className="text-5xl text-center">Latest posts</h1>
      {mostRecentPosts.map((postMetadata) => (
        <PostSummary key={postMetadata.slug} metadata={postMetadata} />
      ))}
    </>
  );
}
