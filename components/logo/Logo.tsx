import { FC } from "react";
import { HTMLChakraProps, chakra, Heading, Flex } from "@chakra-ui/react";

const Logo: FC<HTMLChakraProps<"svg">> = (props) => {
  return (
    <Flex alignItems="center">
      <Heading
        ml="2"
        fontSize="md"
        color="brand.500"
        display={{ base: "none", md: "block" }}
      >
        Moneypilot
      </Heading>
    </Flex>
  );
};

export default Logo;
