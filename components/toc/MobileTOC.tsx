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
  return (
    <Accordion
      display={{ base: "block", xl: "none" }}
      borderRadius="xl"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "#2a2a2a")}
      shadow="sm"
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
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                  _hover={{ 
                    color: useColorModeValue("gray.800", "white"),
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
