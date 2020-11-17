import React, { useState } from "react";

import {
  useColorMode,
  Box,
  Text,
  Flex,
  Button,
} from "theme-ui";
import { BarraDeBusqueda } from "./buscador/search_bar";
import { SelectModos } from "./buscador/search_modes";
import { SelectOrder } from "./buscador/search_order";
import { SlideRango } from "./buscador/search_range";
import { SelectSitios } from "./buscador/search_site";

export const Buscador = ({ showBuscador, handleButton, query, setQuery }) => {
  const [dropDown, setDropdown] = useState(false);
  const [colorMode] = useColorMode();
  const [modo, setModo] = useState("algunas_palabras");
  const [sitioQueNoSeBusca, agregarSitioBan] = useState([]);
  const [precioMaximo, setPrecioMaximo ] = useState(150)
  const [orden, setOrden] = useState("relevancia");

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
            <BarraDeBusqueda
              dropDown={dropDown}
              setDropdown={setDropdown}
              query={query}
              setQuery={setQuery}
              handleButton={handleButton}
              colorMode={colorMode}
              modo={modo}
              sitioQueNoSeBusca={sitioQueNoSeBusca}
              orden={orden}
              rango={precioMaximo}
            />
            {dropDown && (
              <Box
                sx={{
                  marginBottom: 10,
                  width: "100%",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >

                <SelectModos 
                  modo={modo} 
                  setModo={setModo} 
                />

                <SelectSitios
                  sitioQueNoSeBusca={sitioQueNoSeBusca}
                  agregarSitioBan={agregarSitioBan}
                />

                <SelectOrder
                  orden={orden}
                  setOrden={setOrden}
                />
                <SlideRango
                  precio={precioMaximo}
                  setPrecioMaximo={setPrecioMaximo}
                />
              </Box>
            )}

            <Button
              sx={{ width: "100%" }}
              disabled={query.length === 0 || sitioQueNoSeBusca.length === 4}
              variant={(query.length > 0 && sitioQueNoSeBusca.length < 4) ? "primary" : "disabled"}
              onClick={() => handleButton(query, modo, sitioQueNoSeBusca, orden, precioMaximo)}
            >
              Buscar
            </Button>
          </Flex>
        </Flex>
      </Box>
    )
  );
};
