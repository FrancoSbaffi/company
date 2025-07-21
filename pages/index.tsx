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

  // Function to generate unique gradient for each article
  const getArticleGradient = (title: string, index: number) => {
    // Generate hash from title for consistency
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Minimalist gradient combinations
    const gradients = [
      'linear(135deg, #667eea 0%, #764ba2 100%)',
      'linear(135deg, #f093fb 0%, #f5576c 100%)',
      'linear(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear(135deg, #fa709a 0%, #fee140 100%)',
      'linear(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear(135deg, #d299c2 0%, #fef9d7 100%)',
      'linear(135deg, #89f7fe 0%, #66a6ff 100%)',
      'linear(135deg, #fdbb2d 0%, #22c1c3 100%)',
      'linear(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    
    // Use both hash and index to ensure variety
    const gradientIndex = Math.abs(titleHash + index) % gradients.length;
    return gradients[gradientIndex];
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
                bgGradient={getArticleGradient(post.title, index)}
              />
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
