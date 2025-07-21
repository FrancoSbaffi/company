import { FC } from "react";
import {
  Box,
  BoxProps,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Section } from "@/components/section";
import Marquee from "react-fast-marquee";
import { TweetData } from "@/types";
import Tweet from "./Tweet";

interface TweetsProps extends BoxProps {}

const tweets: TweetData[] = [
  {
    text: "这个平台彻底改变了我的投资方式，界面直观，数据准确，是我见过最专业的金融工具。",
    author: {
      name: "Ethan",
      bio: "资深投资顾问",
      avatar:
        "https://pbs.twimg.com/profile_images/1450115233205272576/CFTTK-0I_400x400.jpg",
    },
    url: "https://twitter.com/rauchg",
  },
  {
    text: "作为财务专家，我强烈推荐这个平台。风险管理功能出色，让投资决策更加科学。",
    author: {
      name: "Lucas",
      bio: "注册金融分析师 CFA",
      avatar:
        "https://pbs.twimg.com/profile_images/1194080814688079872/6qhYKGKC_400x400.jpg",
    },
    url: "https://twitter.com/leeerob",
  },
  {
    text: "平台的实时数据分析帮我抓住了多次投资机会，收益率提升了40%以上。",
    author: {
      name: "Fran",
      bio: "私人财富管理师",
      avatar:
        "https://pbs.twimg.com/profile_images/1466178823171588103/yM7OJ5XP_400x400.jpg",
    },
    url: "https://twitter.com/pacocoursey",
  },
  {
    text: "税务计算功能太实用了，一键生成报告，为我节省了大量时间和精力。",
    author: {
      name: "Adrian",
      bio: "税务咨询顾问",
      avatar:
        "https://pbs.twimg.com/profile_images/1217652661962661888/WfiUNjzP_400x400.jpg",
    },
    url: "https://twitter.com/brian_lovin",
  },
  {
    text: "作为金融科技从业者，我认为这是目前市场上最创新的投资管理解决方案。",
    author: {
      name: "Nathan",
      bio: "金融科技产品经理",
      avatar:
        "https://pbs.twimg.com/profile_images/1430792349974548485/yPCbNKr8_400x400.jpg",
    },
    url: "https://twitter.com/thesegunadebayo",
  },
  {
    text: "平台的安全性让我非常放心，多重验证和加密技术给我的资产提供了最好的保护。",
    author: {
      name: "Caleb",
      bio: "风险控制专家",
      avatar:
        "https://pbs.twimg.com/profile_images/1518360692365082624/SlnFrH3b_400x400.jpg",
    },
    url: "https://twitter.com/peduarte",
  },
  {
    text: "用了这个平台后，我的投资组合管理变得井井有条，收益跟踪和分析功能特别好用。",
    author: {
      name: "Harry",
      bio: "个人投资者",
      avatar:
        "https://pbs.twimg.com/profile_images/1526973250667810816/4FDvmwD0_400x400.jpg",
    },
    url: "https://twitter.com/kentcdodds",
  },
];

const Tweets: FC<TweetsProps> = (props: TweetsProps) => {
  const [r, g, b] = useColorModeValue([255, 255, 255], [26, 32, 43]);
  const gradientWidth = useBreakpointValue({ base: 100, md: 200 });

  return (
    <Box {...props}>
      <Section
        title="用户信赖之选"
        text="我们的金融科技平台获得全球用户和专业投资者的一致认可，为您提供安全可靠的投资管理服务。"
      />
      <Box
        as={Marquee}
        gradientColor={`${r},${g},${b}`}
        gradientWidth={gradientWidth}
        speed={30}
        pauseOnHover
      >
        {tweets.map((tweet: TweetData, index: number) => (
          <Tweet key={index} tweet={tweet} mr="3" />
        ))}
      </Box>
    </Box>
  );
};

export default Tweets;
