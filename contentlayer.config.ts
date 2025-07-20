import {
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
// Temporary: Remove complex plugins that might cause ReferenceError
// import remarkGfm from "remark-gfm";
// import rehypePrism from "rehype-prism-plus";
// import rehypeCodeTitles from "rehype-code-titles";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import { getTableOfContents } from "./utils/mdx";
// import { rehypeSlugCustom } from "./utils/rehype-slug-custom";
import siteConfig from "./config/site-config";

const computedFields = {
  slug: {
    type: "string",
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  editUrl: {
    type: "string",
    resolve: (doc: any) =>
      siteConfig.repo?.editUrl ? `${siteConfig.repo.editUrl}/${doc._id}` : null,
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the document",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the document",
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    headings: {
      type: "json",
      resolve: () => [],
    },
  },
}));

export const News = defineDocumentType(() => ({
  name: "News",
  filePathPattern: `news/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      description: "The title of the news post",
      required: true,
    },
    date: {
      type: "date",
      description: "The publication date",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the news post",
      required: false,
    },
    excerpt: {
      type: "string",
      description: "A short excerpt of the news post",
      required: false,
    },
  },
  computedFields: {
    ...computedFields,
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Doc, News],
  // Temporary: Remove all plugins to avoid ReferenceError
  // mdx: {
  //   remarkPlugins: [remarkGfm],
  //   rehypePlugins: [
  //     rehypeSlugCustom,
  //     rehypeCodeTitles,
  //     rehypePrism,
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         behavior: "append",
  //         properties: {
  //           className: ["anchor"],
  //         },
  //       },
  //     ],
  //   ],
  // },
});
