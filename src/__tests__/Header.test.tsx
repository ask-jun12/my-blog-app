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
  });
});
