import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, getPostBySlug, NewsPost } from "@/lib/news";
import ReactMarkdown from "react-markdown";
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
      <Box minH="100vh" pt={20} bg="white" color="black">
        <Container maxW="2xl">
          <Heading as="h1" textAlign="center" mb={6} size="2xl">
            {post.title}
          </Heading>
          <Text fontSize="md" mb={8} textAlign="center" color="gray.600">
            {post.date}
          </Text>
          <Box
            fontSize="lg"
            bg="transparent"
            borderRadius="xl"
            p={0}
          >
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </Box>
        </Container>
      </Box>
    </>
  );
}
