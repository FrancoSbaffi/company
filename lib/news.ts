import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

// Example static news data; replace or import as needed
const newsData: Array<{ slug: string; title?: string; date?: string; excerpt?: string; content?: string }> = [
  // {
  //   slug: "example-post",
  //   title: "Example Post",
  //   date: "2024-06-01",
  //   excerpt: "This is an example excerpt.",
  //   content: "Full content of the example post."
  // }
];

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || content.slice(0, 160),
        content,
      };
    } else {
      const staticPost = newsData.find((post: { slug: string; [key: string]: any }) => post.slug === slug);
      if (staticPost) {
        return {
          ...staticPost,
          content: staticPost.content || "",
        };
      }
      return null;
    }
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    return null;
  }
}
