import React, { useState, useEffect } from "react";
import { Flex, Text, Donut } from "theme-ui";
import { generateTextRandom } from "../utils/randomText";

export const Loader = ({ showLoader }) => {
  const [text, setText] = useState(generateTextRandom());
  useEffect(() => {
    let handler = setInterval(() => setText(generateTextRandom()), 5000);
    return () => clearInterval(handler);
  }, [showLoader]);
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
