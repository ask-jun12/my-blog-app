import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCardProps } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow py-0">
      <Link href={`/posts/${post.id}`}>
        {post.topImage && (
          <div className="relative w-full h-48">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader className="pt-4">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <span>{post.tags}</span>
            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PostCard;
