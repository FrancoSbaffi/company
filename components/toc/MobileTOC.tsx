import { FC } from "react";
import {
  ListItem,
  OrderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@/components/link";
import { TOCProps } from "./TOC";

export const MobileTOC: FC<TOCProps & AccordionProps> = ({
  headings,
  ...props
}) => {
  const linkColor = useColorModeValue("gray.600", "gray.400");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };
  
  return (
    <Accordion
      display={{ base: "block", xl: "none" }}
      borderRadius="xl"
      border="1px solid"
      borderColor={useColorModeValue("rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)")}
      shadow="xl"
      position="relative"
      sx={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        background: "transparent",
      }}
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
      allowToggle
      {...props}
    >
      <AccordionItem border="none">
        <AccordionButton borderRadius="xl" py="3">
          <Text
            flex="1"
            fontSize="sm"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "gray.300")}
            textAlign="left"
          >
            本页内容
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb="4">
          <OrderedList listStyleType="none" m="0" spacing="2">
            {headings.map(({ id, text, level }) => (
              <ListItem
                key={id}
                title={text}
                ml={level === "h3" ? "4" : undefined}
              >
                <Link 
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  fontSize="sm"
                  color={linkColor}
                  _hover={{ 
                    color: linkHoverColor,
                    textDecoration: "none"
                  }}
                  display="block"
                  py="1"
                >
                  {text}
                </Link>
              </ListItem>
            ))}
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
