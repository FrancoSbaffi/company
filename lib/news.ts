import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { newsData } from "./news-data";

const postsDirectory = path.join(process.cwd(), "content/news");

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export function getAllPosts(): NewsPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      // Fallback a datos estáticos si no existe el directorio
      return newsData.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content || "",
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
    
    if (fileNames.length === 0) {
      // Fallback si no hay archivos
      return newsData.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content || "",
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
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
        content: content || "",
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    // Fallback completo en caso de error
    console.error("Error reading posts:", error);
    return newsData.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content || "",
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export function getPostBySlug(slug: string): NewsPost | null {
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
        content: content || "",
      };
    } else {
      // Fallback a datos estáticos
      const staticPost = newsData.find(post => post.slug === slug);
      if (staticPost) {
        return {
          slug: staticPost.slug,
          title: staticPost.title,
          date: staticPost.date,
          excerpt: staticPost.excerpt,
          content: staticPost.content || "",
        };
      }
      return null;
    }
  } catch (error) {
    console.error("Error reading post:", error);
    // Fallback a datos estáticos en caso de error
    const staticPost = newsData.find(post => post.slug === slug);
    if (staticPost) {
      return {
        slug: staticPost.slug,
        title: staticPost.title,
        date: staticPost.date,
        excerpt: staticPost.excerpt,
        content: staticPost.content || "",
      };
    }
    return null;
  }
}
