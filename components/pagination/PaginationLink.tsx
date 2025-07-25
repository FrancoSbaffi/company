import { FC } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { Link, LinkProps } from "@/components/link";

interface PaginationLinkProps extends LinkProps {
  label: string;
}

const PaginationLink: FC<PaginationLinkProps> = ({
  label,
  href,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      borderRadius="md"
      display="flex"
      flexDirection="column"
      {...props}
    >
      <Text fontSize="sm" px="2">
        {label}
      </Text>
      <Text
        display="flex"
        alignItems="center"
        mt="1"
        fontSize="lg"
        fontWeight="bold"
        color={useColorModeValue("gray.800", "white")}
      >
        {children}
      </Text>
    </Link>
  );
};

export default PaginationLink;
