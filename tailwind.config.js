/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        accent: "#788b95",
        accentdark: "#5d707a",
        rowprimary: "#ffffff",
        rowsecondary: "#f6f8fc",
        rowredprimary: "#ffc5c2",
        rowredsecondary: "#ffe0e0",
        rowgreenprimary: "#ffd9d9",
        rowgreensecondary: "#f6f8fc",
      },
    },
  },
}