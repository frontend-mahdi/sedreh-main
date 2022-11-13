/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#419971",
      primarythree: "#95DD91",
      primaryfour: "#0F2B0D",
      black: "#202020",
      white: "#FFFFFF",
      complementary: "#3AAA34",
      secondary: "#C55478",
      tertiary: "#DDA65E",
      gray: "#EDEDED",
      grayer: "#aaa;",
    },

    extend: {
      margin: {
        "-36": "-36px",
        38: "38%",
        100: "100%",
        50: "50%",
        150: "150%",
      },
      width: {
        1100: "1100px",
        540: "540px",
        530: "530px",
        580: "580px",
        75: "75vw",
        98.5: "98.5vw",
        17: "17rem",
      },
      height: {
        17.7: "17.7rem",
        349: "349px",
        400: "400px",
        500: "500px",
        360: "21.5rem",
        580: "580px",
        637: "637px",
        700: "700px",
        778: "778px",
        800: "800px",
        887: "887px",
        1024: "1024px",
        1066: "1066px",
      },
      colors: {
        "black-rgba": "rgba(32, 32, 32, 0.9)",
        "gray-nav": "rgba(32, 32, 32, 0.3)",
        "gray-text": "rgb(237, 237, 237,  0.6)",
        "gray-background": "rgb(237, 237, 237,  0.2)",
        "green-background": "rgb(149,221,145,0.10)",
        "green-background-title": "rgb(149,221,145,0.20)",
      },

      inset: {
        51: "51%",
      },
    },
  },
  plugins: [],
};
