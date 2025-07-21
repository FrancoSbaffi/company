import { FC } from "react";
import NextLink from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { WithChildren } from "@/types";

export interface LinkProps extends WithChildren, ChakraLinkProps {
  href: string;
  isActive?: boolean;
}

export const Link: FC<LinkProps> = ({ href, isActive, children, ...props }) => {
  const fontColor = useColorModeValue("gray.600", "gray.400");
  const activeColor = useColorModeValue("gray.800", "white");
  const hoverColor = useColorModeValue("gray.800", "white");

  return (
    <NextLink href={href} passHref>
      <ChakraLink
        color={isActive ? activeColor : fontColor}
        _hover={{ textDecor: "none", color: hoverColor }}
        {...props}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
