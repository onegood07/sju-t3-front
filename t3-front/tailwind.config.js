/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        // primary - 대표 색상
        "primary-green": "#00DE4D",
        "primary-red": "#F16B04",
        "primary-yellow": "#FFD700",

        // 배경 및 UI
        "app-bg": "#F8F8F8",
        "white-default": "#FFFFFF",
        "bg-tag-success": "#DDF4E0",
        "bg-tag-fail": "#F6F5F3",
        "bg-input": "#F6F5F3",

        // 텍스트
        "text-primary": "#333333",
        "text-gray": "#717171",
        "text-green": "#12C14E",

        // 아이콘, line, 차트
        "icon-gray": "#ADADAD",
        "border-line": "#E7E7E7",
        "gray-chart": "#EDEDED",
      },
    },
  },
  plugins: [],
};
