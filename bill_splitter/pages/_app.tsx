import "../styles/globals.css";
import customTheme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import '@fontsource/josefin-sans';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
