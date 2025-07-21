import {
  Box,
  Flex,
  Heading,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchButton } from "@/components/search-button";
import { FC } from "react";

interface HeroProps extends StackProps {}

const Hero: FC<HeroProps> = () => {

  return (
    <Stack
      position="relative"
      maxW="container.md"
      py="12"
      mx="auto"
      spacing="6"
      align="center"
    >
      <Heading
        as="h1"
        fontSize={{ base: "6xl", md: "7xl" }}
        color={useColorModeValue("gray.700", "white")}
        textAlign="center"
        textTransform="uppercase"
        lineHeight="0.9"
        zIndex="1"
        blendMode="luminosity"
      >
        构建更智能的
      </Heading>
      <Heading
        fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
        fontWeight="black"
        textAlign="center"
        textTransform="uppercase"
        lineHeight="0.9"
        zIndex="1"
        blendMode="luminosity"
        color={useColorModeValue("purple.600", "purple.300")}
        mt="-2"
      >
        金融科技解决方案
      </Heading>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="medium"
        color={useColorModeValue("gray.600", "white")}
        textAlign="center"
        letterSpacing="tighter"
        zIndex="1"
        blendMode="luminosity"
      >
        通过实时数据、交易工具和现代API为您的金融科技项目赋能。
        构建更快、更智能、更安全的金融产品。
      </Text>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        blendMode="luminosity"
        zIndex="1"
      >
        <SearchButton
          w="80"
          display="flex"
          size="lg"
          shadow="lg"
          border="1px"
          borderColor={useColorModeValue("white", "whiteAlpha.300")}
          borderRadius="lg"
        />
      </Flex>
      <Box
        boxSize="72"
        position="absolute"
        top="0"
        left="0"
        bg={useColorModeValue("gray.200", "#333333")}
        borderRadius="full"
        filter="blur(140px)"
      />
      <Box
        boxSize="72"
        position="absolute"
        bottom="0"
        right="0"
        bg={useColorModeValue("gray.300", "#444444")}
        borderRadius="full"
        filter="blur(140px)"
      />
    </Stack>
  );
};

export default Hero;
