import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, getPostBySlug, NewsPost } from "@/lib/news";
import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { marked } from "marked";

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
  const bgColor = useColorModeValue("#f8f8f8", "#1d1d1d");
  
  // Configure marked for better table support
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true
  });
  
  // Process markdown content
  const processedContent = marked(post.content);
  
  return (
    <>
      <Box minH="100vh" bg={bgColor}>
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Container maxW="5xl" pt={20} pb={10}>
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
        <Box className="news-content">
          <div 
            className="prose"
            dangerouslySetInnerHTML={{
              __html: processedContent
            }}
          />
        </Box>
      </Container>
    </Box>
    <style jsx>{`
        :global(.news-title) {
          color: #1A202C;
        }
        :global([data-theme="dark"] .news-title) {
          color: #ffffff;
        }
        :global(.news-date) {
          color: #718096;
        }
        :global([data-theme="dark"] .news-date) {
          color: #a0a0a0;
        }
        :global(.prose) {
          font-size: 18px;
          line-height: 1.7;
          color: #2D3748;
          max-width: none;
        }
        :global([data-theme="dark"] .prose) {
          color: #e6e6e6;
        }
        :global(.prose h1) {
          font-size: 28px;
          font-weight: bold;
          margin: 24px 0 16px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose h1) {
          color: #ffffff;
        }
        :global(.prose h2) {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0 12px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose h2) {
          color: #ffffff;
        }
        :global(.prose h3) {
          font-size: 20px;
          font-weight: bold;
          margin: 16px 0 8px 0;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose h3) {
          color: #d0d0d0;
        }
        :global(.prose p) {
          margin: 16px 0;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose p) {
          color: #e6e6e6;
        }
        :global(.prose ul) {
          margin: 16px 0;
          padding-left: 20px;
        }
        :global(.prose li) {
          margin: 4px 0;
          padding-left: 8px;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose li) {
          color: #e6e6e6;
        }
        :global(.prose strong) {
          font-weight: 600;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose strong) {
          color: #ffffff;
        }
        :global(.prose table) {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        :global([data-theme="dark"] .prose table) {
          border-color: #4a5568;
        }
        :global(.prose th) {
          background-color: #f7fafc;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #2d3748;
          border-bottom: 1px solid #e2e8f0;
        }
        :global([data-theme="dark"] .prose th) {
          background-color: #2d3748;
          color: #ffffff;
          border-color: #4a5568;
        }
        :global(.prose td) {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
        }
        :global([data-theme="dark"] .prose td) {
          border-color: #4a5568;
          color: #e6e6e6;
        }
        :global(.prose tr:nth-child(even)) {
          background-color: #f8fafc;
        }
        :global([data-theme="dark"] .prose tr:nth-child(even)) {
          background-color: #1a202c;
        }
        :global(.prose tr:hover) {
          background-color: #edf2f7;
        }
        :global([data-theme="dark"] .prose tr:hover) {
          background-color: #2d3748;
        }
      `}</style>
    </>
  );
}
