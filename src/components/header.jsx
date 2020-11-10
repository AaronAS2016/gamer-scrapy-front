import React, { useState, useEffect } from "react";
import { Flex, Text, IconButton, useColorMode  } from "theme-ui"
import styles from "../styles/homepage.module.css";

export const Header = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [colorMode, setColorMode] = useColorMode();
  
    const handleScroll = () => {
      const position = window.pageYOffset;
      setIsScrolling(position > 100);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <Flex
      className={styles.header}
      sx={{
        backgroundColor: isScrolling ? "primary" : "background",
        boxSizing: "border-box",
        height: isScrolling ? 65 : 50,
        width: "100%",
        position: "fixed",
        display: "flex",
        padding: "0 30px",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all .3s",
      }}
    >
      <Text
        sx={{
          color: isScrolling && "#fff",
          fontFamily: "SNES",
          fontSize: "2em",
        }}
      >
        GamerScrapy
      </Text>
      <IconButton
        sx={{
          width: 50,
          height: 50,
          backgroundImage:
            colorMode === "default"
              ? "url('/img/moon.svg')"
              : "url('/img/sun.svg')",
          borders: "intial",
          backgroundPosition: "center",
        }}
        onClick={() => {
          setColorMode(colorMode === "default" ? "light" : "default");
        }}
      />
    </Flex>
  );
};
