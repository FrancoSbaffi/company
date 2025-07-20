import { SiteConfig } from "@/types";

export const websiteUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
export const githubBaseUrl =
  "https://github.com/FrancoSbaffi/company";

const siteConfig: SiteConfig = {
  repo: {
    url: githubBaseUrl,
    editUrl: `${githubBaseUrl}/edit/main/content`,
    blobUrl: `${githubBaseUrl}/blob/main`,
  },
  author: {
    name: "Franco Sbaffi",
    github: "FrancoSbaffi",
    twitter: "@FrancoSbaffi",
    email: "sbaffiengineer@gmail.com",
  },
  seo: {
    title: "Moneypilot - Fintech Web",
    description: "Moneypilot is a fintech platform for modern financial applications.",
    openGraph: {
      url: websiteUrl,
      type: "website",
      image: {
        url: `${websiteUrl}/static/images/banner.png`,
        width: 1240,
        height: 480,
        alt: "Moneypilot - Fintech Web",
        type: "image/png",
      },
      locale: "en_US",
      siteName: "Lil Docs Template",
    },
    twitter: {
      site: "@bryanbarrios__",
      handle: "@bryanbarrios__",
      cardType: "summary_large_image",
      image: {
        url: `${websiteUrl}/static/images/banner.png`,
        width: 1012,
        height: 506,
        alt: "Lil Documentation Template: A lil docs template for lil projects.",
        type: "image/png",
      },
    },
    robots: "index, follow",
  },
};

export default siteConfig;
