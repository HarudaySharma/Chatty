/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        swcPlugins: [
            ['next-superjson-plugin', {}]
        ],
    },
    images: {
        domains: [
            'encrypted-tbn0.gstatic.com',
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
        ]
    }
};

export default nextConfig;
