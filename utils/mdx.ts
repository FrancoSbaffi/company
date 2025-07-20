import GithubSlugger from "github-slugger";
import { Heading } from "@/types";

export const getTableOfContents = (mdxContent: string) => {
  const regexp = new RegExp(/^(### |## )(.*)\n/, "gm");
  const headings = [...mdxContent.matchAll(regexp)];
  let tableOfContents: Heading[] = [];

  if (headings.length) {
    const slugger = new GithubSlugger();
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim();
      const headingType = heading[1].trim() === "##" ? "h2" : "h3";
      const headingLink = slugger.slug(headingText);

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      };
    });
  }

  return tableOfContents;
};
