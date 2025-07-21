import {
  AspectRatio,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { DefaultLayout } from "@/layouts";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Tweets } from "@/components/tweets";
import { getAllPosts, NewsPost } from "@/lib/news";

interface HomeProps {
  posts: NewsPost[];
}

const Home = ({ posts }: HomeProps) => {
  // Get the latest 4 posts
  const latestPosts = posts.slice(0, 4);
  
  // Define color mode values
  const textColor = useColorModeValue("gray.600", "gray.400");
  const buttonBg = useColorModeValue("#1d1d1d", "#f7fafc");
  const buttonColor = useColorModeValue("#ffffff", "#1d1d1d");
  const buttonHoverBg = useColorModeValue("#2a2a2a", "#e2e8f0");

  // Function to generate consistent visual for each article
  const getArticleVisual = (title: string, index: number) => {
    // Generate consistent colors based on title
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colors = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'], 
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#a8edea', '#fed6e3']
    ];
    
    const colorPair = colors[Math.abs(titleHash) % colors.length];
    return {
      gradient: `linear(45deg, ${colorPair[0]}, ${colorPair[1]})`,
      letter: title.charAt(0).toUpperCase(),
      number: index + 1
    };
  };
  return (
    <DefaultLayout>
      <Hero />
      <Features mt="6" />
      <Section
        mt="12"
        title="深度市场洞察，实时资讯更新"
        subtitle="访问我们的最新文章"
        text="获取最新的市场分析、投资策略和财经资讯，助您在瞬息万变的金融市场中保持领先优势。"
      />
      {/* TODO: Make this component. */}
      <Stack spacing="10">
        {latestPosts.map((post, index) => (
          <Stack
            key={post.slug}
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            spacing={{ base: "4", md: "16" }}
          >
            <AspectRatio
              w="full"
              ratio={4 / 3}
              order={{ base: 0, md: index % 2 === 1 ? 1 : 0 }}
              borderRadius="3xl"
              overflow="hidden"
            >
              <Box
                bgGradient={getArticleVisual(post.title, index).gradient}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Text
                  fontSize="8xl"
                  fontWeight="bold"
                  color="white"
                  opacity={0.3}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  {getArticleVisual(post.title, index).letter}
                </Text>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="white"
                  zIndex={1}
                >
                  {getArticleVisual(post.title, index).number}
                </Text>
              </Box>
            </AspectRatio>
            <Stack
              w="full"
              maxW={{ base: "full", md: "xl" }}
              spacing={{ base: "3", md: "4" }}
            >
              <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
                {post.title}
              </Heading>
              <Stack color={textColor}>
                <Text fontSize={{ base: "md", md: "xl" }}>
                  <b>发布日期:</b> {post.date}
                </Text>
                <Text fontSize={{ base: "md", md: "xl" }}>
                  {post.excerpt}
                </Text>
              </Stack>
              <Box pt="2">
                <Link href={`/news/${post.slug}`} passHref>
                  <Button
                    as="a"
                    size="lg"
                    bg={buttonBg}
                    color={buttonColor}
                    _hover={{
                      bg: buttonHoverBg,
                    }}
                  >
                    阅读全文
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Tweets mt="12" />
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
