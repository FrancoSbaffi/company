import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts } from "@/lib/news";

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

interface NewsPageProps {
  posts: Post[];
}

export default function NewsPage({ posts }: NewsPageProps) {
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.85)",
    "rgba(28, 32, 43, 0.80)"
  );
  const borderColor = useColorModeValue(
    "rgba(160, 100, 255, 0.10)",
    "rgba(160, 100, 255, 0.10)"
  );
  const colorTitle = useColorModeValue("gray.800", "white");
  const colorSub = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      minH="100vh"
      w="100vw"
      pos="relative"
      bg={useColorModeValue(
        "radial-gradient(ellipse at 20% 20%, #e9e3fa 0%, #fff 70%)",
        "radial-gradient(ellipse at 15% 10%, #392c5c 0%, #222632 65%, #191c25 100%)"
      )}
      _before={{
        content: '""',
        position: "fixed",
        top: 0,
        left: 0,
        w: "100vw",
        h: "100vh",
        zIndex: -1,
        bg: useColorModeValue(
          "radial-gradient(circle at 20% 25%, #cbb5f6 0%, #fff 70%)",
          "radial-gradient(circle at 15% 10%, #3d276d 0%, #242632 65%, #191c25 100%)"
        ),
      }}
    >
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Container maxW="4xl" pt={20}>
        <Heading
          as="h1"
          size="3xl"
          textAlign="center"
          fontWeight="extrabold"
          color={colorTitle}
        >
          NEWS
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          mt={4}
          color={colorSub}
          textAlign="center"
        >
          Insights, announcements, and product updates.
        </Text>

        <SimpleGrid columns={1} spacing={8} mt={14}>
          {posts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.slug} passHref legacyBehavior>
              <Box
                as="a"
                borderRadius="2xl"
                px={[5, 8]}
                py={[7, 8]}
                bg={useColorModeValue(
                  "linear-gradient(135deg, rgba(245,233,255,0.82) 0%, rgba(251,234,242,0.84) 100%)",
                  "linear-gradient(135deg, rgba(51, 45, 71, 0.74) 0%, rgba(38, 34, 51, 0.85) 100%)"
                )}
                border="1.5px solid"
                borderColor={useColorModeValue("#F2E8FA", "#2c273b")}
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
                transition="box-shadow 0.18s"
                cursor="pointer"
                _hover={{ boxShadow: "none", textDecoration: "none" }}
                _active={{ boxShadow: "none" }}
              >
                <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={2} color={colorTitle}>
                  {post.title}
                </Heading>
                <Text fontSize="md" color={colorSub} mb={2}>
                  {post.date}
                </Text>
                <Text fontSize="lg" color={colorSub}>
                  {post.excerpt}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
