import React from "react";
import { Input, IconButton, Flex } from "theme-ui";

export const BarraDeBusqueda = ({
  query,
  setQuery,
  setDropdown,
  dropDown,
  handleButton,
  colorMode,
  modo,
  sitioQueNoSeBusca,
  orden,
  rango
}) => {
  return (
    <Flex sx={{ width: "100%", marginBottom: 2 }}>
      <Input
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.length > 0) {
            handleButton(query, modo, sitioQueNoSeBusca, orden, rango);
          }
        }}
      />
      <IconButton
        sx={{
          height: "100%",
          backgroundImage: "url('/img/settings.svg')",
          animation: dropDown
            ? ".3s rotateDown linear forwards"
            : ".3s rotateUp linear forwards",
          boxSizing: "border-box",
          filter: colorMode === "light" ? "invert(0)" : "invert(1)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          marginLeft: 3,
          outline: 0,
        }}
        onClick={() => setDropdown(!dropDown)}
      />
    </Flex>
  );
};
