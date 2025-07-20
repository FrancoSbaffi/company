// Static news data as fallback for production environment
export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const newsData: NewsPost[] = [
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
- Mobile app improvements
- New payment processing options

Thank you for your continued support!`
  }
];
