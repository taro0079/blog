import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-mark";
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
    <div className="prose">
      <h1>{frontMatter.title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
