import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Header", () => {
  it("ヘッダーが正しく表示される", () => {
    render(<Header />);

    // ロゴのテスト
    const logo = screen.getByText("Jun's BLOG");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
    expect(logo).toHaveTextContent("Jun's BLOG");

    // ナビゲーションメニューのテスト
    const navigationItems = [
      { label: "HOME", href: "/" },
      { label: "SEARCH", href: "/search" },
      { label: "PROFILE", href: "/profile" },
    ];

    navigationItems.forEach((item) => {
      const link = screen.getByText(item.label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveTextContent(item.label);
    });
  });
});
