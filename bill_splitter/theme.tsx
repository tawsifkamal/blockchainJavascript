import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Josefin Sans, ${base.fonts.heading}`,
  },
  colors: {
    darkBlue: "#25283D",
    purple: "#8F3985",
    lightBlue: "#98DFEA",
    teal: "#07BEB8",
    offWhite: "#EFD9CE",
  },
});

export default theme;
