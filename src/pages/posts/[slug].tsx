import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-mark";
import Image from "next/image";

type Data = {
  title: string;
  date: string;
  description: string;
  image: string;
};
export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const Post = ({
  frontMatter,
  content,
}: {
  frontMatter: Data;
  content: string;
}) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="border">
        <Image
          src={`/${frontMatter.image}`}
          width={1200}
          height={700}
          alt={frontMatter.title}
        />
      </div>
      <h1 className="mt-12">{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
