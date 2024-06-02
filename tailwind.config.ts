import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brandColor: {
                    '50': '#e7edf7',
                    '100': '#c3d1ec',
                    '200': '#9fb5e1',
                    '300': '#7b99d6',
                    '400': '#577dc9',
                    '500': '#4267B2', // Base color
                    '600': '#365390',
                    '700': '#293f6e',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class'
        })
    ],
};
export default config;
