import { FC } from "react";
import {
  Box,
  BoxProps,
  Center,
  Container,
  Divider,
  Flex,
  Stack,
  useColorModeValue,
  // useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "@/components/logo";
import { SearchButton } from "@/components/search-button";
import { Link } from "@/components/link";
import { LinkBox } from "@/components/link-box";
import { ThemeMenu } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
// import { MobileDrawer, MobileDrawerButton } from "@/components/mobile-drawer";
import { Route } from "@/types";
import { siteConfig } from "@/config";

interface DocsNavbarProps extends BoxProps {
  routes: Route[];
}

const DocsNavbar: FC<DocsNavbarProps> = ({ routes, ...props }) => {
  const bgColor = useColorModeValue("white", "#1d1d1d");
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex="docked"
        bgColor={bgColor}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.50", "gray.700")}
        {...props}
      >
        <Container maxW="8xl" mx="auto" px="4">
          <Flex
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            py="3"
          >
            <Flex flex={{ base: "1", lg: "1" }} alignItems="center">
              {/* <MobileDrawerButton aria-label="Open drawer" onClick={onOpen} /> */}
              <LinkBox href="/">
                <Logo />
              </LinkBox>
            </Flex>
            <Box
              display={{ base: "none", lg: "flex" }}
              flex="1"
              justifyContent="center"
            >
              <SearchButton borderRadius="xl" />
            </Box>
            <Box
              display={{ base: "none", lg: "flex" }}
              flex="1"
              justifyContent="end"
              alignItems="center"
            >
              <Flex as="nav">
                <Stack as="ul" listStyleType="none" direction="row" spacing="6">
                  {routes.map((route) => (
                    <Box as="li" key={route.path}>
                      <Link
                        fontSize="sm"
                        fontWeight="semibold"
                        href={route.path}
                      >
                        {route.title}
                      </Link>
                    </Box>
                  ))}
                </Stack>
              </Flex>
              <Center height="6" pl="4">
                <Divider orientation="vertical" />
              </Center>
              <Flex pl="4" alignItems="center">
                <ThemeMenu />
              </Flex>
            </Box>
            <Box
              display={{ base: "flex", lg: "none" }}
              flex="1"
              justifyContent="end"
            >
              <MobileMenu routes={routes} />
            </Box>
          </Flex>
        </Container>
      </Box>
      {/* <MobileDrawer isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};

export default DocsNavbar;
