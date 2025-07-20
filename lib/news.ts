import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

// Si usás newsData como fallback:
const newsData: Array<{ slug: string; title?: string; date?: string; excerpt?: string; content?: string }> = [
  // Ejemplo:
  // {
  //   slug: "example-post",
  //   title: "Example Post",
  //   date: "2024-06-01",
  //   excerpt: "This is an example excerpt.",
  //   content: "Full content of the example post."
  // }
];

// 🚩 ESTA FUNCIÓN DEBE EXISTIR Y ESTAR EXPORTADA
export function getAllPosts() {
  try {
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
      return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
          slug,
          title: data.title || "",
          date: data.date || "",
          excerpt: data.excerpt || content.slice(0, 160),
        };
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return newsData.map(post => ({
        slug: post.slug,
        title: post.title || "",
        date: post.date || "",
        excerpt: post.excerpt || "",
      })).sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    }
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    return [];
  }
}

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
      const staticPost = newsData.find((post) => post.slug === slug);
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
