import { Heading } from "@/types";

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Match markdown headings ## or ###
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length === 2 ? 'h2' : 'h3';
      const text = match[2].trim();
      
      // Create a more reliable ID generation
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff\s-]/g, '') // Keep Chinese characters and basic characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        .trim();
      
      if (id && text) {
        headings.push({
          id,
          text,
          level
        });
      }
    }
  }
  
  return headings;
}
