import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, getPostBySlug } from "@/lib/news";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function getStaticPaths() {
  try {
    const posts = getAllPosts();
    return {
      paths: posts.map((p) => ({ params: { slug: p.slug } })),
      fallback: false,
    };
  } catch (error) {
    console.error('Error in getStaticPaths for news:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps for news post:', error);
    return {
      notFound: true,
    };
  }
}

export default function NewsPostPage({ post }: { post: any }) {
  const colorTitle = useColorModeValue("gray.900", "white");
  const colorMeta = useColorModeValue("gray.600", "gray.300");
  const colorBody = useColorModeValue("gray.800", "gray.200");

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue(
        "radial-gradient(ellipse at 50% 30%, #e9e3fa 0%, #fff 70%)",
        "radial-gradient(ellipse at 50% 30%, #392c5c 0%, #222632 65%, #191c25 100%)"
      )}
    >
      <Navbar routes={[{ path: "/", title: "Home" }, { path: "/news", title: "News" }]} />
      <Container maxW="3xl" pt={20} pb={24}>
        {!post ? (
          <Text textAlign="center">Post not found</Text>
        ) : !post.content ? (
          <Text textAlign="center">Post content not available</Text>
        ) : (
          <>
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              fontWeight="extrabold"
              mb={3}
              color={colorTitle}
              letterSpacing="-2px"
            >
              {post.title}
            </Heading>
            <Text
              textAlign="center"
              color={colorMeta}
              mb={10}
              fontSize="md"
            >
              {post.date}
            </Text>
            <Box
              className="markdown-body"
              fontSize={{ base: "lg", md: "xl" }}
              color={colorBody}
              px={{ base: 0, md: 10 }}
              sx={{
                "h1, h2, h3": { fontWeight: "bold", mt: 8, mb: 2 },
                "ul": { pl: 5, mb: 4 },
                "li": { mb: 2 },
                "p": { mb: 4, lineHeight: 1.8 },
                "a": { color: "#7f48ff", textDecoration: "underline" },
                "pre": { bg: "#23223a", color: "#fff", borderRadius: "md", p: 4, fontSize: "sm", mb: 4, overflowX: "auto" },
                "code": { bg: "#f2eaff", color: "#7f48ff", px: "1.5", borderRadius: "md" }
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
