import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { newsData, NewsPost } from "./news-data";

const postsDirectory = path.join(process.cwd(), "content/news");

export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist, using static data');
      return newsData.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
    console.log('Found news files:', fileNames);
    
    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      
      if (!fs.existsSync(fullPath)) {
        console.error('File does not exist:', fullPath);
        return null;
      }
      
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || content.slice(0, 160),
      };
    }).filter((post): post is NonNullable<typeof post> => post !== null);
    
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch (error) {
    console.error('Error in getAllPosts, using static data:', error);
    return newsData.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      console.error('Post file does not exist, using static data:', fullPath);
      const staticPost = newsData.find(post => post.slug === slug);
      return staticPost || null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || content.slice(0, 160),
      content,
    };
  } catch (error) {
    console.error('Error in getPostBySlug, using static data:', error);
    const staticPost = newsData.find(post => post.slug === slug);
    return staticPost || null;
  }
}
