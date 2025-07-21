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

interface SearchProviderProps extends WithChildren {}

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
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
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.900", "white");
  const focusBorderColor = useColorModeValue("blue.300", "blue.300");

  return (
    <Box pos="relative">
      <KBarSearch
        defaultPlaceholder="你需要什么？"
        style={{
          padding: "12px 12px 12px 48px",
          fontSize: "16px",
          width: "100%",
          border: `1px solid ${borderColor}`,
          borderRadius: "12px",
          outline: "none",
          background: bgColor,
          color: textColor,
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

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return (
            <Box p="3" fontSize="xs" textTransform="uppercase" opacity={0.5}>
              {item}
            </Box>
          );
        }

        const borderLeftColor = active ? "blue.300" : "transparent";

        return (
          <Box
            p="3"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            borderLeft="2px solid"
            borderLeftColor={borderLeftColor}
            bg={active ? "gray.100" : "transparent"}
            _dark={{
              bg: active ? "gray.700" : "transparent",
            }}
          >
            <Box
              display="flex"
              gap="3"
              alignItems="center"
              fontSize="sm"
              fontWeight={active ? "medium" : "normal"}
            >
              {item.name}
            </Box>
            <Box fontSize="xs" opacity={0.5}>
              {item.subtitle}
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default SearchProvider;
