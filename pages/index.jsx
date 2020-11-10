import React, { useState } from "react";

import {
  Input,
  Box,
  Flex,
  Text,
  Button,
  Radio,
  IconButton,
  Label,
  useColorMode,
  Donut,
} from "theme-ui";

import { Header } from "../src/components/header";

const URL_API = "http://localhost:8080/search/";

const textosCargando = [
  "Scrapeando... No vayas a demandarnos!",
  "Robando contraseñas",
  "Aguarde un segundo mientras preparamos nuestros servidores para minar bitcoins",
];

const generateTextRandom = () =>
  textosCargando[Math.floor(Math.random() * textosCargando.length)];

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [text, setText] = useState(generateTextRandom());
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const [colorMode] = useColorMode();
  const [modo, setModo] = useState("algunas_palabras");

  const handleButton = (query) => {
    setItems([]);
    setError(false);
    setLoading(true);
    setText(generateTextRandom());

    fetch(URL_API + modo + "/" + query.toLowerCase())
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
        console.error(e);
      });
  };

  return (
    <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Box sx={{ padding: 100 }}>
        {hasError && (
          <Text sx={{ textTransform: "uppercase" }}> Exploto todo! </Text>
        )}
        {isLoading && (
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

        {!isLoading && (
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
                    defaultValue="Ingrese palabras para buscar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && query.length > 0) {
                        handleButton(query);
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
                  onClick={() => handleButton(query)}
                >
                  Buscar
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}

        {items.length > 0 && (
          <Box sx={{ paddingTop: 20 }}>
            <Flex
              sx={{
                borderColor: "primary",
                borderWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <Text sx={{ width: "50%" }}>Titulo</Text>
              <Text sx={{ width: "25%" }}>Precio</Text>
              <Text sx={{ width: "25%" }}>Proveedor</Text>
            </Flex>
            <Flex
              sx={{
                borderColor: "primary",
                flexDirection: "column",
                borderWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              {items.map(({ title, price, provider }) => (
                <Flex
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text
                    sx={{
                      width: "50%",
                      padding: "0 15px",
                      boxSizing: "border-box",
                    }}
                  >
                    {title}
                  </Text>
                  <Text sx={{ width: "25%" }}>{price}</Text>
                  <Text sx={{ width: "25%" }}>{provider}</Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default HomePage;
