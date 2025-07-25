import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import { CalloutStyleConfig as Callout } from "@/components/callout/";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    styles: {
      global: {
        html: {
          scrollBehavior: "smooth",
          scrollPaddingTop: "5rem",
          bg: "#f8f8f8",
          _dark: {
            bg: "#1d1d1d",
          },
        },
        "body, #__next": {
          minH: "100vh",
          display: "flex",
          flexDirection: "column",
          bg: "#f8f8f8",
          _dark: {
            bg: "#1d1d1d",
          },
        },
      },
    },
    colors: {
      brand: {
        50: "#f9f9f9",
        100: "#ededed",
        200: "#d3d3d3",
        300: "#b3b3b3",
        400: "#a0a0a0",
        500: "#898989",
        600: "#6c6c6c",
        700: "#595959",
        800: "#454545",
        900: "#323232",
      },
    },
    fonts: {
      heading:
        "'Cal Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    components: {
      Callout,
    },
    config,
  },
  withProse({
    baseStyle: {
      "h1, h2, h3, h4, h5, h6": {
        "&:hover .anchor::after": {
          visibility: "visible",
        },
      },
      img: {
        borderRadius: "xl",
      },
      table: {
        display: "block",
        maxWidth: "fit-content",
        overflowX: "auto",
        whiteSpace: "noWrap",
        border: "1px",
        borderCollapse: "collapse",
        borderColor: "gray.100",
        _dark: {
          borderColor: "#333333",
        },
        borderRadius: "xl",
        p: "3",

        thead: {
          fontSize: "smaller",
          textTransform: "upperCase",
          color: "gray.600",
          _dark: {
            color: "#cccccc",
          },
        },

        "th, td": {
          minW: "200px",
        },

        "tr:nth-of-type(2n)": {
          bgColor: "gray.200",
          _dark: {
            bgColor: "#2a2a2a",
          },
        },
      },
      ".anchor": {
        w: "full",
        cursor: "pointer",
        borderRadius: "md",
        pl: "0.5rem",
        _after: {
          content: "'#'",
          color: "gray.500",
          _dark: {
            color: "gray.400",
          },
          visibility: "hidden",
        },
        _hover: {
          textDecor: "none",
        },
        "&::before": {
          content: "''",
          mt: "8",
          visibility: "hidden",
        },
        "&:hover::after": {
          visibility: "visible",
        },
        "&:focus::after": {
          visibility: "visible",
        },
      },
      pre: {
        _dark: {
          bg: "#2a2a2a",
        },
        borderRadius: "2xl",
        px: "2.5",
        overflowX: "auto",
      },
      code: {
        fontSize: "sm",
        fontWeight: "semibold",
        bgColor: "#2a2a2a",
        color: "gray.600",
        _dark: {
          color: "gray.300",
        },
        px: "1.5",
        py: "1",
        borderRadius: "lg",
        "&::before, &::after": {
          content: '""',
        },
      },
      ".rehype-code-title": {
        fontSize: "sm",
        fontWeight: "bold",
        bgColor: "#2a2a2a",
        color: "gray.600",
        _dark: {
          color: "gray.300",
        },
        px: "3",
        py: "2",
        borderBottom: "1px",
        borderColor: "gray.600",
        borderTopRadius: "2xl",
      },
    },
  })
);
