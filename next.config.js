const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  reactStrictMode: false,
  swcMinify: true,
  redirects: require("./next-redirects"),
  images: {
    domains: ["images.unsplash.com", "pbs.twimg.com"],
  },
  webpack: (config, { isServer }) => {
    // Fix for contentlayer and github-slugger compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
});
