import Link from "next/link";

const PostCard = ({ post }) => {
  return <Link href={`/posts/${post.slug}`}>{post.fromMatter.title}</Link>;
};

export default PostCard;
