import { DefaultLayout } from "@/layouts";
import { Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getNewsDataForSearch } from "@/lib/search-data";

interface TeamProps {
  newsData: Array<{ slug: string; title: string }>;
}

const Team = ({ newsData }: TeamProps) => {
  return (
    <DefaultLayout title="Team" newsData={newsData}>
      <Heading as="h1">Team</Heading>
      <Text mt="6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus iste
        eum id minus, earum laboriosam nesciunt ratione temporibus recusandae,
        debitis qui, officia dolorum delectus. Enim vero libero quam dignissimos
        nulla?
      </Text>
    </DefaultLayout>
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

export default Team;
