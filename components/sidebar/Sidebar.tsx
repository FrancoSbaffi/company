import { FC } from "react";
import {
  Box,
  Container,
  ContainerProps,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import { Section, WithChildren } from "@/types";

interface SidebarProps extends WithChildren, ContainerProps {
  sections: Section[];
}

const Sidebar: FC<SidebarProps> = ({ sections, ...props }) => {
  const bgColor = useColorModeValue("white", "#1d1d1d");
  const gradientColors = useColorModeValue(
    "linear(to-b, rgb(255,255,255), rgba(255,255,255, 0))",
    "linear(to-b, rgb(29, 29, 29), rgba(29, 29, 29, 0))"
  );

  return (
    <Container
      display={{ base: "none", lg: "block" }}
      position="fixed"
      left="max(0px, calc(50% - 45rem))"
      w="full"
      maxW="18rem"
      h="full"
      maxH="calc(100vh - 4rem)"
      bg={bgColor}
      {...props}
    >
      <Box
        h="8"
        bgGradient={gradientColors}
        position="absolute"
        top="0"
        insetX="0"
        zIndex="docked"
      />
      <SidebarContent sections={sections} h="full" overflowY="auto" py="6" />
    </Container>
  );
};

export default Sidebar;
