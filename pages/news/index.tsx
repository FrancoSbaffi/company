import { GetStaticProps } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, NewsPost } from "@/lib/news";
import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { navbarRoutes } from "@/config";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function NewsIndex({ posts }: { posts: NewsPost[] }) {
  const hoverColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("#f8f8f8", "#1d1d1d");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "#2a2a2a");
  
  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar routes={navbarRoutes} />
      <Container maxW="5xl" pt={20} pb={10}>
        <Heading as="h1" mb={6} size="2xl" textAlign="center" color={headingColor}>
          NEWS
        </Heading>
        <Text mb={8} textAlign="center" color={textColor}>
          Insights, announcements, and product updates.
        </Text>
        {posts.length === 0 && <Text color={textColor}>No news yet.</Text>}
        {posts.map((post) => (
          <Box key={post.slug} mb={8} p={6} bg={cardBg} borderRadius="lg" shadow="sm">
            <Link href={`/news/${post.slug}`} passHref>
              <a style={{ textDecoration: 'none' }}>
                <Heading as="h2" size="lg" mb={2} cursor="pointer" _hover={{ color: hoverColor }} color={headingColor}>
                  {post.title}
                </Heading>
              </a>
            </Link>
            <Text fontSize="sm" color={dateColor} mb={2}>{post.date}</Text>
            <Text color={textColor}>{post.excerpt}</Text>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
