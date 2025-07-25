import { FC } from "react";
import {
  Box,
  Image,
  LinkBoxProps,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { LinkBox } from "@/components/link-box";
import { TweetData } from "@/types";

interface TweetProps extends LinkBoxProps {
  tweet: TweetData;
}

export const Tweet: FC<TweetProps> = ({ tweet, ...props }: TweetProps) => {
  const fontColor = useColorModeValue("gray.500", "gray.400");

  return (
    <LinkBox
      href={tweet.url}
      isExternal
      w="full"
      maxW={{ base: "xs", lg: "md" }}
      h="full"
      bgColor={useColorModeValue("gray.50", "whiteAlpha.100")}
      border="1px"
      borderColor={useColorModeValue("gray.100", "whiteAlpha.200")}
      backdropFilter="blur(10px)"
      boxShadow={useColorModeValue("sm", "0 4px 6px rgba(0, 0, 0, 0.3)")}
      borderRadius="3xl"
      p="7"
      {...props}
    >
      <Stack spacing="2" h="full">
        <Stack direction="row" alignItems="center" spacing="1">
          <Image
            src={tweet.author.avatar}
            alt={tweet.author.name}
            borderRadius="full"
            boxSize="12"
            mr="2"
          />
          <Box fontSize="sm" color={fontColor}>
            <Text>{tweet.author.name}</Text>
            <Text>{tweet.author.bio}</Text>
          </Box>
        </Stack>
        <Text color={fontColor}>{tweet.text}</Text>
      </Stack>
    </LinkBox>
  );
};

export default Tweet;
