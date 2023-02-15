import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import fs from "fs";
import styles from "src/styles/Home.module.css";
import matter from "gray-matter";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ posts }) => {
  return (
    <div className="my-8">
      <Link href="about">about</Link>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`posts/${post.slug}`}>
            <div>{post.frontMatter.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Home;

export const getStaticProps = () => {
  const files = fs.readdirSync("src/pages/posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`src/pages/posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });
  return {
    props: {
      posts,
    },
  };
};
