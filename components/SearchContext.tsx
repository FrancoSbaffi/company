import { FC, useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Icon, Input, useColorModeValue } from "@chakra-ui/react";
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { RiSearchLine } from "react-icons/ri";
import { docsSections, siteConfig, topLevelSectionsRoutes } from "@/config";
import { WithChildren } from "@/types";

interface SearchProviderProps extends WithChildren {
  newsData?: Array<{ slug: string; title: string }>;
}

export const SearchProvider: FC<SearchProviderProps> = ({ children, newsData = [] }) => {
  const router = useRouter();

  const actions = useMemo(() => {
    const docs: Action[] = docsSections.reduce<Action[]>((acc, section) => {
      section.routes.forEach((route) => {
        acc.push({
          id: route.path,
          name: route.title,
          keywords: route.title
            .toLowerCase()
            .split(" ")
            .join(" "),
          section: section.section,
          subtitle: "打开文档",
          perform: () => router.push(route.path),
        });
      });

      return acc;
    }, []);

    const topLevelPages: Action[] = topLevelSectionsRoutes.map((route) => ({
      id: route.path,
      name: route.label,
      keywords: route.label
        .toLowerCase()
        .split(" ")
        .join(" "),
      section: "页面",
      subtitle: "打开页面",
      perform: () => router.push(route.path),
    }));

    // Add news articles
    const newsActions: Action[] = newsData.map((post) => ({
      id: `/news/${post.slug}`,
      name: post.title,
      keywords: post.title
        .toLowerCase()
        .split(" ")
        .join(" "),
      section: "新闻",
      subtitle: "阅读文章",
      perform: () => router.push(`/news/${post.slug}`),
    }));

    return [
      {
        id: "homepage",
        name: "首页",
        keywords: "home 主页 首页",
        section: "导航",
        subtitle: "返回首页",
        perform: () => router.push("/"),
      },
      ...topLevelPages,
      ...docs,
      ...newsActions,
    ];
  }, [router]);

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator className="kbar-blur">
            <SearchInput />
            <Results />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

const SearchInput = () => {
  const borderColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)");
  const bgColor = useColorModeValue("rgba(255,255,255,0.5)", "rgba(255,255,255,0.1)");
  const textColor = useColorModeValue("gray.900", "white");
  const focusBorderColor = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.2)");

  return (
    <Box pos="relative" p="4">
      <KBarSearch
        defaultPlaceholder="你需要什么？"
        style={{
          padding: "12px 12px 12px 48px",
          fontSize: "16px",
          width: "100%",
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          outline: "none",
          background: bgColor,
          color: textColor,
          backdropFilter: "blur(10px)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = focusBorderColor;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = borderColor;
        }}
      />
      <Flex
        alignItems="center"
        pos="absolute"
        left="4"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
      >
        <Icon as={RiSearchLine} />
      </Flex>
    </Box>
  );
};

const Results = () => {
  const { results } = useMatches();
  
  // Move hooks outside of callbacks
  const sectionTextColor = useColorModeValue("gray.600", "gray.400");
  const borderLeftColorActive = useColorModeValue("blue.400", "blue.300");
  const activeBg = useColorModeValue("rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)");
  const itemTextColor = useColorModeValue("gray.900", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box maxH="400px" overflowY="auto">
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          if (typeof item === "string") {
            return (
              <Box p="3" fontSize="xs" textTransform="uppercase" opacity={0.7} color={sectionTextColor}>
                {item}
              </Box>
            );
          }

          const borderLeftColor = active ? borderLeftColorActive : "transparent";

          return (
            <Box
              p="3"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              borderLeft="2px solid"
              borderLeftColor={borderLeftColor}
              bg={active ? activeBg : "transparent"}
              _hover={{
                bg: activeBg,
              }}
              transition="all 0.2s"
            >
              <Box
                display="flex"
                gap="3"
                alignItems="center"
                fontSize="sm"
                fontWeight={active ? "medium" : "normal"}
                color={itemTextColor}
              >
                {item.name}
              </Box>
              <Box fontSize="xs" opacity={0.6} color={subtitleColor}>
                {item.subtitle}
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default SearchProvider;
