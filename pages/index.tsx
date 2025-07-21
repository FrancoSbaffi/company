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

  // Function to generate highly diverse gradient for each article
  const getArticleGradient = (title: string, index: number) => {
    // Generate hash from title for consistency
    const titleHash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Very diverse and noisy gradient combinations - completely different styles
    const gradients = [
      // Radial explosion
      'radial(circle at 30% 40%, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%)',
      // Diagonal stripes effect
      'linear(45deg, #f72585 0%, #f72585 20%, #b5179e 20%, #b5179e 40%, #7209b7 40%, #7209b7 60%, #480ca8 60%, #480ca8 80%, #3a0ca3 80%)',
      // Conic gradient
      'conic(from 180deg at 50% 50%, #ff8500 0deg, #ffb700 72deg, #ff006e 144deg, #8338ec 216deg, #3a86ff 288deg, #ff8500 360deg)',
      // Multi-stop chaotic
      'linear(120deg, #a8ff78 0%, #78ffd6 15%, #ff9a8b 30%, #a8edea 45%, #fecda3 60%, #fda085 75%, #ff6b9d 90%, #c44569 100%)',
      // Inverted radial
      'radial(ellipse at top left, #000428 0%, #004e92 25%, #009ffd 50%, #00d2ff 75%, #ffffff 100%)',
      // Sharp angular
      'linear(225deg, #ff057c 0%, #ff057c 33%, #8d0bff 33%, #8d0bff 66%, #321575 66%)',
      // Sunset explosion
      'radial(circle at bottom right, #ff4081 0%, #ff6ec7 20%, #ffb74d 40%, #ffcc02 60%, #ff5722 80%, #e91e63 100%)',
      // Neon tech
      'linear(90deg, #00f5ff 0%, #00f5ff 25%, #ff00ff 25%, #ff00ff 50%, #ffff00 50%, #ffff00 75%, #00ff00 75%)',
      // Organic flow
      'radial(ellipse at center top, #667eea 0%, #764ba2 20%, #f093fb 40%, #f5576c 60%, #4facfe 80%, #00f2fe 100%)',
      // Dark matter
      'linear(45deg, #000000 0%, #434343 20%, #ff6b35 40%, #f7931e 60%, #000000 80%, #1a1a1a 100%)',
      // Electric storm
      'conic(from 45deg at 50% 50%, #ff00de 0deg, #00ff94 90deg, #0066ff 180deg, #ff006e 270deg, #ff00de 360deg)',
      // Volcanic
      'radial(circle at top center, #ff4757 0%, #ff6348 25%, #ff7675 50%, #fd79a8 75%, #fdcb6e 100%)',
      // Galaxy spiral
      'conic(from 90deg at 30% 70%, #667eea 0deg, #764ba2 60deg, #f093fb 120deg, #f5576c 180deg, #4facfe 240deg, #00f2fe 300deg, #667eea 360deg)',
      // Acid wash
      'linear(135deg, #667eea 0%, #667eea 10%, #764ba2 10%, #764ba2 20%, #f093fb 20%, #f093fb 30%, #f5576c 30%, #f5576c 40%, #4facfe 40%)',
      // Plasma field
      'radial(ellipse at bottom left, #ff006e 0%, #8338ec 33%, #3a86ff 66%, #06ffa5 100%)'
    ];
    
    // Use both hash and index to ensure maximum variety
    const gradientIndex = Math.abs(titleHash + index * 7) % gradients.length;
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
