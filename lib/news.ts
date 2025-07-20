import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { newsData } from "./news-data";

// Directorio de los .md
const postsDirectory = path.join(process.cwd(), "content/news");

// Lista todos los posts
export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      // Fallback a estáticos si no hay directorio
      return newsData.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content ?? "", // <- Siempre poner content
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || content.slice(0, 160),
        content: content ?? "",
      };
    });
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch (error) {
    // Fallback a estáticos si falla
    return newsData.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content ?? "",
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

// Busca post por slug
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
        content: content ?? "",
      };
    } else {
      // Fallback a datos estáticos si no existe el archivo
      const staticPost = newsData.find(post => post.slug === slug);
      if (!staticPost) throw new Error("Post not found");
      return {
        slug: staticPost.slug,
        title: staticPost.title,
        date: staticPost.date,
        excerpt: staticPost.excerpt,
        content: staticPost.content ?? "",
      };
    }
  } catch (error) {
    // Fallback seguro
    const staticPost = newsData.find(post => post.slug === slug);
    if (!staticPost) {
      return {
        slug,
        title: "",
        date: "",
        excerpt: "",
        content: "",
      };
    }
    return {
      slug: staticPost.slug,
      title: staticPost.title,
      date: staticPost.date,
      excerpt: staticPost.excerpt,
      content: staticPost.content ?? "",
    };
  }
}
