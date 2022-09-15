import "../styles/globals.css";
import customTheme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/josefin-sans";
import { AuthProvider } from "../lib/contexts/authContext";
import { TransactionProvider } from "../lib/contexts/transactionContext";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TransactionProvider>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default MyApp;
