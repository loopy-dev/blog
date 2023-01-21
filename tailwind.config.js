/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        "80px": "80px",
      },
    },
    minWidth: {
      80: "80px",
    },
  },
};
