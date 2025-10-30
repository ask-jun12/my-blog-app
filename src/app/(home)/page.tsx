import PostCard from "@/components/post/PostCard";
import { Post } from "@/types/post";

const HomePage = () => {
  const posts: Post[] = [
    {
      id: "1",
      title: "First Post",
      content: "This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post1/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
    {
      id: "2",
      title: "First Post",
      content: "This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post2/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
    {
      id: "3",
      title: "First Post",
      content: "This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post3/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
    {
      id: "4",
      title: "First Post",
      content:
        "This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post4/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
    {
      id: "5",
      title: "First Post",
      content: "This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post5/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
    {
      id: "6",
      title: "First Post",
      content: "This is the content of the first post.",
      topImage: "https://picsum.photos/seed/post6/600/400",
      createdAt: new Date(),
      author: { name: "Jun" },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
