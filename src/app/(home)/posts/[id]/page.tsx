import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchPostFromDir } from "@/lib/fetchPost";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type Params = {
  params: Promise<{ id: string }>;
};

const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const post = await fetchPostFromDir(`posts/${id}`);

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto pt-0">
        {post.topImage && (
          <div className="relative w-full h-96 lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">投稿者: {post.author.name}</p>
            <p className="text-sm text-gray-500">タグ: {post.tags}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                locale: ja,
              })}
            </time>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]} // HTMLとコードハイライト対応
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
