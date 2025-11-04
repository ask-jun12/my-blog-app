import PostCard from "@/components/post/PostCard";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const mockPost = {
  id: "test-post-id",
  title: "テスト投稿",
  content: "テスト内容",
  topImage: "/images/test.jpg",
  createdAt: new Date("2025-10-30T23:45:11.000Z"),
  tags: ["Tech"],
  author: {
    name: "テストユーザー",
  },
};

describe("PostCard", () => {
  it("投稿カードが正しく表示される", () => {
    render(<PostCard post={mockPost} />);

    // タイトルのテスト
    const title = screen.getByText(mockPost.title);
    expect(title).toBeInTheDocument();

    // 著者名のテスト
    const authorName = screen.getByText(mockPost.author.name);
    expect(authorName).toBeInTheDocument();

    // タグのテスト
    const tags = screen.getByText(mockPost.tags.join(", "));
    expect(tags).toBeInTheDocument();

    // リンクのテスト
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/posts/${mockPost.id}`);

    // 画像のテスト
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
    expect(image).toHaveAttribute("alt", mockPost.title);
  });
});
