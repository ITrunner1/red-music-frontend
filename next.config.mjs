/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
    images: {
        remotePatterns: [{ hostname: 'localhost' },]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4200/api/:path*'
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:4200/uploads/:path*'
            },
        ]
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ]
    }
};

export default nextConfig;
