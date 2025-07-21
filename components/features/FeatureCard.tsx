import { FC, ReactNode } from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface FeatureCardProps extends BoxProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  ...props
}) => {
  return (
    <Box
      position="relative"
      bgGradient={useColorModeValue(
        "linear(104.28deg, purple.200 1.24%, purple.500 32.96%, purple.200 68.22%)",
        "linear(104.28deg, rgb(45, 45, 45) 1.24%, rgb(80, 80, 80) 32.96%, rgb(45, 45, 45) 68.22%)"
      )}
      borderRadius="3xl"
      {...props}
    >
      <Box
        position="absolute"
        inset="1px"
        bgColor={useColorModeValue("white", "#1d1d1d")}
        borderRadius="inherit"
      />
      <Stack position="relative" p="6" spacing="4">
        <Flex
          boxSize="10"
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          bgColor={useColorModeValue("gray.50", "#2a2a2a")}
          color={useColorModeValue("gray.500", "gray.300")}
        >
          {icon}
        </Flex>
        <Heading
          as="h3"
          fontSize="lg"
          color={useColorModeValue("gray.600", "white")}
        >
          {title}
        </Heading>
        <Text color={useColorModeValue("gray.500", "gray.400")}>{description}</Text>
      </Stack>
    </Box>
  );
};

export default FeatureCard;
