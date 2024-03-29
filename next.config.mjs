/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    optimizeFonts: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    modularizeImports: {
        "react-icons": {
            transform: "react-icons/{{member}}",
            preventFullImport: true
        }
    },
    experimental: {
        optimizeServerReact: true,
        serverMinification: true,
        optimizePackageImports: [ 'react-icons', 'react', 'next', 'framer-motion', 'luxon' ],
        optimizeCss: true,
        gzipSize: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            }
        ]
    }
}


export default nextConfig

