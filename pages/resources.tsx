import { DocsLayout } from "@/layouts";
import { Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getNewsDataForSearch } from "@/lib/search-data";

interface ResourcesProps {
  newsData: Array<{ slug: string; title: string }>;
}

const Resources = ({ newsData }: ResourcesProps) => {
  return (
    <DocsLayout title="Resources" newsData={newsData}>
      <Heading as="h1">Resources</Heading>
      <Text mt="6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus iste
        eum id minus, earum laboriosam nesciunt ratione temporibus recusandae,
        debitis qui, officia dolorum delectus. Enim vero libero quam dignissimos
        nulla?
      </Text>
    </DocsLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const newsData = getNewsDataForSearch();
  return {
    props: {
      newsData,
    },
  };
};

export default Resources;
