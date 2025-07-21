import { Route, Section } from "@/types";

export const docsSections: Section[] = [
  {
    section: "开始了解",
    routes: [
      { title: "MoneyPilot", path: "/docs/mdx" },
      { title: "Lorem Ipsum Nº1", path: "/docs/lorem-ipsum-1" },
      { title: "Lorem Ipsum Nº2", path: "/docs/lorem-ipsum-2" },
      { title: "Lorem Ipsum Nº3", path: "/docs/lorem-ipsum-3" },
    ],
  },
];

export const allDocsRoutes: Route[] = docsSections.flatMap(
  (route) => route.routes
);
