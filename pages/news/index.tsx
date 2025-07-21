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
  HStack,
  Button,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { navbarRoutes } from "@/config";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

// Categorías disponibles (similar a la segunda imagen)
const categories = [
  { id: "all", label: "全部", color: "gray" },
  { id: "thought-leadership", label: "思想领导力", color: "purple" },
  { id: "news", label: "新闻", color: "blue" },
  { id: "comment", label: "评论", color: "green" },
  { id: "guides", label: "指南", color: "orange" },
  { id: "interviews", label: "访谈", color: "red" },
  { id: "innovation", label: "创新挑战", color: "teal" },
];

export default function NewsIndex({ posts }: { posts: NewsPost[] }) {
  const bgColor = useColorModeValue("#f8f8f8", "#1d1d1d");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "#2a2a2a");
  const cardHoverBg = useColorModeValue("gray.50", "#333333");
  const shadowColor = useColorModeValue("lg", "dark-lg");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.500");
  const filterBg = useColorModeValue("white", "#2a2a2a");
  
  // Función para generar imagen placeholder basada en el título
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
      <Container maxW="7xl" pt={20} pb={10}>
        {/* Header Section */}
        <VStack spacing={6} mb={12}>
          <Heading as="h1" size="2xl" textAlign="center" color={headingColor}>
            文章
          </Heading>
          <Text fontSize="lg" textAlign="center" color={textColor} maxW="2xl">
            洞察、公告和产品更新。
          </Text>
        </VStack>

        {/* Category Filter Pills - Comentado por ahora */}
        {/*
        <Box mb={8} p={6} bg={filterBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
          <Wrap spacing={3} justify="center">
            {categories.map((category) => (
              <WrapItem key={category.id}>
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme={category.color}
                  borderRadius="full"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-1px)",
                  }}
                >
                  {category.label}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        */}
        
        {/* Articles Grid */}
        {posts.length === 0 ? (
          <VStack spacing={4} py={12}>
            <Text color={textColor} textAlign="center" fontSize="lg">
              暂无文章。
            </Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {posts.map((post, index) => {
              return (
                <Link key={post.slug} href={`/news/${post.slug}`} passHref>
                  <Box
                    as="a"
                    display="block"
                    bg={cardBg}
                    borderRadius="xl"
                    overflow="hidden"
                    shadow={shadowColor}
                    border="1px solid"
                    borderColor={borderColor}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    textDecoration="none"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "xl",
                      bg: cardHoverBg,
                      borderColor: hoverBorderColor,
                    }}
                    h="full"
                  >
                    {/* Imagen placeholder con gradiente */}
                    <Box
                      h="200px"
                      bg={getPlaceholderImage(post.title, index)}
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* Overlay para mejorar legibilidad */}
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.200"
                      />
                      <Text
                        color="white"
                        fontSize="4xl"
                        fontWeight="bold"
                        textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                        textAlign="center"
                        px={4}
                        position="relative"
                      >
                        📰
                      </Text>
                    </Box>
                    
                    {/* Contenido de la card */}
                    <VStack align="stretch" p={6} spacing={3} h="calc(100% - 200px)">
                      <HStack justify="space-between" align="start">
                        <Badge
                          colorScheme="purple"
                          variant="subtle"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="xs"
                          textTransform="uppercase"
                        >
                          文章
                        </Badge>
                        <Text fontSize="sm" color={dateColor} flexShrink={0}>
                          {post.date}
                        </Text>
                      </HStack>
                      
                      <Heading as="h3" size="md" color={headingColor} noOfLines={2} lineHeight={1.3}>
                        {post.title}
                      </Heading>
                      
                      <Text color={textColor} fontSize="sm" noOfLines={3} flex={1}>
                        {post.excerpt}
                      </Text>
                      
                      {/* Indicador de "leer más" */}
                      <HStack justify="flex-end" align="center" pt={2}>
                        <Text
                          fontSize="sm"
                          color="purple.500"
                          fontWeight="semibold"
                          _hover={{ color: "purple.600" }}
                        >
                          →
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
