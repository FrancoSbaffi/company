import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, NewsPost } from "@/lib/news";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default function NewsPostPage({ post }: { post: NewsPost }) {
  return (
    <div>
      {/* Navegación simple sin componentes complejos */}
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/news">News</Link>
      </nav>
      
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>{post.title}</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>{post.date}</p>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </div>
    </div>
  );
}
