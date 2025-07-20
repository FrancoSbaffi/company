import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/news");

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

// Fallback data embebido para evitar problemas de import
const staticNewsData: NewsPost[] = [
  {
    slug: "first-announcement",
    title: "MoneyPilot Official Launch",
    date: "2024-07-01",
    excerpt: "We are excited to announce the official launch of MoneyPilot, your new go-to fintech platform.",
    content: `# MoneyPilot Official Launch

Today marks the official launch of MoneyPilot—a new platform to help you build, launch, and scale modern fintech products.

We are excited to announce the official launch of MoneyPilot, your new go-to fintech platform for building modern financial solutions.

## What is MoneyPilot?

MoneyPilot is a comprehensive fintech platform designed to help you:

- Build modern financial applications
- Launch products quickly and efficiently
- Scale your fintech solutions with confidence

Stay tuned for more updates and features coming soon!`
  },
  {
    slug: "july-updates",
    title: "July Product Updates",
    date: "2024-07-19", 
    excerpt: "Check out what's new: API integrations, UX improvements, and more.",
    content: `# July Product Updates

This month, we've added new API integrations, improved the user experience, and fixed various bugs.

## New Features

- **API Integrations**: Enhanced connectivity with third-party services
- **UX Improvements**: Streamlined user interface and better navigation
- **Bug Fixes**: Resolved various issues reported by our community

## Coming Next Month

We're working on exciting new features including:
- Advanced analytics dashboard
- Real-time notifications
- Enhanced security features

Thank you for your continued support!`
  }
];

export function getAllPosts(): NewsPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      // Fallback a datos estáticos si no existe el directorio
      return staticNewsData.map((post: NewsPost) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content || "",
      })).sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
    
    if (fileNames.length === 0) {
      // Fallback si no hay archivos
      return staticNewsData.map((post: NewsPost) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content || "",
      })).sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    }).sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    // Fallback completo en caso de error
    console.error("Error reading posts:", error);
    return staticNewsData.map((post: NewsPost) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content || "",
    })).sort((a: NewsPost, b: NewsPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
      const staticPost = staticNewsData.find((post: NewsPost) => post.slug === slug);
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
    const staticPost = staticNewsData.find((post: NewsPost) => post.slug === slug);
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
