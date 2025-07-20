import { slug } from "github-slugger";
import { visit } from "unist-util-visit";

export function rehypeSlugCustom() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
        if (!node.properties) {
          node.properties = {};
        }
        if (!node.properties.id) {
          // Extract text content from the heading
          const text = extractText(node);
          node.properties.id = slug(text);
        }
      }
    });
  };
}

function extractText(node: any): string {
  if (node.type === "text") {
    return node.value || "";
  }
  if (node.children) {
    return node.children.map(extractText).join("");
  }
  return "";
}
