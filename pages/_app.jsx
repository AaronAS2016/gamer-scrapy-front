import React from "react";
import "../src/styles/styles.css";
import { ThemeProvider } from "theme-ui";
import theme from "../src/constant";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
