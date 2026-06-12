/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Creator attribution links -> Uninstall App Store custom product pages.
      // One entry per creator so each stays individually attributable.
      {
        source: "/improve", // @_improve.men (TikTok)
        destination:
          "https://apps.apple.com/us/app/uninstall-screen-time-control/id6761068093?ppid=32093876-6412-41ec-a8aa-a3348afac211",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
