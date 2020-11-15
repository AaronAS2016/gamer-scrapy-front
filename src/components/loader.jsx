import React from "react";
import  { Flex, Text, Donut }  from "theme-ui"

export const Loader = ({ showLoader, text }) => {
  return (
    <>
      {showLoader && (
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "moveDown .5s linear forwards",
          }}
        >
          <Text
            sx={{
              fontSize: "2em",
              textAlign: "center",
              textTransform: "uppercase",
              padding: 10,
            }}
          >
            {text}
          </Text>
          <Donut
            sx={{ animation: "1s rotate linear infinite", width: "30%" }}
            value={1 / 2}
            size={75}
          />
        </Flex>
      )}
    </>
  );
};
