import { Post } from "@/types/post";
import matter from "gray-matter";

type GithubContentItem = {
  name: string;
  type: string;
  download_url?: string;
  path: string;
};

const REPO_OWNER = process.env.REPO_OWNER ?? "";
const REPO_NAME = process.env.REPO_NAME ?? "";
const BRANCH = process.env.REPO_BRANCH ?? "master";
const DIR_PATH = process.env.REPO_DIR_PATH ?? "posts";

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

/**
 * 単一記事フォルダからMarkdownとtopImageを抽出
 */
const fetchPostFromDir = async (dirPath: string): Promise<Post | null> => {
  console.log(`Fetching post from directory: ${dirPath}`);
  // Markdownファイルを検索
  const listUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dirPath}?ref=${BRANCH}`;
  const res = await fetch(listUrl, { headers });
  if (!res.ok) return null;

  const items: GithubContentItem[] = await res.json();
  const mdFile = items.find((f) => f.name.endsWith(".md"));
  const filesDir = items.find((f) => f.name === "Files");

  if (!mdFile) return null;

  // Markdown取得
  if (!mdFile.download_url) return null;
  const mdRes = await fetch(mdFile.download_url, { headers });
  const mdText = await mdRes.text();

  const { data: frontmatter, content } = matter(mdText);

  const articleId = filesDir?.path.split("/")[1];
  if (!articleId) return null;

  // topImage推定
  const topImageUrl = filesDir?.path
    ? `/${filesDir.path}/${process.env.TOP_IMAGE_NAME ?? "topImage.png"}`
    : "";

  const title = mdFile.name.replace(".md", "");
  const createdAt = new Date(frontmatter.created);

  return {
    id: articleId,
    title,
    content,
    topImage: topImageUrl,
    createdAt,
    author: {
      name: frontmatter.author?.name ?? process.env.AUTHOR_NAME ?? "Unknown",
    },
    tags: frontmatter.tags ?? ["タグなし"],
  };
};

/**
 * posts/ディレクトリ内の全サブフォルダを走査
 */
const fetchAllPosts = async (): Promise<Post[]> => {
  const listUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DIR_PATH}?ref=${BRANCH}`;
  const res = await fetch(listUrl, { headers });
  if (!res.ok) throw new Error("Failed to list posts directory");

  const dirs: GithubContentItem[] = await res.json();
  const postDirs = dirs.filter((f) => f.type === "dir");

  const posts = (
    await Promise.all(
      postDirs.map((dir) => fetchPostFromDir(`${DIR_PATH}/${dir.name}`)),
    )
  ).filter(Boolean) as Post[];

  // 作成日時降順ソート
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export { fetchAllPosts, fetchPostFromDir };
