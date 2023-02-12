import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Post = {
  slug: string;
  content: string;
  title: string;
  date: string;
};

const postsDirectory = path.join(process.cwd(), "content");

export function getPostSlugs() { }
