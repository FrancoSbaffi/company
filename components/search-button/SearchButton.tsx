import { FC } from "react";
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useKBar } from "kbar";
import { RiSearchLine } from "react-icons/ri";

export const SearchButton: FC<ButtonProps> = (props) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const { query } = useKBar();

  const handleClick = () => {
    query.toggle();
  };

  return (
    <Button
      w="full"
      px="3"
      py="3"
      color={textColor}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      boxShadow={useColorModeValue("sm", "none")}
      borderRadius="lg"
      _hover={{
        bg: hoverBg,
        borderColor: useColorModeValue("gray.300", "gray.500"),
        transform: "translateY(-1px)",
        boxShadow: useColorModeValue("md", "none"),
      }}
      _active={{
        transform: "translateY(0px)",
      }}
      transition="all 0.2s"
      onClick={handleClick}
      {...props}
    >
      <Icon boxSize="5" as={RiSearchLine} />
      <Text ml="2" fontSize="sm">
        搜索...
      </Text>
      <Box as="span" ml="auto">
        <Flex
          as="kbd"
          fontSize="sm"
          bg={useColorModeValue("gray.200", "gray.600")}
          color={useColorModeValue("gray.700", "gray.200")}
          borderRadius="md"
          px="2"
          py="1"
          boxShadow="none"
          border="1px"
          borderColor={useColorModeValue("gray.300", "gray.500")}
        >
          <Text
            as="abbr"
            title="Command"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            mr="1"
            color={useColorModeValue("gray.700", "gray.200")}
            sx={{ "&[title]": { textDecoration: "none" } }}
          >
            ⌘
          </Text>
          <Text color={useColorModeValue("gray.700", "gray.200")}>K</Text>
        </Flex>
      </Box>
    </Button>
  );
};

export const MobileSearchButton: FC<IconButtonProps> = (props) => {
  const { query } = useKBar();

  const handleClick = () => {
    query.toggle();
  };

  return (
    <IconButton
      size="sm"
      bg={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.600", "gray.300")}
      _hover={{
        bg: useColorModeValue("gray.200", "gray.600"),
      }}
      boxShadow="none"
      borderRadius="full"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      mr="3"
      icon={<Icon w="5" h="5" color={useColorModeValue("gray.600", "gray.300")} as={RiSearchLine} />}
      onClick={handleClick}
      {...props}
    />
  );
};
