import PostCard from "@/components/post/PostCard";
import { fetchAllPosts } from "@/lib/fetchPost";
import { Post } from "@/types/post";

const HomePage = async () => {
  const posts: Post[] = await fetchAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="w-full font-['Inter-Bold',Helvetica] font-bold text-black text-[48px] tracking-[-1.28px] leading-normal pt-8">
        Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
