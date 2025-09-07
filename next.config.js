/** @type {import('next').NextConfig} */

const isGithubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

const repo = "personal-website2026";
const assetPrefix = isGithubPages ? `/${repo}/` : '';
const basePath = isGithubPages ? `/${repo}` : '';

const nextConfig = {
    output: 'export',
    basePath,
    assetPrefix,
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'a2bef6ba-ec2c-4592-96eb-30819429ced7',
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
};

module.exports = nextConfig;