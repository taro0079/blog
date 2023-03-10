import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-mark";
import Image from "next/image";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkPrism from "remark-prism";
import { createElement, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeParse from "rehype-parse/lib";
import rehypeReact from "rehype-react/lib";

type Data = {
  title: string;
  date: string;
  description: string;
  image: string;
};
export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
  const { data, content } = matter(file);
  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      plugins: ["line-numbers"],
    })
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  return { props: { frontMatter: data, content: result.toString() } };
}

const toReactNode = (content) => {
  const [Content, setContent] = useState(Fragment);
  useEffect(() => {
    const processor = unified()
      .use(rehypeParse, {
        fragment: true,
      })
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MyLink,
          img: MyImage,
        },
      })
      .processSync(content);
    setContent(processor.result);
  }, [content]);
  return Content;
};

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

const MyImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} width="1200" height="700" />;
};

const MyLink = ({ children, href }) => {
  return (
    <Link href={href}>
      <div>{children}</div>
    </Link>
  );
};

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
      {toReactNode(content)}
      <div className="mt-10 flex items-center justify-center">
        <Link href="/">HOME</Link>
      </div>
    </div>
  );
};

export default Post;
