/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    env: {
        SERVER_URL: process.env.SERVER_URL,        
    },
    images: {
        domains: ['localhost']
    },
    async rewrites(){
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4200/api/:path*'
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:4200/uploads/:path*'
            }
        ]
    }
};

export default nextConfig;
