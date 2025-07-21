import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, getPostBySlug, NewsPost } from "@/lib/news";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

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
    <>
      <Box 
        minH="100vh" 
        className="news-page-bg"
      >
        <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
        <Container maxW="5xl" pt={20}>
          <Heading 
            as="h1" 
            textAlign="center" 
            mb={6} 
            size="2xl"
            className="news-title"
          >
            {post.title}
          </Heading>
          <Text 
            fontSize="md" 
            mb={8} 
            textAlign="center" 
            className="news-date"
          >
            {post.date}
          </Text>
          <Box px={8} className="news-content">
            <div 
              className="prose"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.+)/gm, '<h1 class="news-h1">$1</h1>')
                  .replace(/^## (.+)/gm, '<h2 class="news-h2">$1</h2>')
                  .replace(/^### (.+)/gm, '<h3 class="news-h3">$1</h3>')
                  .replace(/^\- (.+)/gm, '<li class="news-li">$1</li>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="news-strong">$1</strong>')
                  .replace(/\n\n/g, '</p><p class="news-p">')
                  .replace(/^(.+)$/gm, '<p class="news-p">$1</p>')
                  .replace(/<p[^>]*><li/g, '<ul class="news-ul"><li')
                  .replace(/<\/li><\/p>/g, '</li></ul>')
              }}
            />
          </Box>
        </Container>
      </Box>
      <style jsx>{`
        :global(.news-page-bg) {
          background: radial-gradient(ellipse at 20% 20%, #e9e3fa 0%, #fff 70%);
        }
        :global([data-theme="dark"] .news-page-bg) {
          background: radial-gradient(ellipse at 15% 10%, #392c5c 0%, #222632 65%, #191c25 100%);
        }
        :global(.news-title) {
          color: #1A202C;
        }
        :global([data-theme="dark"] .news-title) {
          color: #F7FAFC;
        }
        :global(.news-date) {
          color: #718096;
        }
        :global([data-theme="dark"] .news-date) {
          color: #A0AEC0;
        }
        :global(.prose) {
          font-size: 18px;
          line-height: 1.7;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose) {
          color: #E2E8F0;
        }
        :global(.news-h1) {
          font-size: 28px;
          font-weight: bold;
          margin: 24px 0 16px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .news-h1) {
          color: #F7FAFC;
        }
        :global(.news-h2) {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0 12px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .news-h2) {
          color: #F7FAFC;
        }
        :global(.news-h3) {
          font-size: 20px;
          font-weight: bold;
          margin: 16px 0 8px 0;
          color: #2D3748;
        }
        :global([data-theme="dark"] .news-h3) {
          color: #E2E8F0;
        }
        :global(.news-li) {
          margin: 4px 0;
          padding-left: 8px;
        }
        :global(.news-strong) {
          font-weight: 600;
        }
        :global(.news-p) {
          margin: 16px 0;
        }
        :global(.news-ul) {
          margin: 16px 0;
          padding-left: 20px;
        }
      `}</style>
    </>
  );
}
