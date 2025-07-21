import { Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { DefaultLayout } from "@/layouts";
import { getNewsDataForSearch } from "@/lib/search-data";

interface ShowcasesProps {
  newsData: Array<{ slug: string; title: string }>;
}

const Showcases = ({ newsData }: ShowcasesProps) => {
  return (
    <DefaultLayout title="Resources" newsData={newsData}>
      <Heading as="h1">我们做什么？</Heading>
      <Text mt="6">
        在 Moneypilot，我们致力于帮助用户实现简单、智能和集中的个人财务管理。我们将您的所有资产——包括银行账户、信用卡、投资、积分等——整合到一个平台中，自动记录、分析并可视化您的财务信息。通过人工智能技术，我们为您提供个性化的建议、提醒和实用的理财方案，帮助您优化资源配置，发现更多机会，从而做出更明智的财务决策。我们的目标是让日常财务管理变得轻松、高效，让您更安心地实现自己的财务目标。
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

export default Showcases;
