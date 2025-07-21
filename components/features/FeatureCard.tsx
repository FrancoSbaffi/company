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
      bgColor={useColorModeValue("gray.50", "whiteAlpha.100")}
      border="1px"
      borderColor={useColorModeValue("gray.100", "whiteAlpha.200")}
      backdropFilter="blur(10px)"
      boxShadow={useColorModeValue("sm", "0 4px 6px rgba(0, 0, 0, 0.3)")}
      borderRadius="3xl"
      {...props}
    >
      <Stack position="relative" p="6" spacing="4">
        <Flex
          boxSize="10"
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          bgColor={useColorModeValue("gray.100", "whiteAlpha.200")}
          color={useColorModeValue("gray.600", "gray.300")}
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
