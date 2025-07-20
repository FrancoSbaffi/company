import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "@/components/navbar/Navbar";
import { getPostBySlug, getAllPosts } from "@/lib/news";
import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";

type PostPreview = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostPreview[] = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  return { props: { post: post ?? null } };
};

export default function NewsPostPage({ post }: { post: Post | null }) {
  const bg = useColorModeValue(
    "radial-gradient(ellipse at 20% 20%, #e9e3fa 0%, #fff 70%)",
    "radial-gradient(ellipse at 15% 10%, #392c5c 0%, #222632 65%, #191c25 100%)"
  );
  const dateColor = useColorModeValue("gray.600", "gray.400");
  const proseColor = useColorModeValue("gray.800", "gray.200");

  if (!post) {
    return (
      <Container>
        <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
        <Heading>Error: Post not found</Heading>
        <Text>Sorry, this news article does not exist.</Text>
      </Container>
    );
  }

  return (
    <>
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Box minH="100vh" bg={bg} pt={20}>
        <Container maxW="2xl">
          <Heading as="h1" textAlign="center" mb={6} size="2xl">
            {post.title}
          </Heading>
          <Text color={dateColor} fontSize="md" mb={8} textAlign="center">
            {post.date}
          </Text>
          <Box
            className="prose"
            color={proseColor}
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
