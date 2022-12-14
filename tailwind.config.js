const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary1: "#071507",
      primary2: "#E4F7E3",
      primary3: "#95DD91",
      primary4: "#0F2B0D",
      primary: "#419971",
      black1: "#202020",
      white1: "#FFFFFF",
      ED: "#EDEDED",
      F9: "#F9F9F9",
      CB: "#CBCBCB",
      Seventy: "#757575",
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
      inset: {
        51: "51%",
      },
      colors: {
        "black1-rgba": "rgba(32, 32, 32, 0.9)",
        "ED-nav": "rgba(32, 32, 32, 0.3)",
        "ED-text": "rgb(237, 237, 237,  0.6)",
        "ED-background": "rgb(237, 237, 237,  0.2)",
        "primary-background": "rgb(149,221,145,0.10)",
        "primary-background-title": "rgb(149,221,145,0.20)",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1280px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
};
