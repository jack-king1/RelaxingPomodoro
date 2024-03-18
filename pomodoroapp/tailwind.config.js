/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                numans: ["Numans", "sans-serif"],
                martian: ["Martian", "sans-serif"],
            },
            fontSize: {
                "7xl": "5rem", // Example custom size for larger text font
                "8xl": "6rem", // Another example custom size
                // Add more custom sizes as needed
            },
        },
    },
    plugins: [],
};
