// scripts/fetch-assets.ts
import "dotenv/config";
import fs from "fs";
import path from "path";

const REPO_OWNER = process.env.REPO_OWNER ?? "";
const REPO_NAME = process.env.REPO_NAME ?? "";
const BRANCH = process.env.REPO_BRANCH ?? "master";
const DIR_PATH = process.env.REPO_DIR_PATH ?? "posts";

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

async function fetchJson(url: string) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch: ${url} (${res.status})`);

  return res.json();
}

async function downloadFile(url: string, destPath: string) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to download ${url}`);
  const buffer = await res.arrayBuffer();
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, Buffer.from(buffer));
  console.log(`✅ Saved: ${destPath}`);
}

async function main() {
  console.log("🔄 Fetching post directories...");

  const postsList = await fetchJson(`${API_BASE}/${DIR_PATH}?ref=${BRANCH}`);
  const postDirs = postsList.filter((f: any) => f.type === "dir");

  for (const dir of postDirs) {
    const dirPath = `${DIR_PATH}/${dir.name}`;
    const items = await fetchJson(`${API_BASE}/${dirPath}?ref=${BRANCH}`);

    const filesDir = items.find((f: any) => f.name === "Files");
    if (!filesDir) continue;

    const files = await fetchJson(`${filesDir.url}`);

    for (const file of files) {
      if (!file.name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) continue;

      const relativePath = `posts/${dir.name}/Files/${file.name}`;
      const destPath = path.join(process.cwd(), "public", relativePath);
      const rawUrl = `${RAW_BASE}/${relativePath}`;

      await downloadFile(rawUrl, destPath);
    }
  }

  console.log("🎉 All assets downloaded successfully!");
}

main().catch((err) => {
  console.error("❌ Error in fetch-assets:", err);
  process.exit(1);
});
