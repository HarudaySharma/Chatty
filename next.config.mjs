/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ['next-superjson-plugin', {}]
        ],
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
        ]
    }
};

export function middleware(request) {
    console.log('Middleware called for:', request.url);
    return NextResponse.next();
}


export default nextConfig;
