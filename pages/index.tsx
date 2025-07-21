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
import { getNewsDataForSearch } from "@/lib/search-data";

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

  // Function to generate highly diverse gradient for each article
  const getArticleGradient = (title: string, index: number) => {
    // Generate hash from title for consistency
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Diverse smooth gradients - all different styles and colors
    const gradients = [
      // Purple ocean
      'linear(135deg, #667eea 0%, #764ba2 50%, #8e44ad 100%)',
      // Sunset fire
      'linear(45deg, #ff6b35 0%, #f7931e 25%, #ff4757 50%, #c44569 75%, #8e44ad 100%)',
      // Ocean depths
      'linear(180deg, #0066ff 0%, #00aaff 25%, #00d4ff 50%, #40e0d0 75%, #7fffd4 100%)',
      // Forest mist
      'linear(90deg, #134e5e 0%, #71b280 30%, #a8e6cf 60%, #dcedc8 90%, #f1f8e9 100%)',
      // Pink galaxy
      'linear(225deg, #ff006e 0%, #8338ec 20%, #3a86ff 40%, #06ffa5 60%, #ffbe0b 80%, #fb5607 100%)',
      // Electric lime
      'linear(315deg, #39ff14 0%, #00ff94 25%, #00f5ff 50%, #0066ff 75%, #8000ff 100%)',
      // Golden hour
      'linear(60deg, #ff9a56 0%, #ffad56 20%, #ffc056 40%, #ffd356 60%, #ffe66d 80%, #fff3a0 100%)',
      // Deep space
      'linear(270deg, #000428 0%, #004e92 25%, #009ffd 50%, #00d2ff 75%, #ffffff 100%)',
      // Cherry blossom
      'linear(120deg, #ff9a9e 0%, #fecfef 20%, #fecfef 40%, #ff8a80 60%, #ff5722 80%, #e91e63 100%)',
      // Emerald waves
      'linear(200deg, #11998e 0%, #38ef7d 30%, #43e97b 60%, #a8ff78 90%, #ccff90 100%)',
      // Volcanic ash
      'linear(45deg, #2c3e50 0%, #34495e 20%, #5d6d7e 40%, #85929e 60%, #d5dbdb 80%, #ecf0f1 100%)',
      // Neon dreams
      'linear(135deg, #ff00de 0%, #ff006e 20%, #8338ec 40%, #3a86ff 60%, #06ffa5 80%, #ffbe0b 100%)',
      // Arctic aurora
      'linear(180deg, #667eea 0%, #764ba2 15%, #a8edea 30%, #fed6e3 45%, #d299c2 60%, #fef9d7 75%, #89f7fe 90%, #66a6ff 100%)',
      // Desert sunset
      'linear(300deg, #ff4757 0%, #ff6348 15%, #ff7675 30%, #fd79a8 45%, #fdcb6e 60%, #e17055 75%, #d63031 90%, #74b9ff 100%)',
      // Mystic forest
      'linear(90deg, #2d3436 0%, #636e72 15%, #00b894 30%, #00cec9 45%, #55a3ff 60%, #a29bfe 75%, #fd79a8 90%, #fdcb6e 100%)'
    ];
    
    // Use both hash and index to ensure maximum variety
    const gradientIndex = Math.abs(titleHash + index * 7) % gradients.length;
    return gradients[gradientIndex];
  };
  
  // Get news data from the posts passed as props
  const newsData = posts.map(post => ({
    slug: post.slug,
    title: post.title
  }));
  
  return (
    <DefaultLayout newsData={newsData}>
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
