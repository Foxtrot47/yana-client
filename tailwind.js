module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: "media",
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["dark"]
  }
};
