import { getAllPosts } from "./news";

export const getNewsDataForSearch = () => {
  return getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title
  }));
};
