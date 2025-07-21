import { GetStaticProps } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getAllPosts, NewsPost } from "@/lib/news";
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  useColorModeValue, 
  SimpleGrid, 
  Badge,
  VStack,
  HStack
} from "@chakra-ui/react";
import { navbarRoutes } from "@/config";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default function NewsIndex({ posts }: { posts: NewsPost[] }) {
  const bgColor = useColorModeValue("white", "#1d1d1d");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.900", "gray.100");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "#1a1a1a");
  const cardHoverBg = useColorModeValue("gray.50", "#222222");
  const shadowColor = useColorModeValue("lg", "dark-lg");
  const borderColor = useColorModeValue("gray.200", "#333333");
  const hoverBorderColor = useColorModeValue("gray.300", "#444444");
  const arrowBg = useColorModeValue("purple.500", "purple.400");
  const arrowColor = useColorModeValue("white", "white");
  const arrowHoverBg = useColorModeValue("purple.600", "purple.500");
  const badgeBg = useColorModeValue("gray.700", "gray.300");
  const badgeColor = useColorModeValue("white", "gray.800");
  
  const getPlaceholderImage = (title: string, index: number) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    ];
    return gradients[index % gradients.length];
  };
  
  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar routes={navbarRoutes} />
      <Container maxW="8xl" pt={8} pb={10} px="4">
        <VStack align="start" spacing={2} mb={12} pl={0}>
          <Heading 
            as="h1" 
            size="2xl" 
            fontWeight="bold"
            color={headingColor}
            textAlign="left"
            lineHeight="1.2"
          >
            文章
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="left" maxW="2xl" mt={1}>
            洞察、公告和产品更新。
          </Text>
        </VStack>

        {posts.length === 0 ? (
          <VStack spacing={4} py={12}>
            <Text color={textColor} textAlign="center" fontSize="lg">
              暂无文章。
            </Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 3 }} spacing={8} maxW="full">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/news/${post.slug}`} passHref>
                <Box
                  as="a"
                  display="block"
                  bg={cardBg}
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow={shadowColor}
                  border="1px solid"
                  borderColor={borderColor}
                  transition="all 0.3s ease"
                  cursor="pointer"
                  textDecoration="none"
                  role="group"
                  _hover={{
                    transform: "translateY(-8px)",
                    shadow: "2xl",
                    bg: cardHoverBg,
                    borderColor: hoverBorderColor,
                  }}
                  h="420px"
                  position="relative"
                >
                  <Box
                    h="260px"
                    bg={getPlaceholderImage(post.title, index)}
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="blackAlpha.300"
                      borderRadius="2xl 2xl 0 0"
                    />
                    <Text
                      color="white"
                      fontSize="5xl"
                      fontWeight="bold"
                      textShadow="2px 2px 8px rgba(0,0,0,0.7)"
                      textAlign="center"
                      px={4}
                      position="relative"
                    >
                      📰
                    </Text>
                  </Box>
                  
                  <VStack align="stretch" p={6} spacing={3} h="160px" position="relative">
                    <VStack align="start" spacing={2} flex={1}>
                      <HStack justify="space-between" w="full">
                        <Badge
                          bg={badgeBg}
                          color={badgeColor}
                          borderRadius="md"
                          px={3}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                        >
                          文章
                        </Badge>
                        <Text fontSize="sm" color={dateColor}>
                          {post.date}
                        </Text>
                      </HStack>
                      
                      <Heading 
                        as="h3" 
                        size="md" 
                        color={headingColor} 
                        noOfLines={2} 
                        lineHeight={1.2}
                        fontWeight="bold"
                      >
                        {post.title}
                      </Heading>
                      
                      <Text color={textColor} fontSize="sm" noOfLines={2}>
                        {post.excerpt}
                      </Text>
                    </VStack>
                    
                    {/* Flecha posicionada en la esquina inferior derecha */}
                    <Box
                      position="absolute"
                      bottom="16px"
                      right="16px"
                      w="32px"
                      h="32px"
                      borderRadius="full"
                      bg={arrowBg}
                      color={arrowColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="16px"
                      fontWeight="bold"
                      transition="all 0.3s ease"
                      _groupHover={{
                        bg: arrowHoverBg,
                        transform: "translateX(4px)",
                        shadow: "lg"
                      }}
                    >
                      →
                    </Box>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
