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
  }, [router, newsData]);

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
  const borderColor = useColorModeValue("rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)");
  const bgColor = useColorModeValue("rgba(255,255,255,0.9)", "rgba(26,26,26,0.9)");
  const textColor = useColorModeValue("gray.900", "white");
  const focusBorderColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.4)");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const iconBgColor = useColorModeValue("rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)");
  const iconBorderColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.2)");

  return (
    <Box 
      pos="relative" 
      p="4" 
      bg="transparent"
      borderBottom="1px solid"
      borderColor={useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)")}
    >
      <KBarSearch
        defaultPlaceholder="你需要什么？"
        style={{
          padding: "16px 20px 16px 48px",
          fontSize: "16px",
          width: "100%",
          border: `2px solid ${borderColor}`,
          borderRadius: "16px",
          outline: "none",
          background: bgColor,
          color: textColor,
          fontWeight: "500",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = focusBorderColor;
          e.target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)";
          e.target.style.transform = "translateY(-1px)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = borderColor;
          e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)";
          e.target.style.transform = "translateY(0)";
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        pos="absolute"
        left="7"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
        w="6"
        h="6"
        borderRadius="full"
        bg={iconBgColor}
        border="1px solid"
        borderColor={iconBorderColor}
      >
        <Icon 
          as={RiSearchLine} 
          color={iconColor} 
          boxSize="3.5" 
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
        />
      </Flex>
    </Box>
  );
};

const Results = () => {
  const { results } = useMatches();
  
  // Move hooks outside of callbacks
  const sectionTextColor = useColorModeValue("gray.600", "gray.400");
  const borderLeftColorActive = useColorModeValue("gray.700", "gray.300");
  const activeBg = useColorModeValue("gray.100", "rgba(255, 255, 255, 0.1)");
  const itemTextColor = useColorModeValue("gray.900", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const resultsBg = useColorModeValue("white", "#1a1a1a");

  return (
    <Box maxH="400px" overflowY="auto" bg={resultsBg}>
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          if (typeof item === "string") {
            return (
              <Box p="2" px="4" fontSize="xs" textTransform="uppercase" fontWeight="bold" color={sectionTextColor} bg={resultsBg}>
                {item}
              </Box>
            );
          }

          const borderLeftColor = active ? borderLeftColorActive : "transparent";

          return (
            <Box
              p="2"
              px="4"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              borderLeft="3px solid"
              borderLeftColor={borderLeftColor}
              bg={active ? activeBg : resultsBg}
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
                fontWeight={active ? "semibold" : "normal"}
                color={itemTextColor}
              >
                {item.name}
              </Box>
              <Box fontSize="xs" opacity={0.8} color={subtitleColor} fontWeight="medium">
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
