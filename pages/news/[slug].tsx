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
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Box 
        minH="100vh" 
        pt={20}
        bg="radial-gradient(ellipse at 20% 20%, #e9e3fa 0%, #fff 70%)"
      >
        <Container maxW="2xl">
          <Heading 
            as="h1" 
            textAlign="center" 
            mb={6} 
            size="2xl"
            color="gray.800"
          >
            {post.title}
          </Heading>
          <Text 
            fontSize="md" 
            mb={8} 
            textAlign="center" 
            color="gray.600"
          >
            {post.date}
          </Text>
          <Box
            bg="white"
            borderRadius="xl"
            p={8}
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <div 
              style={{ 
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#2D3748'
              }}
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.+)/gm, '<h1 style="font-size: 28px; font-weight: bold; margin: 24px 0 16px 0; color: #1A202C;">$1</h1>')
                  .replace(/^## (.+)/gm, '<h2 style="font-size: 24px; font-weight: bold; margin: 20px 0 12px 0; color: #2D3748;">$1</h2>')
                  .replace(/^### (.+)/gm, '<h3 style="font-size: 20px; font-weight: bold; margin: 16px 0 8px 0; color: #4A5568;">$1</h3>')
                  .replace(/^\- (.+)/gm, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
                  .replace(/\n\n/g, '</p><p style="margin: 16px 0;">')
                  .replace(/^(.+)$/gm, '<p style="margin: 16px 0;">$1</p>')
                  .replace(/<p[^>]*><li/g, '<ul style="margin: 16px 0; padding-left: 20px;"><li')
                  .replace(/<\/li><\/p>/g, '</li></ul>')
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
