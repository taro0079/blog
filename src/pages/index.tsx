import fs from "fs";
import matter from "gray-matter";
import PostCard from "./components/PostCard";

type Post = {
  frontMatter: any;
  slug: string;
};

export default function Home({ posts }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-3">
        {posts.map((post: Post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = () => {
  const files = fs.readdirSync("posts");
  const posts: Post[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
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
