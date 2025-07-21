import { FC } from "react";
import { HTMLChakraProps, chakra, Heading, Flex, useColorModeValue } from "@chakra-ui/react";

const Logo: FC<HTMLChakraProps<"div">> = (props) => {
  return (
    <Flex alignItems="center">
      <Heading
        ml="2"
        fontSize="md"
        color={useColorModeValue("brand.500", "white")}
        display={{ base: "none", md: "block" }}
      >
        Moneypilot
      </Heading>
    </Flex>
  );
};

export default Logo;
