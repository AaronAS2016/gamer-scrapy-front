import React, { useState } from "react";

import {
  useColorMode,
  Box,
  Text,
  Flex,
  Input,
  IconButton,
  Label,
  Radio,
  Button,
} from "theme-ui";

export const Buscador = ({ showBuscador, handleButton }) => {
  const [dropDown, setDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [colorMode] = useColorMode();
  const [modo, setModo] = useState("algunas_palabras");

  return (
    showBuscador && (
      <Box>
        <Box sx={{ padding: 50, fontSize: "2em" }}>
          <Text sx={{ fontFamily: "Oswald", textTransform: "uppercase" }}>
            Busca precios de todos los juegos que quieras!
          </Text>
        </Box>

        <Flex sx={{ width: "100%", justifyContent: "center" }}>
          <Flex
            sx={{
              flexDirection: "column",
              width: "100%",
              maxWidth: "500px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flex sx={{ width: "100%", marginBottom: 2 }}>
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.length > 0) {
                    handleButton(query, modo);
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
            {dropDown && (
              <Box
                sx={{
                  marginBottom: 10,
                  width: "100%",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Label htmlFor="results_site">
                  Maximos de resultados por sitio
                </Label>
                <Input defaultValue="10" id="results_site"></Input>
                <Text sx={{ padding: "10px 0" }}>Modos:</Text>
                <Flex mb={3} sx={{ paddingTop: 10 }}>
                  <Label>
                    <Radio
                      name="modo"
                      defaultChecked={modo == "algunas_palabras"}
                      value="algunas_palabras"
                      onClick={(e) => setModo(e.target.value)}
                    />
                    Algunas palabras
                  </Label>
                  <Label>
                    <Radio
                      name="modo"
                      value="todas_palabras"
                      defaultChecked={modo == "todas_palabras"}
                      onClick={(e) => setModo(e.target.value)}
                    />
                    Todas las palabras
                  </Label>
                  <Label>
                    <Radio
                      name="modo"
                      value="exacta"
                      defaultChecked={modo == "exacta"}
                      onClick={(e) => setModo(e.target.value)}
                    />
                    Exactas
                  </Label>
                </Flex>
              </Box>
            )}

            <Button
              sx={{ width: "100%" }}
              disabled={query.length === 0}
              variant={query.length > 0 ? "primary" : "disabled"}
              onClick={() => handleButton(query, modo)}
            >
              Buscar
            </Button>
          </Flex>
        </Flex>
      </Box>
    )
  );
};
