import React from "react";
import { Box, Text } from "theme-ui" 


export const Footer = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        padding: 20,
        color: "#fff",
        bg: "primary",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Text>Desarrollado por Black Mesa Devs </Text>
    </Box>
  );
};
