type Post = {
  id: string;
  title: string;
  content: string;
  topImage: string | null;
  createdAt: Date;
  author: {
    name: string;
  };
  tags: string[];
};

type PostCardProps = { post: Post };

export { type Post, type PostCardProps };
