import { FC } from "react";
import {
  Box,
  BoxProps,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import FeatureCard from "./FeatureCard";
import { Section } from "@/components/section";
import {
  RiStackFill,
  RiAppsFill,
  RiFingerprintFill,
} from "react-icons/ri";
import { Feature } from "@/types";

interface FeaturesProps extends BoxProps {}

const features: Feature[] = [
  {
    title: "打新资讯 & 套利活动",
    description:
      "实时更新热门打新机会、市场套利活动与收益回顾，助你掌握先机，轻松布局资金策略。",
    icon: RiStackFill,
  },
  {
    title: "财务管理智能助手",
    description:
      "集成多账户资金流分析、资产分布可视化、预警与理财建议，一站式提升财务效率。",
    icon: RiAppsFill,
  },
  {
    title: "税务智能计算器",
    description:
      "自动计算投资相关税务板块，支持港股、美股等场景，规避税务风险，轻松申报。",
    icon: RiFingerprintFill,
  },
];

const Features: FC<FeaturesProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <Section
        title="为交易者。为开发者。为金融科技。"
        text="启动您下一个金融科技创意所需的一切——快速、安全、为扩展而构建。"
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
        {features.map(({ title, description, icon }, index) => (
          <FeatureCard
            key={index}
            title={title}
            description={description}
            icon={<Icon as={icon} boxSize="6" />}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
