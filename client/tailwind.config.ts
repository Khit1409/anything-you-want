/**
 * Cấu hình TailwindCSS cho project.
 * - `content`: các đường dẫn file để Tailwind quét class
 * - `darkMode`: chế độ tối
 * - `theme` và `plugins`: mở rộng theo nhu cầu giao diện
 */
const tailwindConfig = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;
