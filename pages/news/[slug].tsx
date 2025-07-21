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
      <Container maxW="4xl" pt={12} pb={8} px={{ base: 4, md: 6 }}>
        <Heading 
          as="h1" 
          textAlign="center" 
          mb={3} 
          size="xl"
          fontWeight="bold"
          className="news-title"
        >
          {post.title}
        </Heading>
        <Text 
          fontSize="sm" 
          mb={6} 
          textAlign="center"
          fontWeight="500" 
          className="news-date"
        >
          {post.date}
        </Text>
        <Box className="news-content">
          <Box className="table-wrapper">
            <div 
              className="prose"
              dangerouslySetInnerHTML={{
                __html: processedContent
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
    <style jsx>{`
        :global(.news-title) {
          color: #1A202C;
          font-size: 32px;
          line-height: 1.2;
        }
        :global([data-theme="dark"] .news-title) {
          color: #ffffff;
        }
        
        /* Responsive title styles */
        @media (max-width: 768px) {
          :global(.news-title) {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          :global(.news-title) {
            font-size: 20px;
            line-height: 1.3;
          }
        }
        :global(.news-date) {
          color: #718096;
          opacity: 0.8;
        }
        :global([data-theme="dark"] .news-date) {
          color: #cbd5e0;
          opacity: 0.9;
        }
        :global(.prose) {
          font-size: 16px;
          line-height: 1.6;
          color: #2D3748;
          max-width: none;
          overflow-x: hidden;
        }
        :global([data-theme="dark"] .prose) {
          color: #f7fafc;
        }
        
        /* Responsive content styles */
        @media (max-width: 768px) {
          :global(.prose) {
            font-size: 14px;
            line-height: 1.5;
          }
        }
        
        @media (max-width: 480px) {
          :global(.prose) {
            font-size: 13px;
          }
        }
        :global(.prose h1) {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0 12px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose h1) {
          color: #ffffff;
        }
        :global(.prose h2) {
          font-size: 20px;
          font-weight: bold;
          margin: 16px 0 10px 0;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose h2) {
          color: #ffffff;
        }
        :global(.prose h3) {
          font-size: 18px;
          font-weight: bold;
          margin: 14px 0 8px 0;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose h3) {
          color: #f7fafc;
        }
        :global(.prose p) {
          margin: 12px 0;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose p) {
          color: #f7fafc;
        }
        :global(.prose ul) {
          margin: 12px 0;
          padding-left: 18px;
        }
        :global(.prose li) {
          margin: 3px 0;
          padding-left: 6px;
          color: #2D3748;
        }
        :global([data-theme="dark"] .prose li) {
          color: #f7fafc;
        }
        :global(.prose strong) {
          font-weight: 600;
          color: #1A202C;
        }
        :global([data-theme="dark"] .prose strong) {
          color: #ffffff;
        }
        :global(.table-wrapper) {
          overflow-x: visible;
          margin: 0;
          padding: 0;
        }
        
        @media (max-width: 768px) {
          :global(.table-wrapper) {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -16px;
            padding: 0 16px;
            scrollbar-width: thin;
          }
          :global(.table-wrapper::-webkit-scrollbar) {
            height: 6px;
          }
          :global(.table-wrapper::-webkit-scrollbar-track) {
            background: #f1f1f1;
            border-radius: 3px;
          }
          :global(.table-wrapper::-webkit-scrollbar-thumb) {
            background: #888;
            border-radius: 3px;
          }
          :global([data-theme="dark"] .table-wrapper::-webkit-scrollbar-track) {
            background: #2d3748;
          }
          :global([data-theme="dark"] .table-wrapper::-webkit-scrollbar-thumb) {
            background: #4a5568;
          }
        }
        
        :global(.prose table) {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          :global(.prose table) {
            min-width: 600px;
            width: 600px;
          }
        }
        
        @media (max-width: 480px) {
          :global(.prose table) {
            min-width: 500px;
            width: 500px;
          }
        }
        :global([data-theme="dark"] .prose table) {
          border-color: #4a5568;
        }
        :global(.prose th) {
          background-color: #f7fafc;
          padding: 8px 10px;
          text-align: left;
          font-weight: 600;
          color: #2d3748;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
          white-space: nowrap;
        }
        :global([data-theme="dark"] .prose th) {
          background-color: #2d3748;
          color: #ffffff;
          border-color: #4a5568;
        }
        :global(.prose td) {
          padding: 8px 10px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
          font-size: 14px;
          white-space: nowrap;
        }
        :global([data-theme="dark"] .prose td) {
          border-color: #4a5568;
          color: #f7fafc;
        }
        
        /* Responsive table styles */
        @media (max-width: 768px) {
          :global(.prose table) {
            font-size: 12px;
          }
          :global(.prose th),
          :global(.prose td) {
            padding: 6px 8px;
            font-size: 12px;
            line-height: 1.3;
            white-space: nowrap;
          }
          :global(.prose th) {
            font-weight: 700;
          }
        }
        
        @media (max-width: 480px) {
          :global(.prose table) {
            font-size: 11px;
          }
          :global(.prose th),
          :global(.prose td) {
            padding: 5px 6px;
            font-size: 11px;
            line-height: 1.2;
            white-space: nowrap;
          }
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
