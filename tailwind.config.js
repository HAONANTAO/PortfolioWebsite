/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      ...colors,
      primary: colors.sky, // ✅ 替换 lightBlue 为 sky
      secondary: colors.pink,
      stone: colors.stone, // ✅ 替换 warmGray 为 stone
      neutral: colors.neutral, // ✅ 替换 trueGray 为 neutral
      gray: colors.gray, // ✅ 替换 coolGray 为 gray
      slate: colors.slate, // ✅ 替换 blueGray 为 slate
    },
  },
  plugins: [],
};
