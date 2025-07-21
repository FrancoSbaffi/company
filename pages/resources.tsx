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
      <Heading as="h1">我们提供什么？</Heading>
      <Text mt="6">
        在 Moneypilot，我们为您提供一个集成化的个人财务管理平台，让您能够集中管理和自动化查看所有资产，包括银行账户、信用卡、投资、积分等。我们通过智能工具分析您的财务习惯和交易，为您生成个性化的建议、提醒和实用的优化方案，帮助您更好地配置资源，实现财务目标。此外，我们的平台让您节省时间，避免错误，并能随时获取清晰、实时、可操作的财务信息，一切尽在一个平台之中。
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
