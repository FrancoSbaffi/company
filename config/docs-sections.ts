import { Route, Section } from "@/types";

export const docsSections: Section[] = [
  {
    section: "开始了解",
    routes: [
      { title: "MoneyPilot", path: "/docs/mdx" },
      { title: "解决的问题", path: "/docs/lorem-ipsum-1" },
      { title: "功能特性", path: "/docs/lorem-ipsum-2" },
      { title: "预期结果", path: "/docs/lorem-ipsum-3" },
    ],
  },
];

export const allDocsRoutes: Route[] = docsSections.flatMap(
  (route) => route.routes
);
