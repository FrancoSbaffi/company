import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, getPostBySlug } from "@/lib/news";
import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  return { props: { post } };
};

type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export default function NewsPostPage({ post }: { post: Post }) {
  return (
    <>
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Box
        minH="100vh"
        bg={useColorModeValue(
          "radial-gradient(ellipse at 20% 20%, #e9e3fa 0%, #fff 70%)",
          "radial-gradient(ellipse at 15% 10%, #392c5c 0%, #222632 65%, #191c25 100%)"
        )}
        pt={20}
      >
        <Container maxW="2xl">
          <Heading as="h1" textAlign="center" mb={6} size="2xl">
            {post.title}
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="md" mb={8} textAlign="center">
            {post.date}
          </Text>
          <Box
            className="prose"
            color={useColorModeValue("gray.800", "gray.200")}
            fontSize="lg"
            bg="transparent"
            borderRadius="xl"
            p={0}
            sx={{ h1: { mt: 8 }, h2: { mt: 6 }, a: { color: "purple.500" } }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Box>
        </Container>
      </Box>
    </>
  );
}
