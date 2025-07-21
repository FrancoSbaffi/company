import {
  RiFolder4Fill,
  RiArchiveFill,
  RiLayout2Fill,
  RiGroupFill,
} from "react-icons/ri";

export const topLevelSectionsRoutes = [
  {
    label: "我们是谁？",
    path: "/docs/mdx",
    icon: RiFolder4Fill,
  },
  {
    label: "我们做什么？",
    path: "/showcases",
    icon: RiLayout2Fill,
  },
  {
    label: "我们提供什么？",
    path: "/resources",
    icon: RiArchiveFill,
  },
  {
    label: "我们的团队",
    path: "/team",
    icon: RiGroupFill,
  },
];
