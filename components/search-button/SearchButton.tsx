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
  const textColor = useColorModeValue("gray.500", "gray.400");
  const bgColor = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const borderColor = useColorModeValue("whiteAlpha.500", "whiteAlpha.200");
  const hoverBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");
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
      boxShadow={useColorModeValue("lg", "0 4px 6px rgba(0, 0, 0, 0.3)")}
      borderRadius="lg"
      _hover={{
        bg: hoverBg,
        borderColor: useColorModeValue("whiteAlpha.600", "whiteAlpha.300"),
        transform: "translateY(-1px)",
        boxShadow: useColorModeValue("xl", "0 8px 12px rgba(0, 0, 0, 0.4)"),
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
          bg={useColorModeValue("gray.100", "gray.700")}
          borderRadius="md"
          px="2"
          py="1"
          boxShadow="sm"
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Text
            as="abbr"
            title="Command"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            mr="1"
            sx={{ "&[title]": { textDecoration: "none" } }}
          >
            ⌘
          </Text>
          <Text>K</Text>
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
      colorScheme="whiteAlpha"
      boxShadow="sm"
      borderRadius="full"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      mr="3"
      icon={<Icon w="5" h="5" color="gray.400" as={RiSearchLine} />}
      onClick={handleClick}
      {...props}
    />
  );
};
