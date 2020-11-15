import React from "react";
import { Text } from "theme-ui";

export const Error = ({ showError }) => (
  <>
    {showError && (
      <Text sx={{ textTransform: "uppercase" }}> Exploto todo! </Text>
    )}
  </>
);
