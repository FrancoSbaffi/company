import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading as ChakraHeading,
  ListItem,
  OrderedList,
  BoxProps,
  chakra,
  Divider,
  useColorModeValue,
  Icon,
  Link,
} from "@chakra-ui/react";
import { RiArrowUpLine } from "react-icons/ri";
import { Heading } from "@/types";

export interface TOCProps {
  headings: Heading[];
}

export const TOC: FC<TOCProps & BoxProps> = ({ headings, ...props }) => {
  const [activeHeading, setActiveHeading] = useState("");
  
  // Color values outside of callbacks
  const headingColor = useColorModeValue("gray.600", "gray.300");
  const activeTextColor = useColorModeValue("gray.800", "white");
  const inactiveTextColor = useColorModeValue("gray.600", "gray.400");
  const hoverTextColor = useColorModeValue("gray.800", "white");
  const dotColor = useColorModeValue("gray.700", "gray.300");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      headings.map((heading) => {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top < 84) {
          current = heading.id;
        }
        setActiveHeading(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  return (
    <>
      <Box
        as="nav"
        aria-label="TOC"
        display={{ base: "none", xl: "block" }}
        position="fixed"
        top="6rem"
        bottom="0"
        right="max(0px, calc(50% - 45rem))"
        w="full"
        maxW="16rem"
        overflowY="auto"
        pb="10"
        pr="4"
        {...props}
      >
        <Box 
          pt="6" 
          pb="4" 
          px="4"
          bg={useColorModeValue("rgba(255,255,255,0.95)", "rgba(42,42,42,0.95)")}
          backdropFilter="blur(12px)"
          borderRadius="xl"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          shadow="xl"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "xl",
            background: useColorModeValue(
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
            ),
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          <ChakraHeading
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            color={headingColor}
            mb="4"
          >
            本页内容
          </ChakraHeading>
          <OrderedList listStyleType="none" spacing="2">
            {headings.map(({ id, text, level }) => (
              <ListItem
                key={id}
                title={text}
                position="relative"
                display="flex"
                alignItems="center"
                ml={level === "h3" ? "4" : "0"}
              >
                {
                <Link
                  href={`#${id}`}
                  fontSize="sm"
                  fontWeight={id === activeHeading ? "bold" : "normal"}
                  color={id === activeHeading ? activeTextColor : inactiveTextColor}
                  _hover={{ textDecor: "none", color: hoverTextColor }}
                  position="relative"
                  display="block"
                  py="1"
                  px="2"
                  borderRadius="md"
                  _after={{
                    content: "''",
                    w: "1.5",
                    h: "1.5",
                    position: "absolute",
                    top: "50%",
                    left: "-6",
                    transform: "translateY(-50%)",
                    borderRadius: "full",
                    bgColor: dotColor,
                    transition: "opacity 0.25s ease",
                    opacity: id === activeHeading ? "1" : "0",
                  }}
                >
                  {text}
                </Link>
                }
              </ListItem>
            ))}
          </OrderedList>
          <Divider orientation="horizontal" my="4" />
          <Button
            size="sm"
            variant="link"
            onClick={() => window.scrollTo(0, 0)}
            _hover={{
              textDecoration: "none",
            }}
            w="full"
            justifyContent="flex-start"
          >
            <Icon as={RiArrowUpLine} mr="2" boxSize="4" />
            返回顶部
          </Button>
        </Box>
      </Box>
    </>
  );
};
