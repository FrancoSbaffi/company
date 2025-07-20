import { GetStaticProps } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, NewsPost } from "@/lib/news";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function NewsIndex({ posts }: { posts: NewsPost[] }) {
  return (
    <>
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Container maxW="2xl" pt={20}>
        <Heading as="h1" mb={6} size="2xl" textAlign="center">
          NEWS
        </Heading>
        <Text mb={8} textAlign="center">
          Insights, announcements, and product updates.
        </Text>
        {posts.length === 0 && <Text>No news yet.</Text>}
        {posts.map((post) => (
          <Box key={post.slug} mb={8}>
            <Link href={`/news/${post.slug}`} passHref>
              <Heading as="h2" size="lg" mb={2}>{post.title}</Heading>
            </Link>
            <Text fontSize="sm" color="gray.500" mb={2}>{post.date}</Text>
            <Text>{post.excerpt}</Text>
          </Box>
        ))}
      </Container>
    </>
  );
}
